import { Task } from '#task'
import { Factory } from '@panda/factory'

interface PathEnsureTaskConfig {
  path: string
}

export class PathEnsureTask extends Task {
  static type = 'path:ensure'
  static description = 'Ensure path exists'

  async run({
    path
  }: PathEnsureTaskConfig) {
    if (!path) throw new Error('No target provided to check')

    // ensure the base target path exists
    Factory.ensurePath(path)
  }
}
