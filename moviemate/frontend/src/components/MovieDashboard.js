import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import MovieList from './MovieList';
import { getMovies, deleteMovie } from '../services/api';
import '../styles/MovieDashboard.css';

function MovieDashboard({ username, onLogout }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const data = await getMovies();
    if (Array.isArray(data)) { // Ensure data is an array
      setMovies(data);
    } else {
      console.error("Expected an array of movies, but got:", data);
      setMovies([]); // Set to empty array to prevent errors
    }
  };

  const handleDelete = async (movieId) => {
    const response = await deleteMovie(movieId);
    if (response.message === 'Movie deleted successfully!') {
      fetchMovies(); // Refresh list
    } else {
      alert('Failed to delete movie');
    }
  };

  const handleEdit = (movieId) => {
    navigate(`/edit-movie/${movieId}`);
  };

  return (
    <div className="movie-dashboard">
      <h1 className="dashboard-heading">MovieMate</h1>
      <p className="welcome-message">Welcome, {username}!</p>
      <NavBar onLogout={onLogout} />
      <div className="main-content">
        <MovieList movies={movies} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default MovieDashboard;