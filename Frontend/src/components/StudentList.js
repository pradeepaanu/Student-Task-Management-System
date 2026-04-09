import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const StudentList = ({ students, fetchStudents }) => {
  const [newStudent, setNewStudent] = useState({ name: '', class: '', rollNumber: '' });
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = async () => {
    if (!newStudent.name || !newStudent.class || !newStudent.rollNumber) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/students', newStudent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewStudent({ name: '', class: '', rollNumber: '' });
      fetchStudents();
      alert('✓ Student added successfully!');
    } catch (err) {
      alert('Error adding student: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, editing, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditing(null);
      fetchStudents();
      alert('✓ Student updated successfully!');
    } catch (err) {
      alert('Error updating student');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchStudents();
        alert('✓ Student deleted successfully!');
      } catch (err) {
        alert('Error deleting student');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="content-section">
      <div className="section-title">👨‍🎓 Student Management</div>

      <div className="form-container">
        <h3 style={{ marginBottom: '15px', color: '#333' }}>
          {editing ? '✏️ Edit Student' : '➕ Add New Student'}
        </h3>
        {!editing ? (
          <div className="form-row">
            <input
              placeholder="Student Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              placeholder="Class (e.g., 10-A)"
              value={newStudent.class}
              onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
            />
            <input
              placeholder="Roll Number"
              value={newStudent.rollNumber}
              onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
            />
            <button className="btn-add" onClick={handleAdd} disabled={loading}>
              <FaPlus /> Add Student
            </button>
          </div>
        ) : (
          <div className="form-row">
            <input
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />
            <input
              value={editing.class}
              onChange={(e) => setEditing({ ...editing, class: e.target.value })}
            />
            <input
              value={editing.rollNumber}
              onChange={(e) => setEditing({ ...editing, rollNumber: e.target.value })}
            />
            <div>
              <button className="btn-save" onClick={() => handleEdit(editing._id)} disabled={loading}>
                Save
              </button>
              <button className="btn-cancel" onClick={() => setEditing(null)} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEARCH BAR */}
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <FaSearch style={{ position: 'absolute', left: '15px', top: '12px', color: '#999' }} />
        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '40px', width: '100%' }}
        />
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Roll Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <tr key={student._id}>
                  <td><strong>{student.name}</strong></td>
                  <td>{student.class}</td>
                  <td>{student.rollNumber}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit" onClick={() => setEditing(student)} disabled={loading}>
                        <FaEdit /> Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(student._id)} disabled={loading}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#999' }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredStudents.length > 0 && (
        <div style={{ marginTop: '15px', color: '#999', fontSize: '0.9em' }}>
          Total: {filteredStudents.length} student(s)
        </div>
      )}
    </div>
  );
};

export default StudentList;