import React from 'react';
import { Box, Typography } from '@mui/material';
import { StylesObject } from '../../../shared/types/styles.types';

interface NoResultsProps {
  searchTerm?: string;
}

const styles: StylesObject = {
  noResults: {
    textAlign: 'center',
    py: 8,
  },
  noResultsText: {
    color: 'text.secondary',
    fontSize: '1.1rem',
  },
};

export const NoResults: React.FC<NoResultsProps> = ({ searchTerm }) => {
  return (
    <Box sx={styles.noResults}>
      <Typography variant="h6" sx={styles.noResultsText}>
        {searchTerm
          ? `No Pokémon found matching "${searchTerm}"`
          : 'No Pokémon found'}
      </Typography>
    </Box>
  );
};

