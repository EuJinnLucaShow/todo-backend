const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Підключення до бази даних MongoDB
mongoose.connect('mongodb+srv://Eujinn:QZqQtLkTaKRcG9Uf@cluster0.v4ll3w5.mongodb.net/db-todo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Схема та модель для Todo
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(express.json());

// Роути

// Отримати список всіх todo
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Створити новий todo
app.post('/api/todos', async (req, res) => {
    const { title, description, completed } = req.body;
    const todo = new Todo({
        title,
        description,
        completed,
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});
