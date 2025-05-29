import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from "./pages/Authentication/Dashboard";
import Login from "./pages/Authentication/Login";
import Signup from './pages/Authentication/Signup';
import ProfilePage from './pages/Profile/ProfilePage';
import AddIncome from './pages/Transaction/AddIncome';
import Transactions from './pages/Transaction/Transactions';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard user={user} setUser={setUser} onSession={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signin" element={<Signup onSignIn={handleLogin} />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path='/profile/addIncome' element={<AddIncome />} />
        <Route path='profile/transactions' element={<Transactions  />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
