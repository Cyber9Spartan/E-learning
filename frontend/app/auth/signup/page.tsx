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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { authService } from '@/services/authService';
import { useSnackbar } from '@/context/SnackbarContext';
import { ROUTES } from '@/constants/routes';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'teacher',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await authService.signup(signupData);
      dispatch(setCredentials({ user: response.user, token: response.token }));
      showSnackbar('Account created successfully!', 'success');
      
      const dashboardPath = `/dashboard/${response.user.role}`;
      router.push(dashboardPath);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
      showSnackbar('Signup failed', 'error');
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
          py: 4,
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Join our learning platform today
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>I am a</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange as any}
                  label="I am a"
                  required
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
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

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>

              <Typography variant="body2" align="center">
                Already have an account?{' '}
                <Link href={ROUTES.LOGIN} underline="hover">
                  Sign in
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}