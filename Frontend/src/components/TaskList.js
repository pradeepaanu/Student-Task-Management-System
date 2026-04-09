import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus, FaCheck, FaTimes, FaFilter, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, students, fetchTasks }) => {
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    student: '',
    taskType: 'Essay',
    options: null
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const taskTypes = ['Essay', 'MCQ', 'Puzzle', 'Picture Selection', 'Short Answer'];
  const token = localStorage.getItem('token');

  const filteredTasks = tasks.filter(task => {
    if (statusFilter === 'completed') return task.completed;
    if (statusFilter === 'pending') return !task.completed;
    return true;
  });

  // Render dynamic options input based on task type
  const renderOptionsInput = () => {
    switch (newTask.taskType) {
      case 'MCQ':
        return (
          <div style={{ gridColumn: '1 / -1', border: '2px dashed #667eea', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ color: '#333', marginBottom: '10px' }}>📋 Multiple Choice Options</h4>
            <input
              placeholder="Choice 1"
              value={newTask.options?.choices?.[0] || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: {
                  ...newTask.options,
                  choices: [e.target.value, newTask.options?.choices?.[1] || '', newTask.options?.choices?.[2] || '']
                }
              })}
              style={{ marginBottom: '10px' }}
            />
            <input
              placeholder="Choice 2"
              value={newTask.options?.choices?.[1] || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: {
                  ...newTask.options,
                  choices: [newTask.options?.choices?.[0] || '', e.target.value, newTask.options?.choices?.[2] || '']
                }
              })}
              style={{ marginBottom: '10px' }}
            />
            <input
              placeholder="Choice 3"
              value={newTask.options?.choices?.[2] || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: {
                  ...newTask.options,
                  choices: [newTask.options?.choices?.[0] || '', newTask.options?.choices?.[1] || '', e.target.value]
                }
              })}
              style={{ marginBottom: '10px' }}
            />
            <label style={{ display: 'block', marginTop: '10px', color: '#333', fontWeight: '600' }}>
              Correct Answer (1-3):
              <select
                value={newTask.options?.correctAnswer || 0}
                onChange={(e) => setNewTask({
                  ...newTask,
                  options: {
                    ...newTask.options,
                    correctAnswer: parseInt(e.target.value)
                  }
                })}
                style={{ marginLeft: '10px', padding: '6px', borderRadius: '4px' }}
              >
                <option value="0">Choice 1</option>
                <option value="1">Choice 2</option>
                <option value="2">Choice 3</option>
              </select>
            </label>
          </div>
        );

      case 'Puzzle':
        return (
          <div style={{ gridColumn: '1 / -1', border: '2px dashed #667eea', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ color: '#333', marginBottom: '10px' }}>🧩 Puzzle Details</h4>
            <textarea
              placeholder="Puzzle description/clues"
              value={newTask.options?.puzzleDescription || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: { ...newTask.options, puzzleDescription: e.target.value }
              })}
              style={{ gridColumn: '1 / -1', marginBottom: '10px' }}
            />
            <input
              placeholder="Hint for puzzle"
              value={newTask.options?.hint || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: { ...newTask.options, hint: e.target.value }
              })}
              style={{ marginBottom: '10px' }}
            />
            <input
              placeholder="Correct answer"
              value={newTask.options?.correctAnswer || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: { ...newTask.options, correctAnswer: e.target.value }
              })}
            />
          </div>
        );

      case 'Picture Selection':
        return (
          <div style={{ gridColumn: '1 / -1', border: '2px dashed #667eea', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ color: '#333', marginBottom: '10px' }}>🖼️ Picture URLs</h4>
            <input
              placeholder="Image URL 1"
              value={newTask.options?.imageUrls?.[0] || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: {
                  ...newTask.options,
                  imageUrls: [e.target.value, newTask.options?.imageUrls?.[1] || '', newTask.options?.imageUrls?.[2] || '']
                }
              })}
              style={{ marginBottom: '10px' }}
            />
            <input
              placeholder="Image URL 2"
              value={newTask.options?.imageUrls?.[1] || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: {
                  ...newTask.options,
                  imageUrls: [newTask.options?.imageUrls?.[0] || '', e.target.value, newTask.options?.imageUrls?.[2] || '']
                }
              })}
              style={{ marginBottom: '10px' }}
            />
            <input
              placeholder="Image URL 3"
              value={newTask.options?.imageUrls?.[2] || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: {
                  ...newTask.options,
                  imageUrls: [newTask.options?.imageUrls?.[0] || '', newTask.options?.imageUrls?.[1] || '', e.target.value]
                }
              })}
              style={{ marginBottom: '10px' }}
            />
            <label style={{ display: 'block', marginTop: '10px', color: '#333', fontWeight: '600' }}>
              Correct Image (1-3):
              <select
                value={newTask.options?.correctIndex || 0}
                onChange={(e) => setNewTask({
                  ...newTask,
                  options: {
                    ...newTask.options,
                    correctIndex: parseInt(e.target.value)
                  }
                })}
                style={{ marginLeft: '10px', padding: '6px', borderRadius: '4px' }}
              >
                <option value="0">Image 1</option>
                <option value="1">Image 2</option>
                <option value="2">Image 3</option>
              </select>
            </label>
          </div>
        );

      case 'Short Answer':
        return (
          <div style={{ gridColumn: '1 / -1', border: '2px dashed #667eea', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ color: '#333', marginBottom: '10px' }}>📝 Acceptable Keywords</h4>
            <input
              placeholder="Keyword 1 (comma-separated)"
              value={newTask.options?.keywords?.join(', ') || ''}
              onChange={(e) => setNewTask({
                ...newTask,
                options: { ...newTask.options, keywords: e.target.value.split(',').map(k => k.trim()) }
              })}
              style={{ gridColumn: '1 / -1' }}
            />
            <small style={{ color: '#999', marginTop: '5px', display: 'block' }}>
              Enter keywords to mark the answer as correct
            </small>
          </div>
        );

      default:
        return null;
    }
  };

  const handleAdd = async () => {
    if (!newTask.title || !newTask.student) {
      alert('Please enter title and select a student');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewTask({ title: '', description: '', student: '', taskType: 'Essay', options: null });
      fetchTasks();
      alert('✓ Task assigned successfully!');
    } catch (err) {
      alert('Error assigning task: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id, completed) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
      alert('✓ Task status updated!');
    } catch (err) {
      alert('Error updating task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTasks();
        alert('✓ Task deleted successfully!');
      } catch (err) {
        alert('Error deleting task');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="content-section">
      <div className="section-title">📚 Task Management</div>

      {/* ADD TASK FORM */}
      <div className="form-container">
        <h3 style={{ marginBottom: '15px', color: '#333' }}>➕ Assign New Task</h3>
        <div className="form-row">
          <input
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <select
            value={newTask.taskType}
            onChange={(e) => setNewTask({ ...newTask, taskType: e.target.value, options: null })}
            style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '1em' }}
          >
            {taskTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={newTask.student}
            onChange={(e) => setNewTask({ ...newTask, student: e.target.value })}
          >
            <option value="">Select a Student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.class})
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            style={{ gridColumn: '1 / -1' }}
          />
        </div>

        {/* DYNAMIC OPTIONS INPUT */}
        {renderOptionsInput()}

        <button className="btn-add" onClick={handleAdd} disabled={loading} style={{ marginTop: '15px' }}>
          <FaPlus /> Assign Task
        </button>
      </div>

      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            background: statusFilter === 'all' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e0e0e0',
            color: statusFilter === 'all' ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: 600
          }}
          onClick={() => setStatusFilter('all')}
        >
          <FaFilter /> All ({tasks.length})
        </button>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            background: statusFilter === 'pending' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : '#e0e0e0',
            color: statusFilter === 'pending' ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: 600
          }}
          onClick={() => setStatusFilter('pending')}
        >
          <FaTimes /> Pending ({tasks.filter(t => !t.completed).length})
        </button>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            background: statusFilter === 'completed' ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' : '#e0e0e0',
            color: statusFilter === 'completed' ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: 600
          }}
          onClick={() => setStatusFilter('completed')}
        >
          <FaCheck /> Completed ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      {/* TASKS LIST */}
      <div className="list-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task._id} className="list-item">
              <div className="list-item-content">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>
                  📋 <strong>Type:</strong> {task.taskType} | 
                  👤 <strong>{task.student?.name}</strong> ({task.student?.class}) | 
                  <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`} style={{ marginLeft: '10px' }}>
                    {task.completed ? '✓ Completed' : '⏳ Pending'}
                  </span>
                </p>
                {task.options && (
                  <div style={{ marginTop: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '6px', fontSize: '0.9em', color: '#666' }}>
                    <strong>Task Details:</strong>
                    {task.taskType === 'MCQ' && (
                      <div>
                        Options: {task.options.choices?.join(' | ')}
                        <br />
                        Correct: Option {(task.options.correctAnswer || 0) + 1}
                      </div>
                    )}
                    {task.taskType === 'Puzzle' && (
                      <div>
                        Puzzle: {task.options.puzzleDescription}
                        <br />
                        Hint: {task.options.hint}
                      </div>
                    )}
                    {task.taskType === 'Short Answer' && (
                      <div>
                        Keywords: {task.options.keywords?.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="action-buttons">
                <button
                  className={task.completed ? 'btn-delete' : 'btn-edit'}
                  onClick={() => handleComplete(task._id, task.completed)}
                  disabled={loading}
                  title={task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                >
                  {task.completed ? <FaTimes /> : <FaCheck />}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(task._id)}
                  disabled={loading}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
            <p>No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;