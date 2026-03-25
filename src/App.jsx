import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import JobList from './components/Jobs/JobList';
import Navbar from './components/Layout/Navbar';
import theme from './theme';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('dashboard');
  const [showRegister, setShowRegister] = useState(false);
  const [dashboardKey, setDashboardKey] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === 'dashboard') {
      setDashboardKey(prev => prev + 1); // Force dashboard refresh
    }
  };

  if (!token) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh' }}>
          {showRegister ? (
            <Register setShowRegister={setShowRegister} />
          ) : (
            <Login setToken={setToken} setShowRegister={setShowRegister} />
          )}
        </Box>
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <Navbar onLogout={handleLogout} setView={handleViewChange} currentView={view} />
        <Container sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
          {view === 'dashboard' && <Dashboard key={dashboardKey} setView={handleViewChange} />}
          {view === 'jobs' && <JobList onJobAdded={() => setDashboardKey(prev => prev + 1)} />}
        </Container>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
