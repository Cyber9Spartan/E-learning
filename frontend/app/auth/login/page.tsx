'use client';
import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { authService } from '@/services/authService';
import { useSnackbar } from '@/context/SnackbarContext';
import { ROUTES } from '@/constants/routes';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(formData);
      dispatch(setCredentials({ user: response.user, token: response.token }));
      showSnackbar('Login successful!', 'success');
      
      // Redirect based on role
      const dashboardPath = `/dashboard/${response.user.role}`;
      router.push(dashboardPath);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      showSnackbar('Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Sign in to your account to continue
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="email"
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link href={ROUTES.FORGOT_PASSWORD} variant="body2">
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Typography variant="body2" align="center">
                Don't have an account?{' '}
                <Link href={ROUTES.SIGNUP} underline="hover">
                  Sign up
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}