import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import SearchBar from './Components/SearchBar';
import MovieList from './Components/MovieList';
import MovieDetails from './Components/MovieDetails';
import LoadingSpinner from './Components/LoadingSpinner';
import ErrorMessage from './Components/ErrorMessage';

function Home() {
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <>
      <SearchBar/>
      <LoadingSpinner loading={loading} />
      <ErrorMessage error={error} />
      
      <div className="content-container">
      </div>
    </>
  );
}

export default Home;