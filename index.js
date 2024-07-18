const express = require('express');
const server = express();
const PORT = 3000;

server.use(express.json());

let todos = [];

server.get('/todos', (req, res) => {
    res.json(todos);
});

server.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

server.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, description, completed } = req.body;

    let todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ message: 'To-do item not found' });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});


server.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
