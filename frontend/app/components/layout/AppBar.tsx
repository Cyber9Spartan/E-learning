'use client';

import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

interface AppBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppBar = ({ isSidebarOpen, toggleSidebar }: AppBarProps) => {
  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
