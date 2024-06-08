import { Task } from './task'
import { TaskProps } from './task.types'

class TaskManagerClass {
  private taskTypes: { [key: string]: typeof Task } = {}

  registerTaskType (taskType: typeof Task) {
    this.taskTypes[taskType.type] = taskType
  }

  createTask (cfg: TaskProps) {
    const taskType = this.taskTypes[cfg.type]
    if (!taskType) throw new Error(`Task type ${cfg.type} not registered`)
    return new taskType(cfg)
  }
}

export const TaskManager = new TaskManagerClass()