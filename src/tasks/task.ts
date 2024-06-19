import path from 'path'

import { Task } from '#task'
import { Factory } from '@panda/factory'

interface TaskConfig {}

export class XTask extends Task {
  static type = ''
  static display: string = ''
  static description = ''

  static config = async (config: TaskConfig): Promise<TaskConfig> => ({})

  async run({}: TaskConfig) {}
}
