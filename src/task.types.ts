import {
  Listr,
  ListrBaseClassOptions,
  ListrContext,
  ListrRendererFactory,
  ListrTask,
  ListrTaskFn,
  ListrTaskWrapper,
} from 'listr2'
import { Task } from './task'

export type TaskContext = ListrContext
export interface TaskSuper extends Listr {}
export interface TaskSuperOptions extends ListrBaseClassOptions {}
export interface TaskSuperTask extends ListrTask {}
export interface TaskSuperWrapper extends ListrTaskWrapper<any, any, any> {}



type GlobalVariable = `${'$$'}${string}`
type LocalVariable = `${'$'}${string}`

export interface TaskBaseConfig {
  [key: GlobalVariable]: any
  [key: LocalVariable]: any
}
export interface TaskConfig extends TaskBaseConfig {
  [key: string]: any
}

export type TaskConfigProps = { [key: string]: any } | ((ctx: TaskConfig) => TaskConfig | Promise<TaskConfig>)

export interface TaskInterface {
  // type?: string
  name?: string | boolean
  config?: TaskConfigProps
  tasks?: TaskSuperTask[]
  taskTypes?: Array<typeof Task>
  options: TaskSuperOptions

  enabled: boolean | ((ctx: TaskContext) => boolean | Promise<boolean>)
  skip: boolean | string | ((ctx: TaskContext) => boolean | string | Promise<boolean | string>)
  retry?: number | { tries: number, delay?: number }
  rollback?: TaskRollback

  import?: {
    tasks?: Array<typeof Task>
  }

  run?(cfg: any): Promise<any>
  debug?(cfg: any, opts?: { level: string, tags: string[] }): void
}

export interface TaskProps {
  type?: string
  name?: string | boolean
  tasks?: Array<TaskProps | Task | { new(): Task }>
  run?: (cfg: any) => Promise<void>
  options?: TaskOptions
  config?: { [key: string]: any }
  import?: { tasks: Array<typeof Task> }
  
  enabled?: boolean | ((ctx: TaskContext) => boolean | Promise<boolean>)
  skip?: boolean | string | ((ctx: TaskContext) => boolean | string | Promise<boolean | string>)
  retry?: number | { tries: number, delay?: number }
  rollback?: TaskRollback
}

export interface TaskOptions {
  concurrent?: boolean
  exitOnError?: boolean
  exitAfterRollback?: boolean
  timer?: boolean
  showSubtasks?: boolean
  collapseSubtasks?: boolean
  showSkipMessage?: boolean
  collapseSkips?: boolean
  suffixSkips?: boolean
  showErrorMessage?: boolean
  collapseErrors?: boolean
  $custom?: { [key: string]: any }
}

export type TaskRollback<
  Ctx = TaskContext, 
  Renderer extends ListrRendererFactory = any, 
  FallbackRenderer extends ListrRendererFactory = any
> = ListrTaskFn<Ctx, Renderer, FallbackRenderer>