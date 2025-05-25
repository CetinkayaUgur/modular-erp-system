import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (loginData) => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    setIsAuthenticated(true);
    setUserData(loginData);
  };

  const handleRegister = (registerData) => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    setIsAuthenticated(true);
    setUserData(registerData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
          <Navigate to="/dashboard" /> : 
          <Login onLogin={handleLogin} />
        } />
        <Route path="/register/:type" element={
          isAuthenticated ? 
          <Navigate to="/dashboard" /> : 
          <Register onRegister={handleRegister} />
        } />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard userData={userData} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
