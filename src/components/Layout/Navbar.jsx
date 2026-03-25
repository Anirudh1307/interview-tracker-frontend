import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import {
  DashboardRounded as DashboardIcon,
  LogoutRounded as LogoutIcon,
  WorkOutlineRounded as WorkIcon
} from '@mui/icons-material';

function Navbar({ onLogout, setView, currentView }) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            py: 1.5,
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' }
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 3,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 12px 24px rgba(79, 70, 229, 0.24)'
              }}
            >
              <WorkIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="h6">Interview Tracker</Typography>
              <Typography variant="body2" color="text.secondary">
                Stay on top of every application stage
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.25}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Chip
              label={currentView === 'dashboard' ? 'Dashboard view' : 'Jobs view'}
              color="primary"
              variant="outlined"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            />
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                p: 0.75,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.72)',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Button
                color="primary"
                startIcon={<DashboardIcon />}
                onClick={() => setView('dashboard')}
                variant={currentView === 'dashboard' ? 'contained' : 'text'}
              >
                Dashboard
              </Button>
              <Button
                color="primary"
                startIcon={<WorkIcon />}
                onClick={() => setView('jobs')}
                variant={currentView === 'jobs' ? 'contained' : 'text'}
              >
                Jobs
              </Button>
              <Button
                color="error"
                startIcon={<LogoutIcon />}
                onClick={onLogout}
                variant="outlined"
              >
                Logout
              </Button>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
