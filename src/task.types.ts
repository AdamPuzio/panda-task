import { Task } from './task'
import {
  ListrBaseClassOptions, 
  ListrContext,
  ListrRendererFactory,
  ListrTask,
  ListrTaskFn,
  ListrTaskWrapper,
} from 'listr2'

export type TaskContext = ListrContext

export type TaskConfig = { [key: string]: any }
export type TaskConfigProps = { [key: string]: any } | ((ctx: TaskConfig) => TaskConfig | Promise<TaskConfig>)

export interface TaskSuperProps extends ListrTask {}
export interface TaskSuperOptionsProps extends ListrBaseClassOptions {}
export interface TaskSuperWrapperProps extends ListrTaskWrapper<any, any, any> {}

export interface TaskOptionsProps {
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

export interface TaskProps {
  type?: string
  name?: string
  tasks?: Array<TaskProps | Task | { new(): Task }>
  run?: (cfg: any, ctx: any, task: Task) => Promise<void>
  options?: TaskOptionsProps
  config?: { [key: string]: any }
  taskTypes?: Array<typeof Task>
  
  enabled?: boolean | ((ctx: TaskContext) => boolean | Promise<boolean>)
  skip?: boolean | string | ((ctx: TaskContext) => boolean | string | Promise<boolean | string>)
  retry?: number | { tries: number, delay?: number }
  rollback?: TaskRollbackProps
}

export type TaskRollbackProps<Ctx = TaskContext, Renderer extends ListrRendererFactory = any, FallbackRenderer extends ListrRendererFactory = any> = ListrTaskFn<Ctx, Renderer, FallbackRenderer>
