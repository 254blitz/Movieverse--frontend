import React, { useEffect, useState } from 'react';

const apiKey = '8a004a2';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstMovieDetails, setFirstMovieDetails] = useState(null);

  useEffect(() => {
    const searchMoviesByTitle = async (title) => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${apiKey}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (data.Response === 'False') {
          console.error(`Error: ${data.Error}`);
          return [];
        }
        return data.Search;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };

    const getMovieDetails = async (imdbId) => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (data.Response === 'False') {
          console.error(`Error: ${data.Error}`);
          return null;
        }
        return data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    };

    const fetchMovies = async () => {
      const movieResults = await searchMoviesByTitle('Avengers');
      setMovies(movieResults);
      setLoading(false);

      if (movieResults.length > 0) {
        const details = await getMovieDetails(movieResults[0].imdbID);
        setFirstMovieDetails(details);
        console.log('First movie details:', details);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Movie List</h1>
      {loading && <p>Loading...</p>}
      {!loading && movies.length === 0 && <p>No movies found.</p>}
      {movies.map(movie => (
        <div key={movie.imdbID} style={{ marginBottom: '20px' }}>
          <h3>{movie.Title} ({movie.Year})</h3>
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
            alt={movie.Title}
            width="150"
          />
        </div>
      ))}
    </div>
  );
}

export default App;
