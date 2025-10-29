
import { createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';

export const lightTheme = createTheme({
  palette: lightPalette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
