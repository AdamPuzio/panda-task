import path from 'path'

import { Task } from '#task'
import { Factory } from '@panda/factory'

type Data = { [key: string]: any }

interface FileCreateTaskConfig {
  file: string
  contents: string
  ifExists: 'skip' | 'overwrite' | 'throw'
  encoding?: string
}

export class FileCreateTask extends Task {
  static type = 'file:create'
  static description = ''

  // static config = async (config: FileCreateTaskConfig): Promise<FileCreateTaskConfig> => ({
  //   file: path.resolve(config.file),
  //   contents: config.contents,
  //   ifExists: config.ifExists,
  //   encoding: config.encoding || 'utf8'
  // })

  async run({
    file,
    contents = '',
    ifExists = 'skip',
    encoding = 'utf8'
  }: FileCreateTaskConfig) {
    console.log('Creating file:', file)
    if (!file) throw new Error('No target provided to create file')
    if (typeof file !== 'string') throw new Error('Invalid target provided to create file')
    if (typeof contents !== 'string') throw new Error('Invalid contents provided to create file')

    // validate target doesn't exist and fail if it does
    const exists = await Factory.fileExists(file)
    if (exists) {
      if (ifExists === 'skip') return
      if (ifExists === 'throw') throw new Error(`${file} already exists`)
    }
    
    await Factory.writeFile(file, contents, { ifExists, encoding })
  }
}
