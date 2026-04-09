import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome, FaUsers, FaTasks, FaSignOutAlt, FaChartBar, FaSchool } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StudentList from './StudentList';
import TaskList from './TaskList';

const Dashboard = ({ setAuth }) => {
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchTasks();
  }, []);

  useEffect(() => {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    setStats({ total: tasks.length, completed, pending });
  }, [tasks]);

  const fetchStudents = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  const getChartData = () => {
    return [
      { name: 'Total Students', value: students.length, fill: '#667eea' },
      { name: 'Total Tasks', value: tasks.length, fill: '#11998e' },
      { name: 'Completed', value: stats.completed, fill: '#38ef7d' },
      { name: 'Pending', value: stats.pending, fill: '#f5576c' }
    ];
  };

  const getTaskStatusData = () => {
    return [
      { name: 'Completed', value: stats.completed, fill: '#38ef7d' },
      { name: 'Pending', value: stats.pending, fill: '#f5576c' }
    ];
  };

  const COLORS = ['#667eea', '#11998e', '#38ef7d', '#f5576c'];

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-header">
          <FaSchool /> SMS
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'active' : ''}
            >
              <FaHome /> Dashboard
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => setActiveTab('students')}
              className={activeTab === 'students' ? 'active' : ''}
            >
              <FaUsers /> Students
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => setActiveTab('tasks')}
              className={activeTab === 'tasks' ? 'active' : ''}
            >
              <FaTasks /> Tasks
            </button>
          </li>
          <li className="sidebar-item logout-btn">
            <button onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-header">
              <h1>📊 Dashboard</h1>
              <p>Welcome back! Here's an overview of your school management system.</p>
            </div>

            {/* STATS CARDS */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-card-title">Total Students</div>
                  <div className="stat-card-icon blue">👨‍🎓</div>
                </div>
                <div className="stat-card-value">{students.length}</div>
                <div className="stat-card-subtitle">Active students in system</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-card-title">Total Tasks</div>
                  <div className="stat-card-icon green">📝</div>
                </div>
                <div className="stat-card-value">{stats.total}</div>
                <div className="stat-card-subtitle">Assigned tasks</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-card-title">Completed</div>
                  <div className="stat-card-icon orange">✅</div>
                </div>
                <div className="stat-card-value">{stats.completed}</div>
                <div className="stat-card-subtitle">Tasks completed</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-card-title">Pending</div>
                  <div className="stat-card-icon purple">⏳</div>
                </div>
                <div className="stat-card-value">{stats.pending}</div>
                <div className="stat-card-subtitle">Tasks pending</div>
              </div>
            </div>

            {/* CHARTS */}
            <div className="content-section">
              <div className="section-title">Performance Overview</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
                <div>
                  <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 Statistics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#667eea" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 style={{ marginBottom: '20px', color: '#333' }}>📈 Task Status</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getTaskStatusData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getTaskStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITIES */}
            <div className="content-section">
              <div className="section-title">Recent Tasks</div>
              <div className="list-container">
                {tasks.slice(0, 5).map(task => (
                  <div key={task._id} className="list-item">
                    <div className="list-item-content">
                      <h4>{task.title}</h4>
                      <p>Assigned to: {task.student?.name} | Status: <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>{task.completed ? 'Completed' : 'Pending'}</span></p>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && <p style={{ color: '#999', textAlign: 'center' }}>No tasks created yet.</p>}
              </div>
            </div>
          </>
        )}

        {activeTab === 'students' && (
          <StudentList students={students} fetchStudents={fetchStudents} />
        )}

        {activeTab === 'tasks' && (
          <TaskList tasks={tasks} students={students} fetchTasks={fetchTasks} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;