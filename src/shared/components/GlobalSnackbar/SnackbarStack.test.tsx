import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SnackbarStack } from './SnackbarStack';
import snackbarReducer, { SnackbarItem } from '../../../store/slices/snackbarSlice';

vi.useFakeTimers();

const createMockStore = () => {
  return configureStore({
    reducer: {
      snackbar: snackbarReducer,
    },
  });
};

const renderWithStore = (notifications: SnackbarItem[]) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <SnackbarStack notifications={notifications} />
    </Provider>
  );
};

describe('SnackbarStack', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders nothing when notifications array is empty', () => {
    const { container } = renderWithStore([]);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders a single notification', () => {
    const notifications: SnackbarItem[] = [
      {
        id: '1',
        message: 'Test notification',
        severity: 'success',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
    ];

    renderWithStore(notifications);

    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('renders multiple notifications', () => {
    const notifications: SnackbarItem[] = [
      {
        id: '1',
        message: 'First notification',
        severity: 'success',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
      {
        id: '2',
        message: 'Second notification',
        severity: 'error',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
    ];

    renderWithStore(notifications);

    expect(screen.getByText('First notification')).toBeInTheDocument();
    expect(screen.getByText('Second notification')).toBeInTheDocument();
  });

  it('renders different severity types correctly', () => {
    const notifications: SnackbarItem[] = [
      {
        id: '1',
        message: 'Success message',
        severity: 'success',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
      {
        id: '2',
        message: 'Error message',
        severity: 'error',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
      {
        id: '3',
        message: 'Warning message',
        severity: 'warning',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
      {
        id: '4',
        message: 'Info message',
        severity: 'info',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
    ];
    
    renderWithStore(notifications);
    
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('shows close button for each notification', () => {
    const notifications: SnackbarItem[] = [
      {
        id: '1',
        message: 'Test notification',
        severity: 'success',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
    ];

    renderWithStore(notifications);

    const closeButton = screen.getByTitle('Close');
    expect(closeButton).toBeInTheDocument();
  });

  it('shows expand button for long messages', () => {
    const longMessage = 'This is a very long message that exceeds 100 characters and should show an expand button to allow users to read the full content of the notification message.';

    const notifications: SnackbarItem[] = [
      {
        id: '1',
        message: longMessage,
        severity: 'info',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
    ];

    renderWithStore(notifications);

    const expandButton = screen.getByTitle('Expand');
    expect(expandButton).toBeInTheDocument();
  });

  it('does not show expand button for short messages', () => {
    const notifications: SnackbarItem[] = [
      {
        id: '1',
        message: 'Short message',
        severity: 'info',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
    ];

    renderWithStore(notifications);

    const expandButton = screen.queryByTitle('Expand');
    expect(expandButton).not.toBeInTheDocument();
  });

  it('toggles expand/collapse when expand button is clicked', () => {
    const longMessage = 'This is a very long message that exceeds 100 characters and should show an expand button to allow users to read the full content of the notification message.';

    const notifications: SnackbarItem[] = [
      {
        id: '1',
        message: longMessage,
        severity: 'info',
        autoHideDuration: 5000,
        timestamp: Date.now(),
      },
    ];
    
    renderWithStore(notifications);
    
    const expandButton = screen.getByTitle('Expand');
    fireEvent.click(expandButton);
    
    const collapseButton = screen.getByTitle('Collapse');
    expect(collapseButton).toBeInTheDocument();
    
    fireEvent.click(collapseButton);
    
    const expandButtonAgain = screen.getByTitle('Expand');
    expect(expandButtonAgain).toBeInTheDocument();
  });
});

