import React, { useEffect, useState } from 'react';
import './App.css';

const apiKey = '183fa13d'; 

async function getMovieDetails(imdbId) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      console.log(`Error: ${data.Error}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch movies
  const fetchMoviesByTitle = async (title) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${apiKey}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === 'False') {
        console.log(`Error: ${data.Error}`);
        return [];
      }

      return data.Search;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    // Automatically fetch Avengers movies on load
    const loadMovies = async () => {
      const movieResults = await fetchMoviesByTitle('Avengers');
      setMovies(movieResults);

      // Optional: Fetch full details of the first movie
      if (movieResults.length > 0) {
        const details = await getMovieDetails(movieResults[0].imdbID);
        console.log('First movie details:', details);
      }

      setLoading(false);
    };

    loadMovies();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Movie List</h1>

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

      {!loading && movies.length === 0 && <p>No movies found.</p>}
    </div>
  );
}

export default App;

