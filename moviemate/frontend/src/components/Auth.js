import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '../services/api';
import '../styles/Auth.css'; // Add Auth-specific styles

function Auth({ type, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (type === 'signup') {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
      const response = await signup({ name, email, password });
      if (response.message === 'User created successfully!') {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(response.message || 'Signup failed');
      }
    } else { // type === 'login'
      const response = await login({ email, password });
      if (response.token) {
        onLogin(response.token, response.username);
        navigate('/dashboard');
      } else {
        setMessage(response.message || 'Login failed');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">MovieMate</h2>
      <h3 className="auth-subheading">{type === 'signup' ? 'Sign Up' : 'Login'}</h3>
      <form onSubmit={handleSubmit} className="auth-form">
        {type === 'signup' && (
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {type === 'signup' && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="auth-button">
          {type === 'signup' ? 'Sign Up' : 'Login'}
        </button>
        {message && <p className="auth-message">{message}</p>}
        {type === 'signup' ? (
          <p className="auth-link">
            Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
          </p>
        ) : (
          <p className="auth-link">
            Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Auth;