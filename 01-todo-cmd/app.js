const yargs = require('yargs');

const todoUtils = require('./utils');

yargs.version('1.0.0');

yargs.command({
    command: 'add',
    describe: 'Add new todo',
    builder: {
        title: {
            describe: 'Title of todo',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of todo',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        todoUtils.addNewTodo(argv.title, argv.body);
    }
});

yargs.command({
    command: 'list',
    describe: 'List all todo',
    handler: todoUtils.listAllTodos
});

yargs.command({
    command: 'delete',
    describe: 'Delete todo',
    builder: {
        todoId: {
            describe: 'ID of todo',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        todoUtils.deleteTodo(argv.todoId);
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a todo',
    builder: {
        todoId: {
            describe: 'ID of todo',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        todoUtils.readTodo(argv.todoId);
    }
});

const argv = yargs.argv;
