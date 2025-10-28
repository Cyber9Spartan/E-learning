"use client";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper sx={{ p: 4, width: 400, boxShadow: 3 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Login to Your Account
        </Typography>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Sign In
        </Button>
        <Typography textAlign="center" mt={2} fontSize="0.9rem">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </Paper>
    </Box>
  );
}
