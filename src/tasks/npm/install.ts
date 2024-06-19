import path from 'path'

import { Task } from '#task'
import { Factory } from '@panda/factory'

interface NpmInstallTaskConfig {
  packages: string | string[]
  params?: string[]
  path?: string
  packageManager?: 'npm' | 'yarn'
  saveDev?: boolean
}

export class NpmInstallTask extends Task {
  static type = 'npm:install'
  static description = 'Install NPM packages'

  // static config = async (config: NpmInstallTaskConfig): Promise<NpmInstallTaskConfig> => ({
  //   packages,
  //   params = [],
  //   target,
  //   packageManager = 'npm',
  //   saveDev = false
  // })

  async run({
    packages,
    params = [],
    path = process.cwd(),
    packageManager = 'npm',
    saveDev = false
  }: NpmInstallTaskConfig) {
    if (!packages) throw new Error('No packages provided to install')
    packages = Array.isArray(packages) ? packages : [packages]

    if (saveDev) params.push('-D')

    const packageManagerCli = packageManager === 'yarn' ? 'yarn add' : 'npm install'

    const cd = path ? `cd ${path} && ` : ''
    const cmd = `${cd}${packageManagerCli} ${packages.join(' ')} ${params.join(' ')}`
    await Factory.runCommand(cmd)
  }
}
