export default function MovieDetails({ movie, onAddFavorite, onBack }) {
  return (
    <div className="movie-details">
      <button onClick={onBack}>← Back to results</button>
      <h2>{movie.Title}</h2>
      {movie.Poster !== 'N/A' && (
        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      )}
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rated:</strong> {movie.Rated}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
      {onAddFavorite && <button onClick={onAddFavorite}>Add to Favorites</button>}
    </div>
  );
}