import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addMovie, updateMovie, getMovies } from '../services/api';
import '../styles/MovieForm.css';

function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    genre: '',
    platform: 'Netflix',
    content_type: 'movie',
    episodes_watched: 0,
    status: 'wishlist',
    rating: '',
    comments: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  const handleShowModal = (msg) => {
    setModalMessage(msg);
  };

  const handleCloseModal = () => {
    setModalMessage(null);
    if (modalMessage && (modalMessage.includes('successfully') || modalMessage.includes('Movie not found') || modalMessage.includes('Failed to load movie'))) {
      navigate('/dashboard');
    }
  };

  const fetchMovieToEdit = useCallback(async (movieId) => {
    try {
      const movies = await getMovies();
      const movieToEdit = movies.find(m => m.id === parseInt(movieId));
      if (movieToEdit) {
        setMovieData({
          title: movieToEdit.title || '',
          director: movieToEdit.director || '',
          genre: movieToEdit.genre || '',
          platform: movieToEdit.platform || 'Netflix',
          content_type: movieToEdit.content_type || 'movie',
          episodes_watched: movieToEdit.episodes_watched || 0,
          status: movieToEdit.status || 'wishlist',
          rating: movieToEdit.rating || '',
          comments: movieToEdit.comments || '',
        });
      } else {
        handleShowModal('Movie not found for editing.');
      }
    } catch (error) {
      console.error("Error fetching movie for edit:", error);
      handleShowModal('Failed to load movie for editing. Please try again.'); 
    }
  }, [getMovies, setMovieData, handleShowModal]);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchMovieToEdit(id);
    }
  }, [id, fetchMovieToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: type === 'radio' ? (checked ? value : prevData[name]) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (isEditMode) {
        response = await updateMovie(id, movieData);
      } else {
        response = await addMovie(movieData);
      }

      if (response && response.message) {
        handleShowModal(response.message);
      } else {
        handleShowModal('Operation failed or no message from server.');
      }
    } catch (error) {
      console.error("Error submitting movie form:", error);
      handleShowModal('An error occurred during operation. Please check console for details.'); 
    }
  };

  return (
    <div className="movie-form-container">
      <h2 className="form-heading">{isEditMode ? 'Edit Movie/TV Show' : 'Add New Movie/TV Show'}</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="director">Director:</label>
          <input
            type="text"
            id="director"
            name="director"
            value={movieData.director}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="platform">Platform:</label>
          <select
            id="platform"
            name="platform"
            value={movieData.platform}
            onChange={handleChange}
          >
            <option value="Netflix">Netflix</option>
            <option value="Amazon Prime">Amazon Prime</option>
            <option value="Jio Hotstar">Jio Hotstar</option>
            <option value="Sonyliv">Sonyliv</option>
          </select>
        </div>

        <div className="form-group">
          <label>Content Type:</label>
          <label className="radio-label">
            <input
              type="radio"
              name="content_type"
              value="movie"
              checked={movieData.content_type === 'movie'}
              onChange={handleChange}
            />{' '}
            Movie
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="content_type"
              value="tv_show"
              checked={movieData.content_type === 'tv_show'}
              onChange={handleChange}
            />{' '}
            TV Show
          </label>
        </div>

        {movieData.content_type === 'tv_show' && (
          <div className="form-group">
            <label htmlFor="episodes_watched">Episodes Watched:</label>
            <input
              type="number"
              id="episodes_watched"
              name="episodes_watched"
              value={movieData.episodes_watched}
              onChange={handleChange}
              min="0"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={movieData.status}
            onChange={handleChange}
          >
            <option value="wishlist">Wishlist</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {movieData.status === 'completed' && (
          <>
            <div className="form-group">
              <label htmlFor="rating">Rating (1-10):</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={movieData.rating}
                onChange={handleChange}
                min="1"
                max="10"
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments:</label>
              <textarea
                id="comments"
                name="comments"
                value={movieData.comments}
                onChange={handleChange}
              ></textarea>
            </div>
          </>
        )}

        <button type="submit" className="submit-button">
          {isEditMode ? 'Update Movie' : 'Add Movie'}
        </button>
        <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </form>

      {modalMessage && (
        <div className="movieform-modal-overlay">
          <div className="movieform-modal-content">
            <p className="movieform-modal-message">{modalMessage}</p>
            <button className="movieform-modal-close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieForm;
