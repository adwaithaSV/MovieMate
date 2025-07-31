import React from 'react';
import '../styles/MovieList.css';

function MovieList({ movies, onDelete, onEdit }) {
  return (
    <div className="movie-list-container">
      <h2 className="list-heading">Your Movie Collection</h2>
      {movies.length === 0 ? (
        <p className="no-movies-message">No movies or TV shows added yet. Start by adding one!</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <div className="movie-details">
                <h3>{movie.title} ({movie.content_type === 'movie' ? 'Movie' : 'TV Show'})</h3>
                <p><strong>Director:</strong> {movie.director || ' '}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Platform:</strong> {movie.platform}</p>
                <p><strong>Status:</strong> {movie.status}</p>
                {movie.content_type === 'tv_show' && movie.status !== 'completed' && (
                  <p><strong>Episodes Watched:</strong> {movie.episodes_watched}</p>
                )}
                {movie.status === 'completed' && (
                  <>
                    <p><strong>Rating:</strong> {movie.rating}/10</p>
                    <p><strong>Comments:</strong> {movie.comments}</p>
                  </>
                )}
              </div>
              <div className="movie-actions">
                <button onClick={() => onEdit(movie.id)} className="edit-button">Edit</button>
                <button onClick={() => onDelete(movie.id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
