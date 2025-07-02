import React, { useState } from 'react';
import MovieList from './Components/MovieList';
import MovieDetails from './Components/MovieDetails';
import { sampleMovies } from './mockData'; 

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(sampleMovies);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedMovieId(null); 
    if (term === '') {
      setFilteredMovies(sampleMovies);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const results = sampleMovies.filter(movie => 
        movie.Title.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredMovies(results);
    }
  };

  const selectedMovie = sampleMovies.find(m => m.imdbID === selectedMovieId);

  return (
    <>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="content-container">
        {selectedMovieId ? (
          <MovieDetails 
            movie={selectedMovie} 
            onBack={() => setSelectedMovieId(null)} 
          />
        ) : (
          <MovieList 
            movies={filteredMovies} 
            onMovieSelect={setSelectedMovieId} 
          />
        )}
      </div>
    </>
  );
}

export default Home;