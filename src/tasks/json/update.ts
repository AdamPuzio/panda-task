import path from 'path'

import { Task } from '../../task'
import { Factory } from '@panda/factory'

type Data = { [key: string]: any }

export class JsonUpdateTask extends Task {
  static type = 'json:update'
  static description = 'Update a JSON file'

  async run({
    target,
    data = {},
    ifNotExists = 'skip',
    spaces = 2,
    handler = async (contents: Data, data: Data) => data
  }: {
    target: string
    data?: Data
    ifNotExists?: 'skip' | 'create' | 'throw',
    spaces?: number
    handler?: (contents: Data, data: Data) => Data | Promise<Data>
  }) {
    if (!target) throw new Error('No target provided to create JSON file')

    const exists = await Factory.fileExists(target)
    let contents = {}
    if (!exists) {
      if (ifNotExists === 'skip') return this.$task.skip()
      if (ifNotExists === 'throw') throw new Error(`${target} does NOT exist`)
      // in 'create' mode, ensure the base target path exists
      Factory.ensurePath(path.dirname(target))
    } else {
      const contentString = await Factory.readFile(target)
      contents = JSON.parse(contentString)
    }

    // run the handler
    let updated = handler(contents, data)
    if (updated instanceof Promise) updated = await updated

    let output = JSON.stringify(updated, null, spaces)
    // output = Factory.render(output)
    await Factory.writeFile(target, output, { ifExists: 'overwrite' })
  }
}
