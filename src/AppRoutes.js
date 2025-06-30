import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Home from './Home';
import Login from './Components/Login';
import Register from './Components/Register';

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route 
          path="/" 
          element={user ? <Home /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}