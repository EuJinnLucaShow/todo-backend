import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
require('dotenv').config(); 
const DB_HOST = process.env.DB_HOST

const app = express();
const PORT = process.env.PORT || 3000;

// Підключення до бази даних MongoDB
connect(`${DB_HOST}`, {
  
});

// Схема та модель для Todo
const todoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const Todo = model('Todo', todoSchema);

app.use(json());

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