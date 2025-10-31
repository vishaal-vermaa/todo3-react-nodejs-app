// controllers/todoController.js
import { Todo } from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTodo = async (req, res) => {
  try {
    console.log(req.body);
    const todo = await Todo.create(
      {
         text: req.body.text
         
      });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Not found" });

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
