import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import JobList from './components/Jobs/JobList';
import Navbar from './components/Layout/Navbar';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f7fa', paper: '#ffffff' }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
          }
        }
      }
    }
  }
});

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
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
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
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar onLogout={handleLogout} setView={handleViewChange} currentView={view} />
        <Box sx={{ p: 3 }}>
          {view === 'dashboard' && <Dashboard key={dashboardKey} setView={handleViewChange} />}
          {view === 'jobs' && <JobList onJobAdded={() => setDashboardKey(prev => prev + 1)} />}
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
