const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

let DUMMY_TODOS = [
    {
        id: '1',
        title: 'Hello World',
        detail: "Don't do that",
        isDone: false
    }
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/', (req, res) => {
    res.render('index', {
        todos: DUMMY_TODOS
    });
});

app.post('/todos/:todoId/done', (req, res) => {
    const { todoId } = req.params;
    const copiedTodo = { ...DUMMY_TODOS.find(todo => todo.id === todoId) };
    const todoIndex = DUMMY_TODOS.findIndex(todo => todo.id === todoId);
    copiedTodo.isDone = true;
    DUMMY_TODOS[todoIndex] = copiedTodo;
    res.redirect('/');
});

app.post('/todos/:todoId/doing', (req, res) => {
    const { todoId } = req.params;
    const copiedTodo = { ...DUMMY_TODOS.find(todo => todo.id === todoId) };
    const todoIndex = DUMMY_TODOS.findIndex(todo => todo.id === todoId);
    copiedTodo.isDone = false;
    DUMMY_TODOS[todoIndex] = copiedTodo;
    res.redirect('/');
});

app.post('/todos/:todoId/delete', (req, res) => {
    const { todoId } = req.params;
    DUMMY_TODOS = DUMMY_TODOS.filter(todo => todo.id !== todoId);
    res.redirect('/');
});

app.post('/todos', (req, res) => {
    const { title, detail } = req.body;
    // ADD validation
    const newTodo = {
        id: Date.now().toString(),
        title,
        detail,
        isDone: false
    }
    DUMMY_TODOS.push(newTodo);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${3000}`);
});
