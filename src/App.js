import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';

const apiKey = '183fa13d';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('Fetch error:', err);
        setLoading(false);
      });
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header className="App-header">
        <h1>🎬 Movie Search</h1>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </header>

      {loading && <p>Loading...</p>}

      {movies.map((movie) => (
        <div key={movie.imdbID} style={{ marginBottom: '20px' }}>
          <h3>{movie.Title} ({movie.Year})</h3>
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
            alt={movie.Title}
            width="150"
          />
        </div>
      ))}

      {!loading && movies.length === 0 && searchTerm && <p>No movies found.</p>}
    </div>
  );
}

export default App;
