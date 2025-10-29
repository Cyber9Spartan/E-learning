
'use client';

import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/app/components/layout/Sidebar';
import AppBar from '@/app/components/layout/AppBar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
