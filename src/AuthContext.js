import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // We still use localStorage to simulate staying logged in after a refresh.
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  /**
   * SIMULATED LOGIN
   * This function mimics the real login process. Instead of making an API call,
   * it immediately sets a fake token and user object.
   */
// Inside src/AuthContext.js

const login = async (credentials) => {
  console.log('Simulating login...');
  
  const fakeToken = 'fake-jwt-token-for-demo';
  localStorage.setItem('token', fakeToken);
  setToken(fakeToken);
  
  setUser({ username: credentials?.username || 'Demo User' });
  
  return Promise.resolve(true);
};

  const logout = () => {
    console.log('Logging out user.');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  
  useEffect(() => {
    if (token) {
      console.log('Found fake token. Simulating user session.');
      setUser({ username: 'Demo User' });
    }
  }, [token]);

  const value = { user, token, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}