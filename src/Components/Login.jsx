import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // For cookie-based auth
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Successful login
      login(data.access_token);
      navigate('/'); // Redirect to home page
      
    } catch (error) {
      setErrors({ api: error.message || 'Login failed. Please try again.' });
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to MovieVerse</h2>
      
      {errors.api && (
        <div className="alert alert-error">
          {errors.api}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="auth-footer">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <p><Link to="/forgot-password">Forgot password?</Link></p>
      </div>
    </div>
  );
}

export default Login;