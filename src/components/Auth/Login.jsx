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

function Login({ setToken, setShowRegister }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const { data } = await authService.login(form);
      localStorage.setItem('token', data.data.token);
      setToken(data.data.token);
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to review your dashboard and keep your interview search moving."
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Typography align="center" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => setShowRegister(true)}
              sx={{ cursor: 'pointer', fontWeight: 700 }}
            >
              Register
            </Link>
          </Typography>
        </Stack>
      </Box>
    </AuthShell>
  );
}

export default Login;
