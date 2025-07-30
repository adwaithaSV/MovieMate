import React, { useState, useEffect, useCallback } from 'react'; // <--- ADD useCallback here
import { useParams, useNavigate } from 'react-router-dom';
import { addMovie, updateMovie, getMovies } from '../services/api';
import '../styles/MovieForm.css';

function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    title: '',
    director: '', // <--- ADD THIS LINE
    genre: '',
    platform: 'Netflix',
    content_type: 'movie',
    episodes_watched: 0,
    status: 'wishlist',
    rating: '',
    comments: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Wrap fetchMovieToEdit with useCallback
  const fetchMovieToEdit = useCallback(async (movieId) => { // <--- Wrap with useCallback
    try {
      const movies = await getMovies();
      const movieToEdit = movies.find(m => m.id === parseInt(movieId));
      if (movieToEdit) {
        setMovieData({
          title: movieToEdit.title || '',
          director: movieToEdit.director || '', // <--- ADD THIS LINE
          genre: movieToEdit.genre || '',
          platform: movieToEdit.platform || 'Netflix',
          content_type: movieToEdit.content_type || 'movie',
          episodes_watched: movieToEdit.episodes_watched || 0,
          status: movieToEdit.status || 'wishlist',
          rating: movieToEdit.rating || '',
          comments: movieToEdit.comments || '',
        });
      } else {
        alert('Movie not found for editing.');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error fetching movie for edit:", error);
      alert('Failed to load movie for editing. Please try again.');
      navigate('/dashboard'); // Navigate back if there's an error
    }
  }, [getMovies, setMovieData, navigate]); // <--- Add its own dependencies here

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchMovieToEdit(id);
    }
  }, [id, fetchMovieToEdit]); // <--- Add fetchMovieToEdit to useEffect dependencies

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
    try { // <--- Add try-catch for API calls for better error handling
      if (isEditMode) {
        response = await updateMovie(id, movieData);
      } else {
        response = await addMovie(movieData);
      }

      if (response && response.message) { // Check if response exists and has message
        alert(response.message);
        navigate('/dashboard');
      } else {
        alert('Operation failed or no message from server.');
      }
    } catch (error) {
      console.error("Error submitting movie form:", error);
      alert('An error occurred during operation. Please check console for details.');
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
          <label htmlFor="director">Director:</label> {/* <--- ADD THIS ENTIRE DIV */}
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
            {/* Add more platforms if needed */}
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
    </div>
  );
}

export default MovieForm;