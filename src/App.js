import React, { useEffect, useState } from 'react';

const apiKey = '183fa13d'; 

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=Avengers&apikey=${apiKey}`)
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
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Movie List</h1>

      {loading ? <p>Loading...</p> : null}

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

      {!loading && movies.length === 0 && <p>No movies found.</p>}
    </div>
  );
}

export default App;
