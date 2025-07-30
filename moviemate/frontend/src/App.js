import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Auth from './components/Auth';
import MovieDashboard from './components/MovieDashboard';
import MovieForm from './components/MovieForm';
import { getToken, removeToken, getUsername } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      setUsername(getUsername());
    }
  }, []);

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', user);
    setIsAuthenticated(true);
    setUsername(user);
    // history.push('/dashboard'); // Use useNavigate for navigation
  };

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUsername('');
    // history.push('/login'); // Use useNavigate for navigation
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Auth type="signup" />} />
          <Route path="/login" element={<Auth type="login" onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <MovieDashboard username={username} onLogout={handleLogout} /> : <Auth type="login" onLogin={handleLogin} />}
          />
          <Route
            path="/add-movie"
            element={isAuthenticated ? <MovieForm onMovieSubmit={() => { /* Handle redirect */ }} /> : <Auth type="login" onLogin={handleLogin} />}
          />
          <Route
            path="/edit-movie/:id"
            element={isAuthenticated ? <MovieForm onMovieSubmit={() => { /* Handle redirect */ }} /> : <Auth type="login" onLogin={handleLogin} />}
          />
          <Route path="/" element={<Auth type="login" onLogin={handleLogin} />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;