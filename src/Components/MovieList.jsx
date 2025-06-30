export default function MovieList({ movies, onMovieSelect }) {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID} onClick={() => onMovieSelect(movie.imdbID)}>
              {movie.Poster !== 'N/A' && (
                <img src={movie.Poster} alt={`${movie.Title} Poster`} width="50" />
              )}
              <span>{movie.Title} ({movie.Year})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}