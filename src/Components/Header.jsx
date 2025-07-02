import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="App-header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Movieverse</h1>
      </Link>
      <p>Dive into the movieverse — one search at a time</p>
      {user && <button onClick={logout} className="logout-button">Logout</button>}
    </header>
  );
}

export default Header;