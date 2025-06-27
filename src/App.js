import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; 
import './App.css';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';

function App() {
  const { user, logout, token } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const fetchMovies = async (query) => {
    if (!query.trim()) {
      setError('Please enter a valid search term.');
      return;
    }

    setLoading(true);
    setError('');
    setSelectedMovie(null);

    try {
      const response = await fetch(`https://movieverse-backend.onrender.com/api/movies?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!data.error) {
        setMovies(data.results || data); 
      } else {
        setMovies([]);
        setError(data.error || 'No results found.');
      }
    } catch (err) {
      setError('Error fetching data: ' + err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (imdbId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://movieverse-backend.onrender.com/api/movies/${imdbId}`);
      const data = await response.json();

      if (!data.error) {
        setSelectedMovie(data);
      } else {
        setError(data.error || 'Could not load movie details.');
      }
    } catch (err) {
      setError('Error fetching movie details: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async () => {
    if (!selectedMovie) return;

    const response = await fetch('https://movieverse-backend.onrender.com/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie_id: selectedMovie.imdbID,
        title: selectedMovie.Title,
        poster_url: selectedMovie.Poster,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Added to favorites');
    } else {
      alert(data.error || 'Failed to add favorite');
    }
  };

  const handleSearch = () => {
    fetchMovies(searchTerm);
  };

  const handleMovieSelect = (imdbId) => {
    getMovieDetails(imdbId);
  };

  useEffect(() => {
    fetchMovies('Avengers');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
        {user && (
          <div className="user-info">
            <p>Logged in as: {user.username || user.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      <main>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="content-container">
          <div className="movie-list">
            {movies.length > 0 && !selectedMovie && (
              <ul>
                {movies.map((movie) => (
                  <li key={movie.imdbID} onClick={() => handleMovieSelect(movie.imdbID)}>
                    {movie.Poster !== 'N/A' && (
                      <img src={movie.Poster} alt={`${movie.Title} Poster`} width="50" />
                    )}
                    <span>{movie.Title} ({movie.Year})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedMovie && (
            <div className="movie-details">
              <h2>{selectedMovie.Title}</h2>
              {selectedMovie.Poster !== 'N/A' && (
                <img src={selectedMovie.Poster} alt={`${selectedMovie.Title} Poster`} />
              )}
              <p><strong>Year:</strong> {selectedMovie.Year}</p>
              <p><strong>Rated:</strong> {selectedMovie.Rated}</p>
              <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
              <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
              <p><strong>Director:</strong> {selectedMovie.Director}</p>
              <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
              <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
              <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}</p>

              {token && (
                <button onClick={handleAddFavorite}>Add to Favorites</button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
