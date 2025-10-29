'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      sx={{
        width: isOpen ? 240 : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} href={ROUTES.DASHBOARD}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} href={ROUTES.COURSES}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
        <ListItem button component={Link} href={ROUTES.PROFILE}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
