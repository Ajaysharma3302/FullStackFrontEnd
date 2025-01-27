// src/context/AuthContext.js
import  { createContext, useState, useEffect } from 'react';
import { setAuthHeader } from '../components/api/api';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  useEffect(() => {
    if (authToken) {
      setAuthHeader(authToken);
    }
  }, [authToken]);

  const loginUser = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const logoutUser = () => {
    setAuthToken('');
    localStorage.removeItem('authToken');
  };

  const value = { user, setUser, authToken, loginUser, logoutUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
