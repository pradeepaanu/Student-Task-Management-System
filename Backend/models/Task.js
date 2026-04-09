const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  taskType: { 
    type: String, 
    enum: ['Essay', 'MCQ', 'Puzzle', 'Picture Selection', 'Short Answer'],
    default: 'Essay',
    required: true 
  },
  options: {
    type: mongoose.Schema.Types.Mixed,
    default: null
    // For MCQ: { choices: ['Option 1', 'Option 2', 'Option 3'], correctAnswer: 0 }
    // For Puzzle: { puzzleDescription: 'Solve this...', hint: 'Hint...', correctAnswer: 'answer' }
    // For Picture Selection: { imageUrls: ['url1', 'url2'], correctIndex: 0 }
    // For Short Answer: { keywords: ['keyword1', 'keyword2'] }
  },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  completed: { type: Boolean, default: false },
  studentAnswer: { type: String, default: null },
  score: { type: Number, default: null },
  assignedDate: { type: Date, default: Date.now },
  dueDate: { type: Date, default: null }
});

module.exports = mongoose.model('Task', taskSchema);