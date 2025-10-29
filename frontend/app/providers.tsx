
'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { ThemeProvider } from '@/context/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
