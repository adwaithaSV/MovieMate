import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import MovieList from './MovieList';
import { getMovies, deleteMovie } from '../services/api';
import '../styles/MovieDashboard.css';

function MovieDashboard({ username, onLogout }) {
  const [movies, setMovies] = useState([]);
  const [modalMessage, setModalMessage] = useState(null); 
  const navigate = useNavigate();

  const handleShowModal = (msg) => {
    setModalMessage(msg);
  };

  const handleCloseModal = () => {
    setModalMessage(null);
  };

  const fetchMovies = useCallback(async () => {
    try {
      const data = await getMovies();
      if (Array.isArray(data)) {
        setMovies(data);
      } else {
        console.error("Expected an array of movies, but got:", data);
        setMovies([]);
        handleShowModal('Failed to load movies. Please try again.'); 
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      handleShowModal('An error occurred while fetching movies. Please try again.');
    }
  }, [getMovies, setMovies, handleShowModal]); // Added handleShowModal to dependencies

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleDelete = async (movieId) => {
    try {
      const response = await deleteMovie(movieId);
      if (response.message === 'Movie deleted successfully!') {
        handleShowModal(response.message); 
        fetchMovies(); 
      } else {
        handleShowModal(response.message || 'Failed to delete movie.');
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      handleShowModal('An error occurred while deleting the movie. Please try again.'); 
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

      {/* Custom Modal */}
      {modalMessage && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal-content">
            <p className="dashboard-modal-message">{modalMessage}</p>
            <button className="dashboard-modal-close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDashboard;
