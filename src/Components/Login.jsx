import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../App.css'; 

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData); 
    navigate('/');
  };

  const handleForgotPassword = async () => {
    await login({ username: 'Demo User' });
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Login to MovieVerse</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            name="username" 
            type="text" 
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <div className="auth-footer">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <p><button type="button" className="link-button" onClick={handleForgotPassword}>Forgot password?</button></p>
      </div>
    </div>
  );
}
export default Login;