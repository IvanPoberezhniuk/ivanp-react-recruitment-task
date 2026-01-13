import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  TextField,
} from "@mui/material";

import { StylesObject } from "../../../shared/types/styles.types";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const styles: StylesObject = {
  searchContainer: {
    mb: 2,
  },
  searchField: {
    width: '100%',
  },
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Box sx={styles.searchContainer}>
      <TextField
        sx={styles.searchField}
        placeholder="Search Pokémon by name..."
        value={searchTerm}
        onChange={onSearchChange}
        slotProps={{
          input: { sx: { background: "#fff" } },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
