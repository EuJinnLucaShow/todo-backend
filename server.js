// import express, { json } from 'express';
// import { connect, Schema, model } from 'mongoose';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Підключення до бази даних MongoDB
// connect('mongodb+srv://Eujinn:QZqQtLkTaKRcG9Uf@cluster0.v4ll3w5.mongodb.net/db-todo?retryWrites=true&w=majority', {
  
// });

// // Схема та модель для Todo
// const todoSchema = new Schema({
//     title: String,
//     description: String,
//     completed: Boolean,
// });

// const Todo = model('Todo', todoSchema);

// app.use(json());

// // Роути

// // Отримати список всіх todo
// app.get('/api/todos', async (req, res) => {
//     try {
//         const todos = await Todo.find();
//         res.json(todos);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Створити новий todo
// app.post('/api/todos', async (req, res) => {
//     const { title, description, completed } = req.body;
//     const todo = new Todo({
//         title,
//         description,
//         completed,
//     });

//     try {
//         const newTodo = await todo.save();
//         res.status(201).json(newTodo);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Запуск сервера
// app.listen(PORT, () => {
//     console.log(`Сервер запущено на порті ${PORT}`);
// });

import express from "express";
import cors from 'cors'
import { Schema, model, mongoose } from 'mongoose';

const app = express();
const PORT = 3000;


// Схема та модель для Todo
const todoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const Todo = model('Todo', todoSchema);

//middleware
app.use(cors()); //для того щоб можно було відправляти з різних ip, запроси до нашого серверу
app.use(express.json()); //для  того щоб express розумів що дані з фронту будуть приходити у форматі json

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

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://Eujinn:QZqQtLkTaKRcG9Uf@cluster0.v4ll3w5.mongodb.net/db-todo?retryWrites=true&w=majority'
        );
 
       app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
    } catch(error) {
       console.log(error);
    }
}
start();