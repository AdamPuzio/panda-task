import { ListrContext, ListrTask, ListrBaseClassOptions, ListrTaskWrapper, ListrRendererFactory, ListrTaskFn } from 'listr2';

type TaskContext = ListrContext;
type TaskConfig = {
    [key: string]: any;
};
type TaskConfigProps = {
    [key: string]: any;
} | ((ctx: TaskConfig) => TaskConfig | Promise<TaskConfig>);
interface TaskSuperProps extends ListrTask {
}
interface TaskSuperOptionsProps extends ListrBaseClassOptions {
}
interface TaskSuperWrapperProps extends ListrTaskWrapper<any, any, any> {
}
interface TaskOptionsProps {
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
interface TaskProps {
    type?: string;
    name?: string;
    tasks?: Array<TaskProps | Task | {
        new (): Task;
    }>;
    run?: (cfg: any, ctx: any, task: Task) => Promise<void>;
    options?: TaskOptionsProps;
    config?: {
        [key: string]: any;
    };
    taskTypes?: Array<typeof Task>;
    enabled?: boolean | ((ctx: TaskContext) => boolean | Promise<boolean>);
    skip?: boolean | string | ((ctx: TaskContext) => boolean | string | Promise<boolean | string>);
    retry?: number | {
        tries: number;
        delay?: number;
    };
    rollback?: TaskRollbackProps;
}
type TaskRollbackProps<Ctx = TaskContext, Renderer extends ListrRendererFactory = any, FallbackRenderer extends ListrRendererFactory = any> = ListrTaskFn<Ctx, Renderer, FallbackRenderer>;

declare class Task {
    static type: string;
    name: string | false;
    tasks: TaskSuperProps[];
    config: TaskConfigProps;
    enabled: boolean | ((ctx: TaskContext) => boolean | Promise<boolean>);
    skip: boolean | string | ((ctx: TaskContext) => boolean | string | Promise<boolean | string>);
    retry?: number | {
        tries: number;
        delay?: number;
    };
    rollback?: TaskRollbackProps;
    options: TaskSuperOptionsProps;
    _props: {};
    constructor(cfg?: TaskProps);
    protected build(): TaskSuperProps;
    protected runTask(ctx: any, task: TaskSuperWrapperProps): Promise<any>;
    run(cfg: any, ctx: any, task: TaskSuperWrapperProps): Promise<any>;
    protected parseMeta(cfg: TaskProps): void;
    protected parseOptions(opts?: TaskOptionsProps): void;
    protected registerTaskTypes(taskTypes?: Array<typeof Task>): void;
    protected registerTasks(tasks?: Array<TaskProps | Task | {
        new (): Task;
    }>): void;
}

declare class TaskManagerClass {
    private taskTypes;
    registerTaskType(taskType: typeof Task): void;
    createTask(cfg: TaskProps): Task;
}
declare const TaskManager: TaskManagerClass;

export { Task, type TaskConfig, type TaskConfigProps, type TaskContext, TaskManager, type TaskOptionsProps, type TaskProps, type TaskRollbackProps, type TaskSuperOptionsProps, type TaskSuperProps, type TaskSuperWrapperProps };
