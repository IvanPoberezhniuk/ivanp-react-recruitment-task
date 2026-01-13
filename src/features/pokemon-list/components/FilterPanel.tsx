import React from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { StylesObject } from "../../../shared/types/styles.types";
import { GENERATION_RANGES } from "../../../shared/utils/pokemonUtils";
import { scrollbarStyles, TYPE_COLORS } from "../../../theme/theme";

interface FilterPanelProps {
  activeFilterCount: number;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  availableTypes: string[];
  selectedGeneration: string;
  onGenerationChange: (generation: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const styles: StylesObject = {
  filterPanel: {
    backgroundColor: "background.paper",
    borderRadius: "16px",
    p: { xs: 1.5, sm: 2 },
    mb: 2,
    border: "1px solid",
    borderColor: "divider",
  },
  topRow: {
    display: "flex",
    gap: 1,
    mb: 1.5,
    alignItems: "center",
    flexWrap: "wrap",
  },
  filterControl: {
    minWidth: { sm: 220 },
    width: { xs: "100%", sm: 220 },
    flex: { xs: 1, md: "none" },
    "& .MuiSelect-select": {
      py: 1,
      fontSize: "0.875rem",
    },
  },
  viewToggle: {
    ml: { xs: 0, sm: "auto" },
  },
  clearButton: {
    fontSize: "0.75rem",
    py: 0.5,
    px: 1.5,
    minWidth: "auto",
  },
  typeChipsContainer: {
    display: "flex",
    gap: 0.52,
    flexWrap: { xs: "nowrap", sm: "wrap" },
    overflowX: { xs: "auto", sm: "visible" },
    pb: { xs: 0.5, sm: 0 },
    ...scrollbarStyles.thin,
  },
  typeChip: (type: string, isSelected: boolean) => ({
    fontSize: "0.75rem",
    height: "28px",
    flexShrink: 0,
    textTransform: "capitalize",
    backgroundColor: isSelected
      ? TYPE_COLORS[type as keyof typeof TYPE_COLORS] || "#777"
      : "default",
    color: isSelected ? "white" : "inherit",
    "&:hover": {
      opacity: 0.8,
    },
  }),
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedTypes,
  onTypeToggle,
  availableTypes,
  selectedGeneration,
  onGenerationChange,
  sortBy,
  onSortChange,
  onClearFilters,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <Box sx={styles.filterPanel}>
      <Box sx={styles.topRow}>
        <FormControl sx={styles.filterControl} size="small">
          <Select
            value={selectedGeneration}
            onChange={(e) => onGenerationChange(e.target.value)}
            displayEmpty
          >
            <MenuItem value="All">All</MenuItem>
            {Object.entries(GENERATION_RANGES).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={styles.filterControl} size="small">
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            displayEmpty
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

        <Button
          size="small"
          onClick={onClearFilters}
          sx={styles.clearButton}
          variant="text"
        >
          Clear All
        </Button>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, newMode) => newMode && onViewModeChange(newMode)}
          size="small"
          sx={styles.viewToggle}
        >
          <ToggleButton value="grid" aria-label="grid view">
            <GridViewIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={styles.typeChipsContainer}>
        {availableTypes.map((type) => (
          <Chip
            key={type}
            label={type}
            onClick={() => onTypeToggle(type)}
            size="small"
            sx={styles.typeChip(type, selectedTypes.includes(type))}
          />
        ))}
      </Box>
    </Box>
  );
};
