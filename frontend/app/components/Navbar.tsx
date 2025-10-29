'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Home as HomeIcon,
  School as SchoolIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useThemeContext } from '@/context/ThemeContext';

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mode, toggleTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    router.push(ROUTES.HOME);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography
          variant="h6"
          component={Link}
          href={ROUTES.HOME}
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          E-Learning
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
            color="inherit"
            component={Link}
            href={ROUTES.HOME}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            href={ROUTES.COURSES}
            startIcon={<SchoolIcon />}
          >
            Courses
          </Button>
        </Box>

        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {isAuthenticated && user ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} href={ROUTES.DASHBOARD}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Dashboard
              </MenuItem>
              <MenuItem component={Link} href={ROUTES.PROFILE}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              color="inherit"
              component={Link}
              href={ROUTES.LOGIN}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              href={ROUTES.SIGNUP}
              startIcon={<PersonAddIcon />}
              sx={{ ml: 1 }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
