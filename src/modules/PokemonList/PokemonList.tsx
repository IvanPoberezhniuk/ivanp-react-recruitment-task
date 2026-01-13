import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
} from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchPokemonList,
  searchPokemon,
  resetPokemonList,
  clearError,
} from "../../store/slices/pokemonSlice";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import { PokemonCardList } from "../PokemonCard/PokemonCardList";
import { Pokemon } from "../../types/pokemon.types";

// Styles constant
const styles = {
  container: {
    py: 4,
  } as SxProps<Theme>,

  errorAlert: {
    mb: 3,
  } as SxProps<Theme>,

  viewToggleContainer: {
    display: "flex",
    justifyContent: "flex-end",
    mb: 3,
  } as SxProps<Theme>,

  gridContainer: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(1, 1fr)",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(5, 1fr)",
    },
    gap: 3,
  } as SxProps<Theme>,

  listContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: 3,
  } as SxProps<Theme>,

  loadingBox: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  } as SxProps<Theme>,

  loadingSpinner: {
    // CircularProgress size handled by component prop
  },

  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.7)"
        : "rgba(255, 255, 255, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    pointerEvents: "all",
  } as SxProps<Theme>,

  contentWrapper: {
    position: "relative",
    pointerEvents: (loading: boolean) => (loading ? "none" : "auto"),
    opacity: (loading: boolean) => (loading ? 0.5 : 1),
    transition: "opacity 0.3s ease",
  } as SxProps<Theme>,

  paginationBox: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  } as SxProps<Theme>,

  noResultsBox: {
    textAlign: "center",
    py: 8,
  } as SxProps<Theme>,
};

const ITEMS_PER_PAGE = 20;

export const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pokemons, loading, error, page, total } = useAppSelector(
    (state) => state.pokemon
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    const savedViewMode = localStorage.getItem("pokemonViewMode");
    return savedViewMode === "grid" || savedViewMode === "list"
      ? savedViewMode
      : "grid";
  });

  useEffect(() => {
    localStorage.setItem("pokemonViewMode", viewMode);
  }, [viewMode]);

  // Fetch initial Pokemon list
  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemonList(0));
    }
  }, [dispatch, pokemons.length]);

  // Handle search with debounce
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for search
    const timeout = setTimeout(() => {
      if (value.trim()) {
        dispatch(resetPokemonList());
        dispatch(searchPokemon(value.trim()));
      } else {
        dispatch(resetPokemonList());
        dispatch(fetchPokemonList(0));
      }
    }, 500);

    setSearchTimeout(timeout);
  };

  // Handle page change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (!loading) {
      dispatch(fetchPokemonList(value - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Handle Pokemon card click
  const handlePokemonClick = (pokemon: Pokemon) => {
    navigate(`/${pokemon.id}`);
  };

  // Handle clear error
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Pokemon by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          onClose={handleClearError}
          sx={styles.errorAlert}
        >
          {error}
        </Alert>
      )}

      {/* Content Wrapper with Loading Overlay */}
      <Box
        sx={{
          ...styles.contentWrapper,
          pointerEvents: loading ? "none" : "auto",
          opacity: loading ? 0.5 : 1,
        }}
      >
        {/* View Mode Toggle */}
        <Box sx={styles.viewToggleContainer}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newView) => {
              if (newView !== null) {
                setViewMode(newView);
              }
            }}
            aria-label="view mode"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Pokemon Grid */}
        <Box
          sx={viewMode === "grid" ? styles.gridContainer : styles.listContainer}
        >
          {pokemons.map((pokemon) => (
            <Box key={pokemon.id}>
              {viewMode === "grid" ? (
                <PokemonCard pokemon={pokemon} onClick={handlePokemonClick} />
              ) : (
                <PokemonCardList
                  pokemon={pokemon}
                  onClick={handlePokemonClick}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        {!searchTerm && pokemons.length > 0 && totalPages > 1 && (
          <Box sx={styles.paginationBox}>
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        )}

        {/* No Results */}
        {pokemons.length === 0 && (
          <Box sx={styles.noResultsBox}>
            <Typography variant="h5" color="text.secondary">
              No Pokemon found
            </Typography>
          </Box>
        )}
      </Box>

      {/* Loading Overlay */}
      {loading && (
        <Box sx={styles.loadingOverlay}>
          <CircularProgress size={64} thickness={4} />
        </Box>
      )}
    </Container>
  );
};
