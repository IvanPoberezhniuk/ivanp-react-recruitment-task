import { describe, it, expect, beforeEach, vi } from 'vitest';
import snackbarReducer, {
  showSnackbar,
  removeSnackbar,
  clearAllSnackbars,
  SnackbarState,
} from './snackbarSlice';

describe('snackbarSlice', () => {
  let initialState: SnackbarState;

  beforeEach(() => {
    initialState = {
      notifications: [],
    };
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have empty notifications array', () => {
      expect(initialState.notifications).toEqual([]);
    });
  });

  describe('showSnackbar', () => {
    it('adds a notification with default values', () => {
      const action = showSnackbar({ message: 'Test message' });
      const state = snackbarReducer(initialState, action);

      expect(state.notifications).toHaveLength(1);
      expect(state.notifications[0].message).toBe('Test message');
      expect(state.notifications[0].severity).toBe('info');
      expect(state.notifications[0].autoHideDuration).toBe(6000);
      expect(state.notifications[0].id).toBeDefined();
      expect(state.notifications[0].timestamp).toBeDefined();
    });

    it('adds a notification with custom severity', () => {
      const action = showSnackbar({ message: 'Error message', severity: 'error' });
      const state = snackbarReducer(initialState, action);

      expect(state.notifications[0].severity).toBe('error');
    });

    it('adds a notification with custom autoHideDuration', () => {
      const action = showSnackbar({ 
        message: 'Custom duration', 
        autoHideDuration: 10000 
      });
      const state = snackbarReducer(initialState, action);

      expect(state.notifications[0].autoHideDuration).toBe(10000);
    });

    it('adds multiple notifications', () => {
      let state = snackbarReducer(initialState, showSnackbar({ message: 'First' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Second' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Third' }));

      expect(state.notifications).toHaveLength(3);
      expect(state.notifications[0].message).toBe('First');
      expect(state.notifications[1].message).toBe('Second');
      expect(state.notifications[2].message).toBe('Third');
    });

    it('generates unique IDs for each notification', () => {
      let state = snackbarReducer(initialState, showSnackbar({ message: 'First' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Second' }));

      expect(state.notifications[0].id).not.toBe(state.notifications[1].id);
    });

    it('supports all severity types', () => {
      let state = snackbarReducer(initialState, showSnackbar({ message: 'Success', severity: 'success' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Error', severity: 'error' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Warning', severity: 'warning' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Info', severity: 'info' }));

      expect(state.notifications[0].severity).toBe('success');
      expect(state.notifications[1].severity).toBe('error');
      expect(state.notifications[2].severity).toBe('warning');
      expect(state.notifications[3].severity).toBe('info');
    });
  });

  describe('removeSnackbar', () => {
    it('removes a notification by id', () => {
      let state = snackbarReducer(initialState, showSnackbar({ message: 'First' }));
      const idToRemove = state.notifications[0].id;
      state = snackbarReducer(state, showSnackbar({ message: 'Second' }));

      state = snackbarReducer(state, removeSnackbar(idToRemove));

      expect(state.notifications).toHaveLength(1);
      expect(state.notifications[0].message).toBe('Second');
    });

    it('does nothing if id does not exist', () => {
      let state = snackbarReducer(initialState, showSnackbar({ message: 'Test' }));
      const originalLength = state.notifications.length;

      state = snackbarReducer(state, removeSnackbar('non-existent-id'));

      expect(state.notifications).toHaveLength(originalLength);
    });

    it('removes the correct notification from multiple', () => {
      let state = snackbarReducer(initialState, showSnackbar({ message: 'First' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Second' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Third' }));

      const idToRemove = state.notifications[1].id;
      state = snackbarReducer(state, removeSnackbar(idToRemove));

      expect(state.notifications).toHaveLength(2);
      expect(state.notifications[0].message).toBe('First');
      expect(state.notifications[1].message).toBe('Third');
    });
  });

  describe('clearAllSnackbars', () => {
    it('clears all notifications', () => {
      let state = snackbarReducer(initialState, showSnackbar({ message: 'First' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Second' }));
      state = snackbarReducer(state, showSnackbar({ message: 'Third' }));

      state = snackbarReducer(state, clearAllSnackbars());

      expect(state.notifications).toEqual([]);
    });

    it('does nothing if notifications are already empty', () => {
      const state = snackbarReducer(initialState, clearAllSnackbars());

      expect(state.notifications).toEqual([]);
    });
  });
});

