import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { StylesObject } from '../../../shared/types/styles.types';

interface LoadingOverlayProps {
  loading: boolean;
}

const styles: StylesObject = {
  loadingOverlay: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
  },
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box sx={styles.loadingOverlay}>
      <CircularProgress size={60} />
    </Box>
  );
};

