import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Dashboard as DashboardIcon, Work as WorkIcon, Logout as LogoutIcon } from '@mui/icons-material';

function Navbar({ onLogout, setView, currentView }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Interview Tracker
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<DashboardIcon />}
            onClick={() => setView('dashboard')}
            variant={currentView === 'dashboard' ? 'outlined' : 'text'}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            startIcon={<WorkIcon />}
            onClick={() => setView('jobs')}
            variant={currentView === 'jobs' ? 'outlined' : 'text'}
          >
            Jobs
          </Button>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
