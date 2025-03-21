import { createSlice } from '@reduxjs/toolkit';

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Invalid token format', error);
    return null;
  }
};

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!token,
    user,
    token,
  },
  reducers: {
    login: (state, action) => {
      const { token, ...userData } = action.payload;

      const decoded = decodeToken(token);
      const expirationTime = decoded?.exp * 1000;

      state.isAuthenticated = true;
      state.user = userData;
      state.token = token;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(userData));

      setTimeout(() => {
        sessionStorage.clear();
        window.location.reload();
      }, expirationTime - Date.now());
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    },
    rehydrate: (state) => {
      const token = sessionStorage.getItem('token');
      const user = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;

      if (token) {
        const decoded = decodeToken(token);
        const isTokenValid = decoded?.exp * 1000 > Date.now();

        if (isTokenValid) {
          state.isAuthenticated = true;
          state.user = user;
          state.token = token;
        } else {
          sessionStorage.clear();
        }
      }
    },
  },
});

export const { login, logout, rehydrate } = authSlice.actions;

export default authSlice.reducer;
