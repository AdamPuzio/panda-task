import path from 'path'

import { Task } from '../../task'
import { Factory } from '@panda/factory'

type Data = { [key: string]: any }

export class JsonCreateTask extends Task {
  static type = 'json:create'
  static description = 'Create a JSON file'

  async run({
    file,
    data = {},
    vals,
    options: {
      ifExists = 'skip',
      spaces = 2
    } = {}
  }: {
    file: string
    data: { [key: string]: any }
    vals: { [key: string]: any }
    options: {
      ifExists?: 'skip' | 'overwrite' | 'throw',
      spaces?: number 
    }
  }) {
    if (!file) throw new Error('No target file provided to create JSON file')
    if (!data) throw new Error('No data provided to create JSON file')

    // ensure the base target path exists
    Factory.ensurePath(path.dirname(file))
    const exists = await Factory.fileExists(file)
    if (exists) {
      if (ifExists === 'skip') return
      if (ifExists === 'throw') throw new Error(`${file} already exists`)
    }
    let output = JSON.stringify(data, null, spaces)
    output = Factory.render(output, vals || {})
    await Factory.writeFile(file, output, { ifExists: ifExists })
  }
}
