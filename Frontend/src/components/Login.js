import React, { useState } from 'react';
import axios from 'axios';
import { FaLock, FaUser, FaSchool } from 'react-icons/fa';

const Login = ({ setAuth }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await axios.post('http://localhost:5000/api/auth/register', { username, password });
        setError('');
        setUsername('');
        setPassword('');
        setIsRegister(false);
        alert('✓ Registration successful! Please login.');
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        localStorage.setItem('token', res.data.token);
        setAuth(true);
      }
    } catch (err) {
      setError(isRegister ? 'Registration failed. Username may already exist.' : 'Invalid credentials. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div style={{ textAlign: 'center', marginBottom: '30px', fontSize: '3em' }}>
          <FaSchool style={{ color: '#667eea' }} />
        </div>
        <h2>{isRegister ? 'Create Account' : 'Admin Login'}</h2>
        <p className="subtitle">School Management System</p>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '0.9em'
          }}>
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <FaUser /> Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>

        <div className="toggle-auth">
          {isRegister ? (
            <>
              Already have an account?
              <button onClick={() => { setIsRegister(false); setError(''); }} disabled={loading}>
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?
              <button onClick={() => { setIsRegister(true); setError(''); }} disabled={loading}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;