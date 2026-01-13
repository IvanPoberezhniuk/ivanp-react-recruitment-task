import React from 'react';
import {
  Box,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Button,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { StylesObject } from '../../../shared/types/styles.types';
import { GENERATION_RANGES } from '../../../shared/utils/pokemonUtils';
import { TYPE_COLORS } from '../../../theme/theme';

interface FilterPanelProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  activeFilterCount: number;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  availableTypes: string[];
  selectedGeneration: string;
  onGenerationChange: (generation: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const styles: StylesObject = {
  filterSection: {
    mb: 3,
  },
  filterButton: {
    mb: 2,
    textTransform: 'none',
    justifyContent: 'flex-start',
    gap: 1,
  },
  filterPanel: {
    backgroundColor: 'background.paper',
    borderRadius: 2,
    p: 2.5,
    mb: 3,
    border: '1px solid',
    borderColor: 'divider',
  },
  filterPanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  filterTitle: {
    fontWeight: 600,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'text.secondary',
  },
  filterRow: {
    display: 'flex',
    gap: 2,
    mb: 2,
    flexWrap: 'wrap',
  },
  filterControl: {
    minWidth: 200,
    flex: 1,
  },
  typeChipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  },
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
  onToggleFilters,
  activeFilterCount,
  selectedTypes,
  onTypeToggle,
  availableTypes,
  selectedGeneration,
  onGenerationChange,
  sortBy,
  onSortChange,
  onClearFilters,
}) => {
  return (
    <Box sx={styles.filterSection}>
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={onToggleFilters}
        sx={styles.filterButton}
        fullWidth
      >
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </Button>

      <Collapse in={showFilters}>
        <Box sx={styles.filterPanel}>
          <Box sx={styles.filterPanelHeader}>
            <Typography sx={styles.filterTitle}>Filter & Sort</Typography>
            {activeFilterCount > 0 && (
              <Button size="small" onClick={onClearFilters}>
                Clear All
              </Button>
            )}
          </Box>

          <Box sx={styles.filterRow}>
            <FormControl sx={styles.filterControl}>
              <InputLabel>Generation</InputLabel>
              <Select
                value={selectedGeneration}
                label="Generation"
                onChange={(e) => onGenerationChange(e.target.value)}
              >
                <MenuItem value="All">All Generations</MenuItem>
                {Object.entries(GENERATION_RANGES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={styles.filterControl}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => onSortChange(e.target.value)}
              >
                <MenuItem value="id-asc">ID (Low to High)</MenuItem>
                <MenuItem value="id-desc">ID (High to Low)</MenuItem>
                <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                <MenuItem value="height-asc">Height (Low to High)</MenuItem>
                <MenuItem value="height-desc">Height (High to Low)</MenuItem>
                <MenuItem value="weight-asc">Weight (Low to High)</MenuItem>
                <MenuItem value="weight-desc">Weight (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography sx={{ ...styles.filterTitle, mb: 1.5 }}>
              Type
            </Typography>
            <Box sx={styles.typeChipsContainer}>
              {availableTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => onTypeToggle(type)}
                  sx={{
                    backgroundColor: selectedTypes.includes(type)
                      ? TYPE_COLORS[type as keyof typeof TYPE_COLORS] || '#777'
                      : 'default',
                    color: selectedTypes.includes(type) ? 'white' : 'inherit',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

