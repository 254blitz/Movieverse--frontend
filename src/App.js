import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Home from './Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </div>
  );
}

export default App;