import { Task } from '#task'
import { Factory } from '@panda/factory'

interface PathExistsTaskConfig {
  path: string
  ifExists: 'success' | 'error'
  ifNotExists: 'success' | 'error'
}

export class PathExistsTask extends Task {
  static type = 'path:exists'
  static description = 'Check if path exists'

  async run({
    path,
    ifExists = 'success',
    ifNotExists = 'error'
  }: PathExistsTaskConfig) {
    if (!path) throw new Error('No path provided to check') // check if path is provided
    if (ifExists === 'error' || ifNotExists === 'success') { // check if the options are valid
      ifExists = 'error'
      ifNotExists = 'success'
    }

    // check if the path exists
    const exists = await Factory.fileExists(path)
    if (exists) {
      if (ifExists === 'error') throw new Error(`${path} already exists`)
      return
    } else {
      if (ifNotExists === 'error') throw new Error(`${path} does not exist`)
      return
    }
  }
}
