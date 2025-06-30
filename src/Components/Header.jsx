import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="header">
      <div className="header-content">
        <h1>Movieverse</h1>
        <p>Dive into the movieverse — one search at a time</p>
      </div>
      <button 
        onClick={handleAuthAction}
        className="auth-button"
      >
        {user ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default Header;