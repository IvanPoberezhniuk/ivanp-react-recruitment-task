import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { StylesObject } from '../../../shared/types/styles.types';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const styles: StylesObject = {
  topBar: {
    display: 'flex',
    gap: 2,
    mb: 3,
    alignItems: 'center',
  },
  searchField: {
    flex: 1,
  },
  viewToggle: {
    flexShrink: 0,
  },
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <Box sx={styles.topBar}>
      <TextField
        sx={styles.searchField}
        placeholder="Search Pokémon by name..."
        value={searchTerm}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <ToggleButtonGroup
        sx={styles.viewToggle}
        value={viewMode}
        exclusive
        onChange={(_, newMode) => {
          if (newMode !== null) {
            onViewModeChange(newMode);
          }
        }}
        aria-label="view mode"
      >
        <ToggleButton value="grid" aria-label="grid view">
          <Tooltip title="Grid View">
            <GridViewIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="list" aria-label="list view">
          <Tooltip title="List View">
            <ViewListIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

