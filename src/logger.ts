const env = process.env
const debugMode = env.DEBUG
const debugTags = debugMode && env.DEBUG !== 'true' ? env.DEBUG.split(',') : false
const debugLevel = env.DEBUG_LEVEL || 'warn'

const levels = ['log', 'error', 'warn', 'info', 'debug']

interface LogOptions {
  label?: string
  level?: string
  tags?: string[]
  method?: 'log' | 'error' | 'warn' | 'info' | 'debug' | 'table'
}

// const colorize = (message: string, color: string) => `\x1b[${color}${message}\x1b[0m`
const colorize = (message: string) => ({
  bold: `\x1b[1m${message}\x1b[0m`,
  red: `\x1b[31m${message}\x1b[0m`,
  green: `\x1b[32m${message}\x1b[0m`,
  yellow: `\x1b[33m${message}\x1b[0m`,
  blue: `\x1b[34m${message}\x1b[0m`,
  magenta: `\x1b[35m${message}\x1b[0m`,
  cyan: `\x1b[36m${message}\x1b[0m`,
  white: `\x1b[37m${message}\x1b[0m`,
  gray: `\x1b[90m${message}\x1b[0m`,
  grey: `\x1b[90m${message}\x1b[0m`,
  brightRed: `\x1b[91m${message}\x1b[0m`,
  brightGreen: `\x1b[92m${message}\x1b[0m`,
  brightYellow: `\x1b[93m${message}\x1b[0m`,
  brightBlue: `\x1b[94m${message}\x1b[0m`,
  brightMagenta: `\x1b[95m${message}\x1b[0m`,
  brightCyan: `\x1b[96m${message}\x1b[0m`,
  brightWhite: `\x1b[97m${message}\x1b[0m`,
  bgRed: `\x1b[41m${message}\x1b[0m`,
  bgGreen: `\x1b[42m${message}\x1b[0m`,
  bgYellow: `\x1b[43m${message}\x1b[0m`,
  bgBlue: `\x1b[44m${message}\x1b[0m`,
  bgMagenta: `\x1b[45m${message}\x1b[0m`,
  bgCyan: `\x1b[46m${message}\x1b[0m`,
  bgWhite: `\x1b[47m${message}\x1b[0m`,
  bgGray: `\x1b[100m${message}\x1b[0m`,
  bgGrey: `\x1b[100m${message}\x1b[0m`,
  bgBrightRed: `\x1b[101m${message}\x1b[0m`,
  bgBrightGreen: `\x1b[102m${message}\x1b[0m`,
  bgBrightYellow: `\x1b[103m${message}\x1b[0m`,
  bgBrightBlue: `\x1b[104m${message}\x1b[0m`,
  bgBrightMagenta: `\x1b[105m${message}\x1b[0m`,
  bgBrightCyan: `\x1b[106m${message}\x1b[0m`,
  bgBrightWhite: `\x1b[107m${message}\x1b[0m`,
  bgBlack: `\x1b[40m${message}\x1b[0m`,
  bgBrightBlack: `\x1b[100m${message}\x1b[0m`,
  bgBrightGray: `\x1b[100m${message}\x1b[0m`,
  bgBrightGrey: `\x1b[100m${message}\x1b[0m`,
})

export class Logger {
  static debugMode = debugMode
  static debugTags = debugTags
  static debugLevel = debugLevel
  static debugLevelInt = levels.indexOf(debugLevel)

  static levels = levels

  static colorize = colorize

  static log = (message: any, {
    label,
    level = 'log',
    tags = [],
    method = 'log'
  }: LogOptions = {}) => {
    if (Logger.debugLevelInt > levels.indexOf(level)) return
    if (!Logger.testTags(tags)) return
    if (label) console.group(`${colorize(label).magenta}`)
    console[method](message)
    if (label) console.groupEnd()
  }

  static testTags = (tags: string[]) => {
    if (!debugTags) return true
    return tags.some(tag => debugTags.includes(tag))
  }

  static error = (message: any, {
    label,
    level = 'error',
    tags = []
  }: LogOptions = {}) => {
    Logger.log(message, { label, level, tags, method: 'error' })
  }

  static warn = (message: any, {
    label,
    level = 'warn',
    tags = []
  }: LogOptions = {}) => {
    Logger.log(message, { label, level, tags, method: 'warn' })
  }

  static info = (message: any, {
    label,
    level = 'info',
    tags = []
  }: LogOptions = {}) => {
    Logger.log(message, { label, level, tags, method: 'info' })
  }

  static debug = (message: any, {
    label,
    level = 'debug',
    tags = []
  }: LogOptions = {}) => {
    Logger.log(message, { label, level, tags, method: 'debug' })
  }

  static success = (message: string) => {
    console.log(`\x1b[32m${message}\x1b[0m`)
  }

  static fail = (message: string) => {
    console.log(`\x1b[31m${message}\x1b[0m`)
  }

  static table = (data: any, {
    label,
    level = 'log',
    tags = []
  }: LogOptions = {}) => {
    Logger.log(data, { label, level, tags, method: 'table' })
  }
}