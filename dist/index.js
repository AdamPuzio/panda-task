"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class; var _class2; var _class3; var _class4; var _class5; var _class6; var _class7; var _class8; var _class9;var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// src/logger.ts
var env, debugMode, debugTags, debugLevel, levels, colorize, Logger;
var init_logger = __esm({
  "src/logger.ts"() {
    init_cjs_shims();
    env = process.env;
    debugMode = env.DEBUG;
    debugTags = debugMode && env.DEBUG !== "true" ? env.DEBUG.split(",") : false;
    debugLevel = env.DEBUG_LEVEL || "warn";
    levels = ["log", "error", "warn", "info", "debug"];
    colorize = (message) => ({
      bold: `\x1B[1m${message}\x1B[0m`,
      red: `\x1B[31m${message}\x1B[0m`,
      green: `\x1B[32m${message}\x1B[0m`,
      yellow: `\x1B[33m${message}\x1B[0m`,
      blue: `\x1B[34m${message}\x1B[0m`,
      magenta: `\x1B[35m${message}\x1B[0m`,
      cyan: `\x1B[36m${message}\x1B[0m`,
      white: `\x1B[37m${message}\x1B[0m`,
      gray: `\x1B[90m${message}\x1B[0m`,
      grey: `\x1B[90m${message}\x1B[0m`,
      brightRed: `\x1B[91m${message}\x1B[0m`,
      brightGreen: `\x1B[92m${message}\x1B[0m`,
      brightYellow: `\x1B[93m${message}\x1B[0m`,
      brightBlue: `\x1B[94m${message}\x1B[0m`,
      brightMagenta: `\x1B[95m${message}\x1B[0m`,
      brightCyan: `\x1B[96m${message}\x1B[0m`,
      brightWhite: `\x1B[97m${message}\x1B[0m`,
      bgRed: `\x1B[41m${message}\x1B[0m`,
      bgGreen: `\x1B[42m${message}\x1B[0m`,
      bgYellow: `\x1B[43m${message}\x1B[0m`,
      bgBlue: `\x1B[44m${message}\x1B[0m`,
      bgMagenta: `\x1B[45m${message}\x1B[0m`,
      bgCyan: `\x1B[46m${message}\x1B[0m`,
      bgWhite: `\x1B[47m${message}\x1B[0m`,
      bgGray: `\x1B[100m${message}\x1B[0m`,
      bgGrey: `\x1B[100m${message}\x1B[0m`,
      bgBrightRed: `\x1B[101m${message}\x1B[0m`,
      bgBrightGreen: `\x1B[102m${message}\x1B[0m`,
      bgBrightYellow: `\x1B[103m${message}\x1B[0m`,
      bgBrightBlue: `\x1B[104m${message}\x1B[0m`,
      bgBrightMagenta: `\x1B[105m${message}\x1B[0m`,
      bgBrightCyan: `\x1B[106m${message}\x1B[0m`,
      bgBrightWhite: `\x1B[107m${message}\x1B[0m`,
      bgBlack: `\x1B[40m${message}\x1B[0m`,
      bgBrightBlack: `\x1B[100m${message}\x1B[0m`,
      bgBrightGray: `\x1B[100m${message}\x1B[0m`,
      bgBrightGrey: `\x1B[100m${message}\x1B[0m`
    });
    Logger = exports.Logger = (_class = class _Logger {
      static __initStatic() {this.debugMode = debugMode}
      static __initStatic2() {this.debugTags = debugTags}
      static __initStatic3() {this.debugLevel = debugLevel}
      static __initStatic4() {this.debugLevelInt = levels.indexOf(debugLevel)}
      static __initStatic5() {this.levels = levels}
      static __initStatic6() {this.colorize = colorize}
      static __initStatic7() {this.log = (message, {
        label,
        level = "log",
        tags = [],
        method = "log"
      } = {}) => {
        if (_Logger.debugLevelInt > levels.indexOf(level)) return;
        if (!_Logger.testTags(tags)) return;
        if (label) console.group(`${colorize(label).magenta}`);
        console[method](message);
        if (label) console.groupEnd();
      }}
      static __initStatic8() {this.testTags = (tags) => {
        if (!debugTags) return true;
        return tags.some((tag) => debugTags.includes(tag));
      }}
      static __initStatic9() {this.error = (message, {
        label,
        level = "error",
        tags = []
      } = {}) => {
        _Logger.log(message, { label, level, tags, method: "error" });
      }}
      static __initStatic10() {this.warn = (message, {
        label,
        level = "warn",
        tags = []
      } = {}) => {
        _Logger.log(message, { label, level, tags, method: "warn" });
      }}
      static __initStatic11() {this.info = (message, {
        label,
        level = "info",
        tags = []
      } = {}) => {
        _Logger.log(message, { label, level, tags, method: "info" });
      }}
      static __initStatic12() {this.debug = (message, {
        label,
        level = "debug",
        tags = []
      } = {}) => {
        _Logger.log(message, { label, level, tags, method: "debug" });
      }}
      static __initStatic13() {this.success = (message) => {
        console.log(`\x1B[32m${message}\x1B[0m`);
      }}
      static __initStatic14() {this.fail = (message) => {
        console.log(`\x1B[31m${message}\x1B[0m`);
      }}
      static __initStatic15() {this.table = (data, {
        label,
        level = "log",
        tags = []
      } = {}) => {
        _Logger.log(data, { label, level, tags, method: "table" });
      }}
    }, _class.__initStatic(), _class.__initStatic2(), _class.__initStatic3(), _class.__initStatic4(), _class.__initStatic5(), _class.__initStatic6(), _class.__initStatic7(), _class.__initStatic8(), _class.__initStatic9(), _class.__initStatic10(), _class.__initStatic11(), _class.__initStatic12(), _class.__initStatic13(), _class.__initStatic14(), _class.__initStatic15(), _class);
  }
});

// src/tasks/file/create.ts
var _task = require('#task');
var _factory = require('@panda/factory');
var FileCreateTask;
var init_create = __esm({
  "src/tasks/file/create.ts"() {
    init_cjs_shims();
    FileCreateTask = exports.FileCreateTask = (_class2 = class extends _task.Task {
      static __initStatic16() {this.type = "file:create"}
      static __initStatic17() {this.description = ""}
      // static config = async (config: FileCreateTaskConfig): Promise<FileCreateTaskConfig> => ({
      //   file: path.resolve(config.file),
      //   contents: config.contents,
      //   ifExists: config.ifExists,
      //   encoding: config.encoding || 'utf8'
      // })
      async run({
        file,
        contents = "",
        ifExists = "skip",
        encoding = "utf8"
      }) {
        console.log("Creating file:", file);
        if (!file) throw new Error("No target provided to create file");
        if (typeof file !== "string") throw new Error("Invalid target provided to create file");
        if (typeof contents !== "string") throw new Error("Invalid contents provided to create file");
        const exists = await _factory.Factory.fileExists(file);
        if (exists) {
          if (ifExists === "skip") return;
          if (ifExists === "throw") throw new Error(`${file} already exists`);
        }
        await _factory.Factory.writeFile(file, contents, { ifExists, encoding });
      }
    }, _class2.__initStatic16(), _class2.__initStatic17(), _class2);
  }
});

// src/tasks/file/index.ts
var init_file = __esm({
  "src/tasks/file/index.ts"() {
    init_cjs_shims();
    init_create();
  }
});

// src/tasks/json/create.ts
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

var JsonCreateTask;
var init_create2 = __esm({
  "src/tasks/json/create.ts"() {
    init_cjs_shims();
    init_task();
    JsonCreateTask = exports.JsonCreateTask = (_class3 = class extends Task2 {
      static __initStatic18() {this.type = "json:create"}
      static __initStatic19() {this.description = "Create a JSON file"}
      async run({
        file,
        data = {},
        vals,
        options: {
          ifExists = "skip",
          spaces = 2
        } = {}
      }) {
        if (!file) throw new Error("No target file provided to create JSON file");
        if (!data) throw new Error("No data provided to create JSON file");
        _factory.Factory.ensurePath(_path2.default.dirname(file));
        const exists = await _factory.Factory.fileExists(file);
        if (exists) {
          if (ifExists === "skip") return;
          if (ifExists === "throw") throw new Error(`${file} already exists`);
        }
        let output = JSON.stringify(data, null, spaces);
        output = _factory.Factory.render(output, vals || {});
        await _factory.Factory.writeFile(file, output, { ifExists });
      }
    }, _class3.__initStatic18(), _class3.__initStatic19(), _class3);
  }
});

// src/tasks/json/update.ts


var JsonUpdateTask;
var init_update = __esm({
  "src/tasks/json/update.ts"() {
    init_cjs_shims();
    init_task();
    JsonUpdateTask = exports.JsonUpdateTask = (_class4 = class extends Task2 {
      static __initStatic20() {this.type = "json:update"}
      static __initStatic21() {this.description = "Update a JSON file"}
      async run({
        target,
        data = {},
        ifNotExists = "skip",
        spaces = 2,
        handler = async (contents, data2) => data2
      }) {
        if (!target) throw new Error("No target provided to create JSON file");
        const exists = await _factory.Factory.fileExists(target);
        let contents = {};
        if (!exists) {
          if (ifNotExists === "skip") return this.$task.skip();
          if (ifNotExists === "throw") throw new Error(`${target} does NOT exist`);
          _factory.Factory.ensurePath(_path2.default.dirname(target));
        } else {
          const contentString = await _factory.Factory.readFile(target);
          contents = JSON.parse(contentString);
        }
        let updated = handler(contents, data);
        if (updated instanceof Promise) updated = await updated;
        let output = JSON.stringify(updated, null, spaces);
        await _factory.Factory.writeFile(target, output, { ifExists: "overwrite" });
      }
    }, _class4.__initStatic20(), _class4.__initStatic21(), _class4);
  }
});

// src/tasks/json/index.ts
var init_json = __esm({
  "src/tasks/json/index.ts"() {
    init_cjs_shims();
    init_create2();
    init_update();
  }
});

// src/tasks/npm/install.ts


var NpmInstallTask;
var init_install = __esm({
  "src/tasks/npm/install.ts"() {
    init_cjs_shims();
    NpmInstallTask = exports.NpmInstallTask = (_class5 = class extends _task.Task {
      static __initStatic22() {this.type = "npm:install"}
      static __initStatic23() {this.description = "Install NPM packages"}
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
        path: path4 = process.cwd(),
        packageManager = "npm",
        saveDev = false
      }) {
        if (!packages) throw new Error("No packages provided to install");
        packages = Array.isArray(packages) ? packages : [packages];
        if (saveDev) params.push("-D");
        const packageManagerCli = packageManager === "yarn" ? "yarn add" : "npm install";
        const cd = path4 ? `cd ${path4} && ` : "";
        const cmd = `${cd}${packageManagerCli} ${packages.join(" ")} ${params.join(" ")}`;
        await _factory.Factory.runCommand(cmd);
      }
    }, _class5.__initStatic22(), _class5.__initStatic23(), _class5);
  }
});

// src/tasks/npm/index.ts
var init_npm = __esm({
  "src/tasks/npm/index.ts"() {
    init_cjs_shims();
    init_install();
  }
});

// src/tasks/path/context.ts



var PathContextTask;
var init_context = __esm({
  "src/tasks/path/context.ts"() {
    init_cjs_shims();
    PathContextTask = exports.PathContextTask = (_class6 = class extends _task.Task {
      static __initStatic24() {this.type = "path:context"}
      static __initStatic25() {this.description = "Check context of a path"}
      async run({
        path: path4,
        context
      }) {
        if (!path4) throw new Error("No path provided to check");
        if (!context) throw new Error("No context provided to check");
        if (!Array.isArray(context)) context = [context];
        for (const ctx of context) {
          await this.checkContext(ctx, path4);
        }
      }
      async checkContext(context, target) {
        switch (context) {
          case "inProject":
            return await this.inProject(target);
          case "notInProject":
            return await this.notInProject(target);
          case "inPandaProject":
            return await this.inPandaProject(target);
          case "notInPandaProject":
            return await this.inPandaProject(target, true);
          default:
            throw new Error(`Unknown context: ${context}`);
        }
      }
      async inPanda() {
      }
      async inProject(cwd) {
        console.log("inProject", cwd);
        const packageJson = await this.getPackageJson(cwd, "return");
        if (packageJson === false)
          throw new Error("Needs to be run inside a project");
      }
      async notInProject(cwd) {
        const packageJson = await this.getPackageJson(cwd, "return");
        if (packageJson === true)
          throw new Error("Cannot be run inside a project");
      }
      async inPandaProject(cwd, not = false) {
        const packageJson = await this.getPackageJson(cwd, "return");
        if (not && packageJson === true && packageJson.panda)
          throw new Error("Cannot be run inside a Panda project");
        if (packageJson === false || !packageJson.panda)
          throw new Error("Needs to be run inside a Panda project");
      }
      async getPackageJson(cwd, onError = "throw") {
        const packageJson = _path2.default.join(cwd, "package.json");
        const packageJsonExists = await _factory.Factory.fileExists(packageJson);
        if (!packageJsonExists) {
          if (onError === "return") return false;
          throw new Error(`package.json doesn't exist at ${packageJson}`);
        }
        const json = await _factory.Factory.readJsonFile(packageJson);
        return json;
      }
    }, _class6.__initStatic24(), _class6.__initStatic25(), _class6);
  }
});

// src/tasks/path/ensure.ts


var PathEnsureTask;
var init_ensure = __esm({
  "src/tasks/path/ensure.ts"() {
    init_cjs_shims();
    PathEnsureTask = exports.PathEnsureTask = (_class7 = class extends _task.Task {
      static __initStatic26() {this.type = "path:ensure"}
      static __initStatic27() {this.description = "Ensure path exists"}
      async run({
        path: path4
      }) {
        if (!path4) throw new Error("No target provided to check");
        _factory.Factory.ensurePath(path4);
      }
    }, _class7.__initStatic26(), _class7.__initStatic27(), _class7);
  }
});

// src/tasks/path/exists.ts


var PathExistsTask;
var init_exists = __esm({
  "src/tasks/path/exists.ts"() {
    init_cjs_shims();
    PathExistsTask = exports.PathExistsTask = (_class8 = class extends _task.Task {
      static __initStatic28() {this.type = "path:exists"}
      static __initStatic29() {this.description = "Check if path exists"}
      async run({
        path: path4,
        ifExists = "success",
        ifNotExists = "error"
      }) {
        if (!path4) throw new Error("No path provided to check");
        if (ifExists === "error" || ifNotExists === "success") {
          ifExists = "error";
          ifNotExists = "success";
        }
        const exists = await _factory.Factory.fileExists(path4);
        if (exists) {
          if (ifExists === "error") throw new Error(`${path4} already exists`);
          return;
        } else {
          if (ifNotExists === "error") throw new Error(`${path4} does not exist`);
          return;
        }
      }
    }, _class8.__initStatic28(), _class8.__initStatic29(), _class8);
  }
});

// src/tasks/path/index.ts
var init_path = __esm({
  "src/tasks/path/index.ts"() {
    init_cjs_shims();
    init_context();
    init_ensure();
    init_exists();
  }
});

// src/tasks/index.ts
var tasks_exports = {};
__export(tasks_exports, {
  FileCreateTask: () => FileCreateTask,
  JsonCreateTask: () => JsonCreateTask,
  JsonUpdateTask: () => JsonUpdateTask,
  NpmInstallTask: () => NpmInstallTask,
  PathContextTask: () => PathContextTask,
  PathEnsureTask: () => PathEnsureTask,
  PathExistsTask: () => PathExistsTask
});
var init_tasks = __esm({
  "src/tasks/index.ts"() {
    init_cjs_shims();
    init_file();
    init_json();
    init_npm();
    init_path();
  }
});

// src/task.ts
var _listr2 = require('listr2');
var Task2;
var init_task = __esm({
  "src/task.ts"() {
    init_cjs_shims();
    init_logger();
    Task2 = exports.Task = (_class9 = class _Task {
      static __initStatic30() {this.type = "task"}
      
      
      
      
      __init2() {this.name = false}
      __init3() {this.enabled = true}
      __init4() {this.skip = false}
      
      
      
      __init5() {this.options = {
        concurrent: false,
        exitOnError: true,
        renderer: "default",
        rendererOptions: {
          showSubtasks: true,
          collapseSubtasks: true,
          showSkipMessage: true,
          collapseSkips: true,
          suffixSkips: false,
          showErrorMessage: true,
          collapseErrors: false,
          timer: void 0
        }
      }}
      __init6() {this.tasks = []}
      
      
      
      __init7() {this.Logger = exports.Logger = Logger}
      constructor(cfg = {}) {;_class9.prototype.__init2.call(this);_class9.prototype.__init3.call(this);_class9.prototype.__init4.call(this);_class9.prototype.__init5.call(this);_class9.prototype.__init6.call(this);_class9.prototype.__init7.call(this);_class9.prototype.__init8.call(this);_class9.prototype.__init9.call(this);
        const lineage = this.getLineage().reverse();
        lineage.forEach((task) => {
          if (task.options) this.parseOptions(task.options);
          if (task.import) this.parseImports(task.import);
          if (task.config) this.$derivedConfig = task.config;
          if (task.tasks) this.parseTasks(task.tasks);
        });
        this.configure(cfg);
      }
      configure(cfg) {
        this.$config = cfg;
        this.parseMeta(cfg);
        this.parseOptions(cfg.options);
        this.parseImports(cfg.import);
        this.parseTasks(cfg.tasks);
        if (cfg.config) this.$instanceConfig = cfg.config;
      }
      async run(ctx) {
        if (!this.$task) {
          const task = new (0, _listr2.Listr)(this.tasks, this.options);
          ctx = await this.generateConfig(ctx);
          return await task.run(ctx);
        }
        return await this.runTasks();
      }
      async runTasks(ctx, tasks) {
        if (!ctx) ctx = this.$cfg;
        const options = { ...this.options, ctx };
        if (!tasks) tasks = this.tasks;
        return this.$task.newListr(tasks, options);
      }
      
      
      
      async runTask(ctx, task) {
        this.$ctx = ctx;
        this.$task = task;
        const config = this.$cfg = await this.generateConfig(ctx);
        return await this.run(config);
      }
      build() {
        const con = this.constructor;
        const task = {
          title: this.name === false ? void 0 : this.name || _optionalChain([con, 'optionalAccess', _ => _.name]),
          task: this.runTask.bind(this),
          exitOnError: this.options.exitOnError,
          rendererOptions: this.options.rendererOptions,
          enabled: this.enabled,
          skip: this.skip,
          retry: this.retry,
          rollback: this.rollback
        };
        return task;
      }
      async generateConfig(ctx = {}) {
        if (!this.$derivedConfig && !this.$instanceConfig) return ctx;
        const instanceConfig = typeof this.$instanceConfig === "function" ? await this.$instanceConfig.bind(this)(ctx) : { ...this.$instanceConfig || {}, ...ctx };
        const derivedConfig = typeof this.$derivedConfig === "function" ? await this.$derivedConfig.bind(this)(instanceConfig) : { ...this.$derivedConfig || {}, ...instanceConfig };
        return derivedConfig;
      }
      parseMeta(meta) {
        const metaVars = ["name", "enabled", "skip", "retry", "rollback", "run"];
        metaVars.forEach((key) => {
          if (meta[key]) this[key] = meta[key];
        });
      }
      parseOptions(opts = {}) {
        const baseOptions = ["concurrent", "exitOnError", "exitAfterRollback"];
        for (const opt of baseOptions) {
          if (typeof opts[opt] !== "undefined") this.options[opt] = opts[opt];
        }
        const rendererOptions = ["showSubtasks", "collapseSubtasks", "showSkipMessage", "collapseSkips", "suffixSkips", "showErrorMessage", "collapseErrors"];
        for (const opt of rendererOptions) {
          if (typeof opts[opt] !== "undefined") this.options.rendererOptions[opt] = opts[opt];
        }
        if (typeof opts.timer !== "undefined") this.options.rendererOptions.timer = _listr2.PRESET_TIMER;
        if (typeof opts.$custom !== "undefined") {
          for (const key in opts.$custom) {
            if (typeof opts.$custom[key] === "object")
              this.options[key] = { ...this.options[key], ...opts.$custom[key] };
            else this.options[key] = opts.$custom[key];
          }
        }
      }
      parseImports(imports = {}) {
        if (imports.tasks) _optionalChain([imports, 'access', _2 => _2.tasks, 'optionalAccess', _3 => _3.forEach, 'call', _4 => _4((t) => this.registerTask(t))]);
      }
      parseTasks(tasks = []) {
        for (const t of tasks) {
          let task;
          if (t instanceof _Task) task = t;
          else if (typeof t === "function") task = new t({}, this);
          else {
            if (t.type) {
              task = this.createTask(t, this);
            } else task = new _Task(t);
          }
          this.tasks.push(task.build());
        }
      }
      __init8() {this.$taskTypes = {}}
      registerTask(task) {
        if (!task.type) throw new Error("Task type is required to import a task");
        this.$taskTypes[task.type] = task;
      }
      createTask(cfg, parent) {
        if (!cfg.type) throw new Error("Task type not defined");
        this.loadBaseTasks();
        const taskType = this.$taskTypes[cfg.type];
        if (!taskType) throw new Error(`Task type ${cfg.type} not registered`);
        return new taskType(cfg);
      }
      __init9() {this.$loaded = false}
      loadBaseTasks() {
        if (this.$loaded) return;
        const tasks = (init_tasks(), __toCommonJS(tasks_exports));
        Object.values(tasks).forEach((task) => {
          this.registerTask(task);
        });
        this.$loaded = true;
      }
      getLineage() {
        const scopes = [];
        if (this.constructor) {
          let current = Object.getPrototypeOf(this);
          while (current && current !== Object.prototype) {
            const scope = current.constructor;
            scopes.push(scope);
            current = Object.getPrototypeOf(current);
          }
        }
        return scopes;
      }
      // debug (msg: any, opts: any) {
      //   const { label, level, tags } = opts
      //   const debugMode = process.env.DEBUG
      //   const debugLevel = process.env.DEBUG_LEVEL
      //   if (!debugMode && !debugLevel) return
      //   if (debugLevel && debugLevel !== level) return
      //   if (debugMode !== 'true' && !tags.includes(debugMode)) return
      //   if (label) console.group(`\x1b[35m[${label}]\x1b[0m`)
      //   console.log(msg)
      //   if (label) console.groupEnd()
      // }
    }, _class9.__initStatic30(), _class9);
  }
});

// src/index.ts
init_cjs_shims();
init_logger();
init_task();

// src/task.types.ts
init_cjs_shims();

// src/index.ts
init_tasks();










exports.FileCreateTask = FileCreateTask; exports.JsonCreateTask = JsonCreateTask; exports.JsonUpdateTask = JsonUpdateTask; exports.Logger = Logger; exports.NpmInstallTask = NpmInstallTask; exports.PathContextTask = PathContextTask; exports.PathEnsureTask = PathEnsureTask; exports.PathExistsTask = PathExistsTask; exports.Task = Task2;
