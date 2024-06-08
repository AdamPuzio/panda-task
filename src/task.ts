import { Listr, PRESET_TIMER } from 'listr2'

import { TaskManager } from './task-manager'

import {
  TaskConfigProps,
  TaskContext,
  TaskOptionsProps,
  TaskProps,
  TaskRollbackProps,
  TaskSuperOptionsProps,
  TaskSuperProps,
  TaskSuperWrapperProps,
} from './task.types'

export class Task {
  static type = 'task'

  name: string | false

  tasks: TaskSuperProps[] = []

  config: TaskConfigProps = {}

  enabled: boolean | ((ctx: TaskContext) => boolean | Promise<boolean>) = true
  skip: boolean | string | ((ctx: TaskContext) => boolean | string | Promise<boolean | string>) = false
  retry?: number | { tries: number, delay?: number }
  rollback?: TaskRollbackProps

  options: TaskSuperOptionsProps = {
    concurrent: false,
    exitOnError: true,
    renderer: 'default',
    rendererOptions: {
      showSubtasks: true,
      collapseSubtasks: true,
      showSkipMessage: true,
      collapseSkips: true,
      suffixSkips: false,
      showErrorMessage: false,
      collapseErrors: true,
      timer: undefined
    }
  }

  _props = {}

  constructor (cfg: TaskProps = {}) {
    this._props = cfg
    this.parseOptions(cfg.options)
    this.registerTaskTypes(cfg.taskTypes)
    this.registerTasks(cfg.tasks)
    this.parseMeta(cfg)
    return this
  }

  protected build () {
    const task: TaskSuperProps = {
      title: this.name === false ? undefined : this.name || this.constructor.name,
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

  protected async runTask (ctx: any, task: TaskSuperWrapperProps) {
    const data = typeof this.config === 'function' ? await this.config(ctx) : this.config
    return await this.run(data, ctx, task)
  }

  async run (cfg: any, ctx: any, task: TaskSuperWrapperProps) {
    if (!task) {
      // task is the root task
      const task = new Listr(this.tasks, this.options)
      return await task.run(cfg)
    }
    return task.newListr(this.tasks, this.options)
  }

  protected parseMeta (cfg: TaskProps) {
    const meta = ['name', 'enabled', 'skip', 'retry', 'rollback', 'config', 'run']
    for (const key of meta) {
      const value = typeof cfg[key] === 'function' ? cfg[key].bind(this) : cfg[key]
      if (typeof cfg[key] !== 'undefined') this[key] = value
    }
  }

  protected parseOptions (opts: TaskOptionsProps = {}) {
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

  protected registerTaskTypes (taskTypes?: Array<typeof Task>) {
    taskTypes?.forEach(t => TaskManager.registerTaskType(t) )
  }

  protected registerTasks (tasks: Array<TaskProps | Task | { new(): Task }> = []) {
    for (const t of tasks) {
      let task
      if (t instanceof Task) task = t // task instance
      else if (typeof t === 'function') task = new t() // task class
      else { // task config
        if (t.type) { // has a type, match to TaskTypes
          task = TaskManager.createTask(t)
        } else task = new Task(t) // no type, create a new Task
      }
      this.tasks.push(task.build())
    }
  }

}