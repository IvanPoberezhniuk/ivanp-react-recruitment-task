import React from 'react';
import { useAppSelector } from '../../../store';
import { SnackbarStack } from './SnackbarStack';

export const GlobalSnackbar: React.FC = () => {
  const { notifications } = useAppSelector((state) => state.snackbar);

  return <SnackbarStack notifications={notifications} />;
};

