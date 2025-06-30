import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
        credentials: 'include'  
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage(error.message || 'Failed to connect to server. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {message && <div className="alert">{message}</div>}
      
      <input
        value={formData.username}
        onChange={(e) => setFormData({...formData, username: e.target.value})}
        placeholder="Username"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
        type="email"
      />
      <input
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        placeholder="Password"
        type="password"
      />
      <button 
        onClick={handleRegister} 
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
}

export default Register;