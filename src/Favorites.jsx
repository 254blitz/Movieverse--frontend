import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

function Favorites() {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://movieverse-backend.onrender.com/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setFavorites(data);
      } else {
        setError(data.error || 'Failed to load favorites');
      }
    } catch (err) {
      setError('Error fetching favorites: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (!token) {
    return <p>Please log in to view your favorites.</p>;
  }

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      {loading && <p>Loading favorites...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            {fav.poster_url && <img src={fav.poster_url} alt={fav.title} width="50" />}
            <span>{fav.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
