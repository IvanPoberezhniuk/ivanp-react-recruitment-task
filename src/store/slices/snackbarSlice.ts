import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarItem {
  id: string;
  message: string;
  severity: SnackbarSeverity;
  autoHideDuration: number;
  timestamp: number;
}

export interface SnackbarState {
  notifications: SnackbarItem[];
}

const initialState: SnackbarState = {
  notifications: [],
};

export interface ShowSnackbarPayload {
  message: string;
  severity?: SnackbarSeverity;
  autoHideDuration?: number;
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ShowSnackbarPayload>) => {
      const newNotification: SnackbarItem = {
        id: `${Date.now()}-${Math.random()}`,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
        autoHideDuration: action.payload.autoHideDuration || 6000,
        timestamp: Date.now(),
      };
      state.notifications.push(newNotification);
    },
    removeSnackbar: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearAllSnackbars: (state) => {
      state.notifications = [];
    },
  },
});

export const { showSnackbar, removeSnackbar, clearAllSnackbars } = snackbarSlice.actions;
export default snackbarSlice.reducer;

