const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all students
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
});

// Add student
router.post('/', auth, async (req, res) => {
  try {
    const { name, class: className, rollNumber } = req.body;

    if (!name || !className || !rollNumber) {
      return res.status(400).json({ message: 'Name, class, and roll number are required' });
    }

    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this roll number already exists' });
    }

    const student = new Student({ name, class: className, rollNumber });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ message: 'Error adding student', error: err.message });
  }
});

// Update student
router.put('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ message: 'Error updating student', error: err.message });
  }
});

// Delete student
router.delete('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
});

module.exports = router;