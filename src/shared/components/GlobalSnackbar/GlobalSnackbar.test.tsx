import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { GlobalSnackbar } from './GlobalSnackbar';
import snackbarReducer, { showSnackbar } from '../../../store/slices/snackbarSlice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      snackbar: snackbarReducer,
    },
    preloadedState: {
      snackbar: {
        notifications: [],
        ...initialState,
      },
    },
  });
};

const renderWithStore = (store: ReturnType<typeof createMockStore>) => {
  return render(
    <Provider store={store}>
      <GlobalSnackbar />
    </Provider>
  );
};

describe('GlobalSnackbar', () => {
  it('renders nothing when there are no notifications', () => {
    const store = createMockStore();
    const { container } = renderWithStore(store);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders SnackbarStack with notifications', () => {
    const store = createMockStore({
      notifications: [
        {
          id: '1',
          message: 'Test notification',
          severity: 'success',
          autoHideDuration: 5000,
        },
      ],
    });

    renderWithStore(store);

    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('renders multiple notifications', () => {
    const store = createMockStore({
      notifications: [
        {
          id: '1',
          message: 'First notification',
          severity: 'success',
          autoHideDuration: 5000,
        },
        {
          id: '2',
          message: 'Second notification',
          severity: 'error',
          autoHideDuration: 5000,
        },
      ],
    });

    renderWithStore(store);

    expect(screen.getByText('First notification')).toBeInTheDocument();
    expect(screen.getByText('Second notification')).toBeInTheDocument();
  });

  it('passes notifications to SnackbarStack', () => {
    const store = createMockStore({
      notifications: [
        {
          id: '1',
          message: 'Test message',
          severity: 'info',
          autoHideDuration: 5000,
        },
      ],
    });
    
    renderWithStore(store);
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});

