var __defProp = Object.defineProperty;
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

// src/esm-shim.ts
import { createRequire } from "module";
import path from "path";
import url from "url";
var init_esm_shim = __esm({
  "src/esm-shim.ts"() {
    globalThis.require = createRequire(import.meta.url);
    globalThis.__filename = url.fileURLToPath(import.meta.url);
    globalThis.__dirname = path.dirname(__filename);
  }
});

// src/tasks/file/create.ts
import { Task } from "#task";
import { Factory } from "@panda/factory";
var FileCreateTask;
var init_create = __esm({
  "src/tasks/file/create.ts"() {
    init_esm_shim();
    FileCreateTask = class extends Task {
      static type = "file:create";
      static description = "";
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
        const exists = await Factory.fileExists(file);
        if (exists) {
          if (ifExists === "skip") return;
          if (ifExists === "throw") throw new Error(`${file} already exists`);
        }
        await Factory.writeFile(file, contents, { ifExists, encoding });
      }
    };
  }
});

// src/tasks/file/index.ts
var init_file = __esm({
  "src/tasks/file/index.ts"() {
    init_esm_shim();
    init_create();
  }
});

// src/tasks/json/create.ts
import path2 from "path";
import { Factory as Factory2 } from "@panda/factory";
var JsonCreateTask;
var init_create2 = __esm({
  "src/tasks/json/create.ts"() {
    init_esm_shim();
    init_task();
    JsonCreateTask = class extends Task2 {
      static type = "json:create";
      static description = "Create a JSON file";
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
        Factory2.ensurePath(path2.dirname(file));
        const exists = await Factory2.fileExists(file);
        if (exists) {
          if (ifExists === "skip") return;
          if (ifExists === "throw") throw new Error(`${file} already exists`);
        }
        let output = JSON.stringify(data, null, spaces);
        output = Factory2.render(output, vals || {});
        await Factory2.writeFile(file, output, { ifExists });
      }
    };
  }
});

// src/tasks/json/update.ts
import path3 from "path";
import { Factory as Factory3 } from "@panda/factory";
var JsonUpdateTask;
var init_update = __esm({
  "src/tasks/json/update.ts"() {
    init_esm_shim();
    init_task();
    JsonUpdateTask = class extends Task2 {
      static type = "json:update";
      static description = "Update a JSON file";
      async run({
        target,
        data = {},
        ifNotExists = "skip",
        spaces = 2,
        handler = async (contents, data2) => data2
      }) {
        if (!target) throw new Error("No target provided to create JSON file");
        const exists = await Factory3.fileExists(target);
        let contents = {};
        if (!exists) {
          if (ifNotExists === "skip") return this.$task.skip();
          if (ifNotExists === "throw") throw new Error(`${target} does NOT exist`);
          Factory3.ensurePath(path3.dirname(target));
        } else {
          const contentString = await Factory3.readFile(target);
          contents = JSON.parse(contentString);
        }
        let updated = handler(contents, data);
        if (updated instanceof Promise) updated = await updated;
        let output = JSON.stringify(updated, null, spaces);
        await Factory3.writeFile(target, output, { ifExists: "overwrite" });
      }
    };
  }
});

// src/tasks/json/index.ts
var init_json = __esm({
  "src/tasks/json/index.ts"() {
    init_esm_shim();
    init_create2();
    init_update();
  }
});

// src/tasks/npm/install.ts
import { Task as Task3 } from "#task";
import { Factory as Factory4 } from "@panda/factory";
var NpmInstallTask;
var init_install = __esm({
  "src/tasks/npm/install.ts"() {
    init_esm_shim();
    NpmInstallTask = class extends Task3 {
      static type = "npm:install";
      static description = "Install NPM packages";
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
        path: path5 = process.cwd(),
        packageManager = "npm",
        saveDev = false
      }) {
        if (!packages) throw new Error("No packages provided to install");
        packages = Array.isArray(packages) ? packages : [packages];
        if (saveDev) params.push("-D");
        const packageManagerCli = packageManager === "yarn" ? "yarn add" : "npm install";
        const cd = path5 ? `cd ${path5} && ` : "";
        const cmd = `${cd}${packageManagerCli} ${packages.join(" ")} ${params.join(" ")}`;
        await Factory4.runCommand(cmd);
      }
    };
  }
});

// src/tasks/npm/index.ts
var init_npm = __esm({
  "src/tasks/npm/index.ts"() {
    init_esm_shim();
    init_install();
  }
});

// src/tasks/path/context.ts
import path4 from "path";
import { Task as Task4 } from "#task";
import { Factory as Factory5 } from "@panda/factory";
var PathContextTask;
var init_context = __esm({
  "src/tasks/path/context.ts"() {
    init_esm_shim();
    PathContextTask = class extends Task4 {
      static type = "path:context";
      static description = "Check context of a path";
      async run({
        path: path5,
        context
      }) {
        if (!path5) throw new Error("No path provided to check");
        if (!context) throw new Error("No context provided to check");
        if (!Array.isArray(context)) context = [context];
        for (const ctx of context) {
          await this.checkContext(ctx, path5);
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
        const packageJson = path4.join(cwd, "package.json");
        const packageJsonExists = await Factory5.fileExists(packageJson);
        if (!packageJsonExists) {
          if (onError === "return") return false;
          throw new Error(`package.json doesn't exist at ${packageJson}`);
        }
        const json = await Factory5.readJsonFile(packageJson);
        return json;
      }
    };
  }
});

// src/tasks/path/ensure.ts
import { Task as Task5 } from "#task";
import { Factory as Factory6 } from "@panda/factory";
var PathEnsureTask;
var init_ensure = __esm({
  "src/tasks/path/ensure.ts"() {
    init_esm_shim();
    PathEnsureTask = class extends Task5 {
      static type = "path:ensure";
      static description = "Ensure path exists";
      async run({
        path: path5
      }) {
        if (!path5) throw new Error("No target provided to check");
        Factory6.ensurePath(path5);
      }
    };
  }
});

// src/tasks/path/exists.ts
import { Task as Task6 } from "#task";
import { Factory as Factory7 } from "@panda/factory";
var PathExistsTask;
var init_exists = __esm({
  "src/tasks/path/exists.ts"() {
    init_esm_shim();
    PathExistsTask = class extends Task6 {
      static type = "path:exists";
      static description = "Check if path exists";
      async run({
        path: path5,
        ifExists = "success",
        ifNotExists = "error"
      }) {
        if (!path5) throw new Error("No path provided to check");
        if (ifExists === "error" || ifNotExists === "success") {
          ifExists = "error";
          ifNotExists = "success";
        }
        const exists = await Factory7.fileExists(path5);
        if (exists) {
          if (ifExists === "error") throw new Error(`${path5} already exists`);
          return;
        } else {
          if (ifNotExists === "error") throw new Error(`${path5} does not exist`);
          return;
        }
      }
    };
  }
});

// src/tasks/path/index.ts
var init_path = __esm({
  "src/tasks/path/index.ts"() {
    init_esm_shim();
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
    init_esm_shim();
    init_file();
    init_json();
    init_npm();
    init_path();
  }
});

// src/task.ts
import { Listr, PRESET_TIMER } from "listr2";
import { Trace } from "@panda/trace";
var Task2;
var init_task = __esm({
  "src/task.ts"() {
    init_esm_shim();
    Task2 = class _Task {
      static type = "task";
      static config;
      static options;
      static import;
      static tasks;
      name = false;
      enabled = true;
      skip = false;
      retry;
      rollback;
      import;
      options = {
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
      };
      tasks = [];
      $config;
      $derivedConfig;
      $instanceConfig;
      // Per panda-opencode/DECISIONS.md: previously a hand-rolled internal
      // Logger class duplicating @panda/trace's entire shape. Deprecated in
      // favor of depending on @panda/trace directly.
      Trace = Trace;
      constructor(cfg = {}) {
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
          const task = new Listr(this.tasks, this.options);
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
      $ctx;
      $cfg;
      $task;
      async runTask(ctx, task) {
        this.$ctx = ctx;
        this.$task = task;
        const config = this.$cfg = await this.generateConfig(ctx);
        return await this.run(config);
      }
      build() {
        const con = this.constructor;
        const task = {
          title: this.name === false ? void 0 : this.name || con?.name,
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
        if (typeof opts.timer !== "undefined") this.options.rendererOptions.timer = PRESET_TIMER;
        if (typeof opts.$custom !== "undefined") {
          for (const key in opts.$custom) {
            if (typeof opts.$custom[key] === "object")
              this.options[key] = { ...this.options[key], ...opts.$custom[key] };
            else this.options[key] = opts.$custom[key];
          }
        }
      }
      parseImports(imports = {}) {
        if (imports.tasks) imports.tasks?.forEach((t) => this.registerTask(t));
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
      $taskTypes = {};
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
      $loaded = false;
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
    };
  }
});

// src/index.ts
init_esm_shim();
init_task();

// src/task.types.ts
init_esm_shim();

// src/index.ts
init_tasks();
export {
  FileCreateTask,
  JsonCreateTask,
  JsonUpdateTask,
  NpmInstallTask,
  PathContextTask,
  PathEnsureTask,
  PathExistsTask,
  Task2 as Task
};
