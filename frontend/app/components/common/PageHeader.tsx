
import React from 'react';
import { Typography, Box } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;
