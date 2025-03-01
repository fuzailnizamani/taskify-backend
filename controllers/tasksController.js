const Task = require('../models/Task');

// Get all Tasks (Only If Owned by User)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ err: 'Failed to get all Tasks ' });
  }
};

// Create a Task 
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!req.user.id) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const task = new Task({ title, description, userId: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ err: 'Failed to create task' });
  }
};

// Update a task (Only If Owned by User)
const updatedTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task (Only If Owned by User)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Get a single Task (Only If Owned by User)
const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while retrieving the task' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updatedTask,
  deleteTask,
  getSingleTask
};