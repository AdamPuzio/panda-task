import { Listr, PRESET_TIMER } from 'listr2'
import { Logger } from './logger'
import {
  TaskInterface,
  TaskOptions,
  TaskProps,
  TaskSuper,
  TaskSuperOptions,
  TaskSuperTask,
  TaskSuperWrapper,
} from './task.types'

interface TaskImport {
  tasks?: Array<typeof Task>
}

export class Task implements TaskInterface {
  static type = 'task'
  static config
  static options
  static import
  static tasks

  name: string | boolean = false
  enabled = true
  skip = false
  retry
  rollback

  import?: TaskImport

  options: TaskSuperOptions = {
    concurrent: false,
    exitOnError: true,
    renderer: 'default',
    rendererOptions: {
      showSubtasks: true,
      collapseSubtasks: true,
      showSkipMessage: true,
      collapseSkips: true,
      suffixSkips: false,
      showErrorMessage: true,
      collapseErrors: false,
      timer: undefined
    }
  }

  tasks: TaskSuperTask[] = []

  $config: any
  $derivedConfig: any
  $instanceConfig: any

  Logger = Logger

  constructor(cfg: TaskProps = {}) {
    const lineage = this.getLineage().reverse()
    lineage.forEach((task) => {
      if (task.options) this.parseOptions(task.options as TaskOptions)
      if (task.import) this.parseImports(task.import)
      if (task.config) this.$derivedConfig = task.config
      if (task.tasks) this.parseTasks(task.tasks)
    })
    this.configure(cfg)
  }

  configure (cfg: TaskProps) {
    this.$config = cfg
    this.parseMeta(cfg)
    this.parseOptions(cfg.options)
    this.parseImports(cfg.import)
    this.parseTasks(cfg.tasks)
    if (cfg.config) this.$instanceConfig = cfg.config
  }

  async run(ctx: any): Promise<any> {
    if (!this.$task) {
      const task: TaskSuper = new Listr(this.tasks, this.options)
      ctx = await this.generateConfig(ctx)
      return await task.run(ctx)
    }
    return await this.runTasks()
  }

  async runTasks (ctx?: any, tasks?: TaskSuperTask[]) {
    if (!ctx) ctx = this.$cfg
    const options = { ...this.options, ctx }
    if (!tasks) tasks = this.tasks
    return this.$task.newListr(tasks, options)
  }

  protected $ctx
  protected $cfg
  protected $task

  protected async runTask (ctx: any, task: TaskSuperWrapper) {
    this.$ctx = ctx
    this.$task = task
    const config = this.$cfg = await this.generateConfig(ctx)
    // console.log(`Running task ${this.name || this.constructor.name}`)
    // console.log({ config, ctx})
    return await this.run(config)
  }

  protected build () {
    const con = this.constructor as any
    const task: TaskSuperTask = {
      title: this.name === false ? undefined : this.name || con?.name,
      task: this.runTask.bind(this),
      exitOnError: this.options.exitOnError,
      rendererOptions: this.options.rendererOptions,
      enabled: this.enabled,
      skip: this.skip,
      retry: this.retry,
      rollback: this.rollback,
    }
    return task
  }

  protected async generateConfig (ctx: any = {}) {
    if (!this.$derivedConfig && !this.$instanceConfig) return ctx
    const instanceConfig = typeof this.$instanceConfig === 'function' 
      ? await this.$instanceConfig.bind(this)(ctx) 
      : { ...this.$instanceConfig || {}, ...ctx }
    const derivedConfig = typeof this.$derivedConfig === 'function' 
      ? await this.$derivedConfig.bind(this)(instanceConfig) 
      : { ...this.$derivedConfig || {}, ...instanceConfig }
    return derivedConfig
  }

  protected parseMeta(meta: any) {
    const metaVars = ['name', 'enabled', 'skip', 'retry', 'rollback', 'run']
    metaVars.forEach((key) => {
      if (meta[key]) this[key] = meta[key]
    })
  }

  protected parseOptions (opts: TaskOptions = {}) {
    // apply base options
    const baseOptions = ['concurrent', 'exitOnError', 'exitAfterRollback']
    for (const opt of baseOptions) {
      if (typeof opts[opt] !== 'undefined') this.options[opt] = opts[opt]
    }

    // apply renderer options
    const rendererOptions = ['showSubtasks', 'collapseSubtasks', 'showSkipMessage', 'collapseSkips', 'suffixSkips', 'showErrorMessage', 'collapseErrors']
    for (const opt of rendererOptions) {
      if (typeof opts[opt] !== 'undefined') this.options.rendererOptions[opt] = opts[opt]
    }

    // apply timer option
    if (typeof opts.timer !== 'undefined') this.options.rendererOptions.timer = PRESET_TIMER

    // apply custom options
    if (typeof opts.$custom !== 'undefined') {
      for (const key in opts.$custom) {
        if (typeof opts.$custom[key] === 'object') 
          this.options[key] = { ...this.options[key], ...opts.$custom[key] }
        else this.options[key] = opts.$custom[key]
      }
    }
  }

  protected parseImports (imports: TaskImport = {}) {
    if (imports.tasks) imports.tasks?.forEach(t => this.registerTask(t) )
  }

  protected parseTasks (tasks: Array<TaskProps | Task | { new(cfg?, parent?: Task): Task }> = []) {
    for (const t of tasks) {
      let task
      if (t instanceof Task) task = t // task instance
      else if (typeof t === 'function') task = new t({}, this) // task class
      else { // task config
        if (t.type) { // has a type, match to TaskTypes
          task = this.createTask(t, this)
        } else task = new Task(t) // no type, create a new Task
      }
      this.tasks.push(task.build())
    }
  }

  $taskTypes: { [key: string]: typeof Task } = {}

  protected registerTask (task: typeof Task) {
    if (!task.type) throw new Error('Task type is required to import a task')
    this.$taskTypes[task.type] = task
  }

  protected createTask (cfg: TaskProps, parent: Task) {
    if (!cfg.type) throw new Error('Task type not defined')
    this.loadBaseTasks()
    const taskType = this.$taskTypes[cfg.type]
    if (!taskType) throw new Error(`Task type ${cfg.type} not registered`)
    return new taskType(cfg)
  }

  protected $loaded = false

  protected loadBaseTasks () {
    if (this.$loaded) return
    const tasks = require('./tasks')
    Object.values(tasks).forEach((task: any) => {
      this.registerTask(task)
    })
    this.$loaded = true
  }

  protected getLineage () {
    const scopes = []

    if (this.constructor) {
      let current = Object.getPrototypeOf(this)
      while (current && current !== Object.prototype) {
        const scope = (current.constructor)
        scopes.push(scope)
        current = Object.getPrototypeOf(current)
      }
    }
    return scopes
  }

  // debug (msg: any, opts: any) {
  //   const { label, level, tags } = opts
  //   const debugMode = process.env.DEBUG
  //   const debugLevel = process.env.DEBUG_LEVEL
  //   if (!debugMode && !debugLevel) return
  //   if (debugLevel && debugLevel !== level) return
  //   if (debugMode !== 'true' && !tags.includes(debugMode)) return
  //   if (label) console.group(`\x1b[35m[${label}]\x1b[0m`)
  //   console.log(msg)
  //   if (label) console.groupEnd()
  // }
}