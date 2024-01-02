import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database
connect(DB_HOST)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Schema and model for Todo
const todoSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = model('Todo', todoSchema);

app.use(json());

// Routes...
// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new todo
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
