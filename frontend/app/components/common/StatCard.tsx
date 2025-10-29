
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard = ({ title, value, icon, color = 'primary.main' }: StatCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
