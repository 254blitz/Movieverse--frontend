import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './Favorites';
import ProtectedRoute from './ProtectedRoute';
import Login from './Components/Login.jsx';
import App from './App'; 

function AppRoutes() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
