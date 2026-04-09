const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate('student');
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});

// Add task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, student } = req.body;

    if (!title || !student) {
      return res.status(400).json({ message: 'Title and student are required' });
    }

    const task = new Task({ title, description: description || '', student });
    await task.save();
    await task.populate('student');
    res.status(201).json(task);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ message: 'Error adding task', error: err.message });
  }
});

// Update task (mark as completed)
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('student');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
});

module.exports = router;