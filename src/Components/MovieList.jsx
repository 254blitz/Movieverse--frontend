import React from 'react';

function MovieList({ movies, onMovieSelect }) {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID} onClick={() => onMovieSelect(movie.imdbID)}>
              <img src={movie.Poster} alt={`${movie.Title} Poster`} width="50" />
              <span>{movie.Title} ({movie.Year})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies match your search. Try "Avengers" or "Lion King".</p>
      )}
    </div>
  );
}

export default MovieList;