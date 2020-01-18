const fs = require('fs');

const chalk = require('chalk');

const addNewTodo = (title, body) => {
    const todos = getAllTodos();
    const newTodo = {
        id: Date.now().toString(),
        title,
        body,
        isDone: false
    };
    todos.push(newTodo);
    updateAllTodos(todos);
    console.log(`${chalk.inverse.green('Added')} todo with id: ${newTodo.id}`);
};

const listAllTodos = () => {
    const todos = getAllTodos();
    if (todos.length === 0)
        return console.log('No todos, try to add a new one.');

    todos.forEach((todo, index) =>
        console.log(
            `${index + 1}. ${chalk.bold(todo.title)} [${
                todo.isDone ? '/' : 'X'
            }]\nDescription: ${todo.body}\n===`
        )
    );
};

const readTodo = todoId => {
    const todos = getAllTodos();
    const todo = todos.find(todo => todo.id === todoId);
    console.log(
        `${chalk.bold(todo.title)} [${todo.isDone ? '/' : 'X'}]\nDescription: ${
            todo.body
        }\n===`
    );
};

const deleteTodo = todoId => {
    const todos = getAllTodos();
    const newTodos = todos.filter(todo => todo.id !== todoId);
    updateAllTodos(newTodos);
    console.log(`${chalk.inverse.red('Deleted')} todo with id: ${todoId}`);
};

const getAllTodos = () => JSON.parse(fs.readFileSync('todo.json'));

const updateAllTodos = todos =>
    fs.writeFileSync('todo.json', JSON.stringify(todos));
module.exports = {
    addNewTodo,
    listAllTodos,
    deleteTodo,
    readTodo
};
