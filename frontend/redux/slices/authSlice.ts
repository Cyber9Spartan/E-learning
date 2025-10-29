
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  user: any | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set('token', action.payload.token, { expires: 1 }); // Expires in 1 day
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
