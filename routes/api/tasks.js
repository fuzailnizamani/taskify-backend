const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, updatedTask, deleteTask, getSingleTask } = require('../../controllers/tasksController');
const verifyuser = require('../../middleware/verifyJWT');
// Create a Task 
router.post('/', verifyuser, createTask);

// Get all Tasks
router.get('/', verifyuser, getAllTasks);

// Get a single Task 
router.get('/:id', verifyuser, getSingleTask);

// Update a task
router.put('/:id', verifyuser, updatedTask);

// Delete a task
router.delete('/:id', verifyuser, deleteTask);

module.exports = router;