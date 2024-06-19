import { ListrContext, Listr, ListrBaseClassOptions, ListrTask, ListrTaskWrapper, ListrRendererFactory, ListrTaskFn } from 'listr2';
import { Task as Task$1 } from '#task';

interface LogOptions {
    label?: string;
    level?: string;
    tags?: string[];
    method?: 'log' | 'error' | 'warn' | 'info' | 'debug' | 'table';
}
declare class Logger {
    static debugMode: string;
    static debugTags: boolean | string[];
    static debugLevel: string;
    static debugLevelInt: number;
    static levels: string[];
    static colorize: (message: string) => {
        bold: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        gray: string;
        grey: string;
        brightRed: string;
        brightGreen: string;
        brightYellow: string;
        brightBlue: string;
        brightMagenta: string;
        brightCyan: string;
        brightWhite: string;
        bgRed: string;
        bgGreen: string;
        bgYellow: string;
        bgBlue: string;
        bgMagenta: string;
        bgCyan: string;
        bgWhite: string;
        bgGray: string;
        bgGrey: string;
        bgBrightRed: string;
        bgBrightGreen: string;
        bgBrightYellow: string;
        bgBrightBlue: string;
        bgBrightMagenta: string;
        bgBrightCyan: string;
        bgBrightWhite: string;
        bgBlack: string;
        bgBrightBlack: string;
        bgBrightGray: string;
        bgBrightGrey: string;
    };
    static log: (message: any, { label, level, tags, method }?: LogOptions) => void;
    static testTags: (tags: string[]) => boolean;
    static error: (message: any, { label, level, tags }?: LogOptions) => void;
    static warn: (message: any, { label, level, tags }?: LogOptions) => void;
    static info: (message: any, { label, level, tags }?: LogOptions) => void;
    static debug: (message: any, { label, level, tags }?: LogOptions) => void;
    static success: (message: string) => void;
    static fail: (message: string) => void;
    static table: (data: any, { label, level, tags }?: LogOptions) => void;
}

type TaskContext = ListrContext;
interface TaskSuper extends Listr {
}
interface TaskSuperOptions extends ListrBaseClassOptions {
}
interface TaskSuperTask extends ListrTask {
}
interface TaskSuperWrapper extends ListrTaskWrapper<any, any, any> {
}
interface TaskBaseConfig {
    [key: GlobalVariable]: any;
    [key: LocalVariable]: any;
}
interface TaskConfig extends TaskBaseConfig {
    [key: string]: any;
}
type TaskConfigProps = {
    [key: string]: any;
} | ((ctx: TaskConfig) => TaskConfig | Promise<TaskConfig>);
interface TaskInterface {
    name?: string | boolean;
    config?: TaskConfigProps;
    tasks?: TaskSuperTask[];
    taskTypes?: Array<typeof Task>;
    options: TaskSuperOptions;
    enabled: boolean | ((ctx: TaskContext) => boolean | Promise<boolean>);
    skip: boolean | string | ((ctx: TaskContext) => boolean | string | Promise<boolean | string>);
    retry?: number | {
        tries: number;
        delay?: number;
    };
    rollback?: TaskRollback;
    import?: {
        tasks?: Array<typeof Task>;
    };
    run?(cfg: any): Promise<any>;
    debug?(cfg: any, opts?: {
        level: string;
        tags: string[];
    }): void;
}
interface TaskProps {
    type?: string;
    name?: string | boolean;
    tasks?: Array<TaskProps | Task | {
        new (): Task;
    }>;
    run?: (cfg: any) => Promise<void>;
    options?: TaskOptions;
    config?: {
        [key: string]: any;
    };
    import?: {
        tasks: Array<typeof Task>;
    };
    enabled?: boolean | ((ctx: TaskContext) => boolean | Promise<boolean>);
    skip?: boolean | string | ((ctx: TaskContext) => boolean | string | Promise<boolean | string>);
    retry?: number | {
        tries: number;
        delay?: number;
    };
    rollback?: TaskRollback;
}
interface TaskOptions {
    concurrent?: boolean;
    exitOnError?: boolean;
    exitAfterRollback?: boolean;
    timer?: boolean;
    showSubtasks?: boolean;
    collapseSubtasks?: boolean;
    showSkipMessage?: boolean;
    collapseSkips?: boolean;
    suffixSkips?: boolean;
    showErrorMessage?: boolean;
    collapseErrors?: boolean;
    $custom?: {
        [key: string]: any;
    };
}
type TaskRollback<Ctx = TaskContext, Renderer extends ListrRendererFactory = any, FallbackRenderer extends ListrRendererFactory = any> = ListrTaskFn<Ctx, Renderer, FallbackRenderer>;

interface TaskImport {
    tasks?: Array<typeof Task>;
}
declare class Task implements TaskInterface {
    static type: string;
    static config: any;
    static options: any;
    static import: any;
    static tasks: any;
    name: string | boolean;
    enabled: boolean;
    skip: boolean;
    retry: any;
    rollback: any;
    import?: TaskImport;
    options: TaskSuperOptions;
    tasks: TaskSuperTask[];
    $config: any;
    $derivedConfig: any;
    $instanceConfig: any;
    Logger: typeof Logger;
    constructor(cfg?: TaskProps);
    configure(cfg: TaskProps): void;
    run(ctx: any): Promise<any>;
    runTasks(ctx?: any, tasks?: TaskSuperTask[]): Promise<any>;
    protected $ctx: any;
    protected $cfg: any;
    protected $task: any;
    protected runTask(ctx: any, task: TaskSuperWrapper): Promise<any>;
    protected build(): TaskSuperTask;
    protected generateConfig(ctx?: any): Promise<any>;
    protected parseMeta(meta: any): void;
    protected parseOptions(opts?: TaskOptions): void;
    protected parseImports(imports?: TaskImport): void;
    protected parseTasks(tasks?: Array<TaskProps | Task | {
        new (cfg?: any, parent?: Task): Task;
    }>): void;
    $taskTypes: {
        [key: string]: typeof Task;
    };
    protected registerTask(task: typeof Task): void;
    protected createTask(cfg: TaskProps, parent: Task): Task;
    protected $loaded: boolean;
    protected loadBaseTasks(): void;
    protected getLineage(): any[];
}

interface FileCreateTaskConfig {
    file: string;
    contents: string;
    ifExists: 'skip' | 'overwrite' | 'throw';
    encoding?: string;
}
declare class FileCreateTask extends Task$1 {
    static type: string;
    static description: string;
    run({ file, contents, ifExists, encoding }: FileCreateTaskConfig): Promise<void>;
}

declare class JsonCreateTask extends Task {
    static type: string;
    static description: string;
    run({ file, data, vals, options: { ifExists, spaces } }: {
        file: string;
        data: {
            [key: string]: any;
        };
        vals: {
            [key: string]: any;
        };
        options: {
            ifExists?: 'skip' | 'overwrite' | 'throw';
            spaces?: number;
        };
    }): Promise<void>;
}

type Data = {
    [key: string]: any;
};
declare class JsonUpdateTask extends Task {
    static type: string;
    static description: string;
    run({ target, data, ifNotExists, spaces, handler }: {
        target: string;
        data?: Data;
        ifNotExists?: 'skip' | 'create' | 'throw';
        spaces?: number;
        handler?: (contents: Data, data: Data) => Data | Promise<Data>;
    }): Promise<any>;
}

interface NpmInstallTaskConfig {
    packages: string | string[];
    params?: string[];
    path?: string;
    packageManager?: 'npm' | 'yarn';
    saveDev?: boolean;
}
declare class NpmInstallTask extends Task$1 {
    static type: string;
    static description: string;
    run({ packages, params, path, packageManager, saveDev }: NpmInstallTaskConfig): Promise<void>;
}

declare class PathContextTask extends Task$1 {
    static type: string;
    static description: string;
    run({ path, context }: {
        path: string;
        context: string | string[];
    }): Promise<void>;
    checkContext(context: any, target: any): Promise<void>;
    inPanda(): Promise<void>;
    inProject(cwd: any): Promise<void>;
    notInProject(cwd: any): Promise<void>;
    inPandaProject(cwd: any, not?: boolean): Promise<void>;
    getPackageJson(cwd: any, onError?: string): Promise<any>;
}

interface PathEnsureTaskConfig {
    path: string;
}
declare class PathEnsureTask extends Task$1 {
    static type: string;
    static description: string;
    run({ path }: PathEnsureTaskConfig): Promise<void>;
}

interface PathExistsTaskConfig {
    path: string;
    ifExists: 'success' | 'error';
    ifNotExists: 'success' | 'error';
}
declare class PathExistsTask extends Task$1 {
    static type: string;
    static description: string;
    run({ path, ifExists, ifNotExists }: PathExistsTaskConfig): Promise<void>;
}

export { FileCreateTask, JsonCreateTask, JsonUpdateTask, Logger, NpmInstallTask, PathContextTask, PathEnsureTask, PathExistsTask, Task, type TaskBaseConfig, type TaskConfig, type TaskConfigProps, type TaskContext, type TaskInterface, type TaskOptions, type TaskProps, type TaskRollback, type TaskSuper, type TaskSuperOptions, type TaskSuperTask, type TaskSuperWrapper };
