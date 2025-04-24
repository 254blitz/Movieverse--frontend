import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';

const apiKey = '183fa13d';

function SearchBar({ searchTerm, onSearchChange, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent('Avengers')}&apikey=${apiKey}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header className="App-header">
        <Header />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </header>
      {loading && <p>Loading...</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ marginBottom: '20px', marginRight: '20px', width: '200px' }}>
            <h3>{movie.Title} ({movie.Year})</h3>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
              width="100%"
              height="auto"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      {!loading && movies.length === 0 && searchTerm && <p>No movies found.</p>}
      {!loading && movies.length === 0 && !searchTerm && <p>No movies found.</p>}
    </div>
  );
}

export default App;

