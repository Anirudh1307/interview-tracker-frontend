import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import { authService } from '../../services/api';
import AuthShell from '../UI/AuthShell';

function Register({ setShowRegister }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.username || form.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await authService.register(form);
      toast.success('Registration successful! Please login.');
      setShowRegister(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Set up your workspace and start tracking applications with a cleaner flow."
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            error={!!errors.username}
            helperText={errors.username}
            disabled={loading}
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            disabled={loading}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
            disabled={loading}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
          <Typography align="center" color="text.secondary">
            Already have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => setShowRegister(false)}
              sx={{ cursor: 'pointer', fontWeight: 700 }}
            >
              Login
            </Link>
          </Typography>
        </Stack>
      </Box>
    </AuthShell>
  );
}

export default Register;
