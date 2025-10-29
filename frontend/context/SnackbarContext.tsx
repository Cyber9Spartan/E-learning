
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface SnackbarState {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface SnackbarContextType {
  showSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbar({ message, severity });
  };

  const handleClose = () => {
    setSnackbar(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
