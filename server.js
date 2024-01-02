import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;

// Enable CORS for all routes
app.use(cors());

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
  completed: Boolean,
});

const Todo = model('Todo', todoSchema);

app.use(json());

// Routes...
// Route to fetch all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find(); // Retrieve all todos from the database
        res.json(todos); // Respond with the fetched todos
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add a new todo
app.post('/todos', async (req, res) => {
    const { title, completed } = req.body;

    try {
        const newTodo = new Todo({ title, completed });
        const savedTodo = await newTodo.save(); // Save the new todo to the database
        res.status(201).json(savedTodo); // Respond with the created todo
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id); // Find and delete the todo by ID
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(deletedTodo); // Respond with the deleted todo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to edit a todo by ID
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true } // Get the updated todo after the update
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo); // Respond with the updated todo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/save-todos', async (req, res) => {
    const todosArray = req.body; // Отримання масиву об'єктів з запиту

    try {
        // Очищення попередніх даних про todo у базі даних (опціонально)
        await Todo.deleteMany({});

        // Зберігання нового масиву об'єктів в базі даних
        const savedTodos = await Todo.insertMany(todosArray);

        res.status(201).json(savedTodos); // Відповідь збереженим масивом об'єктів
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
