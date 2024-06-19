# Task

`@panda/task` is a library to help perform specific tasks.

Visit the `panda` [documentation website](https://adampuzio.github.io/panda-docs/) to find out more.

* dryRun()


Tasks
* group
  * none
  * all
  * any
* file
  * copy
  * create
  * delete
  * modify
* json
  * create
  * update
* npm
  * init
  * install
* package
  * create
* path
  * ensure
  * exists

Composite Tasks
* eslint
  * install
* tsup
  * install
* vitest
  * install


There are 3 ways to create a task:

1. Class Instance
2. Reference Task Type
3. Config

Types of Tasks
* Base Tasks (`run()`)
* Composite Tasks (`tasks: []`)

Task Phases:
* Configure
* Run

Context

$cwd
$ctx
$local


