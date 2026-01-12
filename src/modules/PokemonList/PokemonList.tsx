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
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
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

  headerContainer: {
    textAlign: "center",
    mb: 4,
  } as SxProps<Theme>,

  headerIconBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    mb: 2,
  } as SxProps<Theme>,

  headerIcon: {
    fontSize: 48,
    color: "primary.main",
  } as SxProps<Theme>,

  headerTitle: {
    fontWeight: 700,
  } as SxProps<Theme>,

  searchPaper: {
    p: 2,
    mb: 4,
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
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
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
    <Container maxWidth="xl" sx={styles.container}>
      {/* Header */}
      <Box sx={styles.headerContainer}>
        <Box sx={styles.headerIconBox}>
          <CatchingPokemonIcon sx={styles.headerIcon} />
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            sx={styles.headerTitle}
          >
            Pokédex
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary">
          Search and explore Pokemon from the Kanto region and beyond
        </Typography>
      </Box>

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
            <GridViewIcon sx={{ mr: 1 }} />
            Grid
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon sx={{ mr: 1 }} />
            List
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
              <PokemonCardList pokemon={pokemon} onClick={handlePokemonClick} />
            )}
          </Box>
        ))}
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={styles.loadingBox}>
          <CircularProgress size={48} />
        </Box>
      )}

      {/* Pagination */}
      {!loading && !searchTerm && pokemons.length > 0 && totalPages > 1 && (
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
      {!loading && pokemons.length === 0 && (
        <Box sx={styles.noResultsBox}>
          <Typography variant="h5" color="text.secondary">
            No Pokemon found
          </Typography>
        </Box>
      )}
    </Container>
  );
};
