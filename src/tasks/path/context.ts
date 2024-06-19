import path from 'path'

import { Task } from '#task'
import { Factory } from '@panda/factory'

type Data = { [key: string]: any }

export class PathContextTask extends Task {
  static type = 'path:context'
  static description = 'Check context of a path'

  async run({
    path,
    context
  }: {
    path: string,
    context: string | string[]
  }) {
    if (!path) throw new Error('No path provided to check')
    if (!context) throw new Error('No context provided to check')

    if (!Array.isArray(context)) context = [context]
    for (const ctx of context) {
      await this.checkContext(ctx, path)
    }
  }

  async checkContext(context, target) {
    switch (context) {
      case 'inProject':
        return await this.inProject(target)
      case 'notInProject':
        return await this.notInProject(target)
      case 'inPandaProject':
        return await this.inPandaProject(target)
      case 'notInPandaProject':
        return await this.inPandaProject(target, true)
      default:
        throw new Error(`Unknown context: ${context}`)
    }
  }

  async inPanda() {}

  async inProject(cwd) {
    console.log('inProject', cwd)
    const packageJson = await this.getPackageJson(cwd, 'return')
    if (packageJson === false)
      throw new Error('Needs to be run inside a project')
  }

  async notInProject(cwd) {
    const packageJson = await this.getPackageJson(cwd, 'return')
    if (packageJson === true)
      throw new Error('Cannot be run inside a project')
  }

  async inPandaProject(cwd, not = false) {
    const packageJson = await this.getPackageJson(cwd, 'return')
    if (not && packageJson === true && packageJson.panda)
      throw new Error('Cannot be run inside a Panda project')
    if (packageJson === false || !packageJson.panda)
      throw new Error('Needs to be run inside a Panda project')
  }

  async getPackageJson(cwd, onError = 'throw') {
    const packageJson = path.join(cwd, 'package.json')
    const packageJsonExists = await Factory.fileExists(packageJson)
    if (!packageJsonExists) {
      if (onError === 'return') return false
      throw new Error(`package.json doesn't exist at ${packageJson}`)
    }
    const json = await Factory.readJsonFile(packageJson)
    return json
  }
}
