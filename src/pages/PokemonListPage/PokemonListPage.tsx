import React, { useEffect, useState, useMemo } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  CircularProgress,
  Container,
  InputAdornment,
  Pagination,
  TextField,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Tooltip,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchPokemonList,
  resetPokemonList,
  searchPokemon,
} from "../../store/slices/pokemonSlice";
import { Pokemon } from "../../shared/types/pokemon.types";
import { StylesObject } from "../../shared/types/styles.types";
import { PokemonCard } from "../../features/pokemon-card/PokemonCard";
import { PokemonCardList } from "../../features/pokemon-card/PokemonCardList";
import {
  getAllTypes,
  GENERATION_RANGES,
} from "../../shared/utils/pokemonUtils";
import { TYPE_COLORS } from "../../theme/theme";
import { usePageTitle } from "../../shared/hooks/usePageTitle";

// Styles constant
const styles: StylesObject = {
  container: {
    py: 4,
  },

  // Top bar with search and view toggle
  topBar: {
    display: "flex",
    gap: 2,
    mb: 3,
    alignItems: "center",
  },

  searchField: {
    flex: 1,
  },

  viewToggle: {
    flexShrink: 0,
  },

  // Filter section
  filterSection: {
    mb: 3,
  },

  filterButton: {
    mb: 2,
    textTransform: "none",
    justifyContent: "flex-start",
    gap: 1,
  },

  filterPanel: {
    backgroundColor: "background.paper",
    borderRadius: 2,
    p: 2.5,
    mb: 3,
    border: "1px solid",
    borderColor: "divider",
  },

  filterPanelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },

  filterTitle: {
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "text.secondary",
  },

  clearFiltersButton: {
    textTransform: "none",
    fontSize: "0.875rem",
  },

  filterRow: {
    display: "flex",
    gap: 2,
    mb: 2.5,
    flexWrap: "wrap",
  },

  filterControl: {
    minWidth: 180,
    flex: 1,
  },

  typesSection: {
    mt: 1,
  },

  typesSectionLabel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "text.secondary",
    mb: 1,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  typeChipsContainer: {
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
  },

  typeChip: (typeName: string, isSelected: boolean) => ({
    backgroundColor: isSelected
      ? TYPE_COLORS[typeName] || "#777"
      : "transparent",
    color: isSelected ? "#fff" : "text.secondary",
    borderColor: isSelected
      ? TYPE_COLORS[typeName] || "#777"
      : "divider",
    borderWidth: 1,
    borderStyle: "solid",
    fontWeight: isSelected ? 600 : 500,
    textTransform: "capitalize",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: TYPE_COLORS[typeName] || "#777",
      color: "#fff",
      borderColor: TYPE_COLORS[typeName] || "#777",
      transform: "translateY(-1px)",
    },
  }),

  // Content area
  gridContainer: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(1, 1fr)",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(5, 1fr)",
    },
    gap: 3,
  },

  listContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: 3,
  },

  contentWrapper: {
    position: "relative",
    pointerEvents: (loading: boolean) => (loading ? "none" : "auto"),
    opacity: (loading: boolean) => (loading ? 0.5 : 1),
    transition: "opacity 0.3s ease",
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
  },

  paginationBox: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  },

  noResultsBox: {
    textAlign: "center",
    py: 8,
  },

  activeFilterBadge: {
    ml: 1,
    backgroundColor: "primary.main",
    color: "primary.contrastText",
    fontWeight: 600,
    fontSize: "0.75rem",
    minWidth: 20,
    height: 20,
    borderRadius: "10px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    px: 0.75,
  },
};

const ITEMS_PER_PAGE = 20;

export const PokemonList: React.FC = () => {
  usePageTitle('Pokémon List');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { pokemons, loading, page, total } = useAppSelector(
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

  // Initialize filter states from URL
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const types = searchParams.get("types");
    return types ? types.split(",") : [];
  });
  const [selectedGeneration, setSelectedGeneration] = useState<string>(() => {
    return searchParams.get("generation") || "All";
  });
  const [sortBy, setSortBy] = useState<string>(() => {
    return searchParams.get("sort") || "id-asc";
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem("pokemonViewMode", viewMode);
  }, [viewMode]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedTypes.length > 0) {
      params.set("types", selectedTypes.join(","));
    }
    if (selectedGeneration !== "All") {
      params.set("generation", selectedGeneration);
    }
    if (sortBy !== "id-asc") {
      params.set("sort", sortBy);
    }

    setSearchParams(params, { replace: true });
  }, [selectedTypes, selectedGeneration, sortBy, setSearchParams]);

  // Fetch initial Pokemon list
  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemonList({
        page: 0,
        sortBy,
        selectedTypes,
        selectedGeneration
      }));
    }
  }, [dispatch, pokemons.length, sortBy, selectedTypes, selectedGeneration]);

  // Refetch when filters or sort changes
  useEffect(() => {
    if (!searchTerm && pokemons.length > 0) {
      dispatch(fetchPokemonList({
        page: 0, // Reset to page 0 when filters change
        sortBy,
        selectedTypes,
        selectedGeneration
      }));
    }
  }, [sortBy, selectedTypes, selectedGeneration]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get available types from current Pokemon list
  const availableTypes = useMemo(() => getAllTypes(pokemons), [pokemons]);

  // Use server-filtered results directly (no client-side filtering needed)
  const filteredPokemons = pokemons;

  // Handle type filter toggle
  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedTypes.length > 0) count += selectedTypes.length;
    if (selectedGeneration !== "All") count += 1;
    if (sortBy !== "id-asc") count += 1;
    return count;
  }, [selectedTypes, selectedGeneration, sortBy]);

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedGeneration("All");
    setSortBy("id-asc");
  };

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
        dispatch(fetchPokemonList({
          page: 0,
          sortBy,
          selectedTypes,
          selectedGeneration
        }));
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
      dispatch(fetchPokemonList({
        page: value - 1,
        sortBy,
        selectedTypes,
        selectedGeneration
      }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Handle Pokemon card click
  const handlePokemonClick = (pokemon: Pokemon) => {
    navigate(`/${pokemon.id}`);
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      {/* Top Bar: Search + View Toggle */}
      <Box sx={styles.topBar}>
        <TextField
          sx={styles.searchField}
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
        <ToggleButtonGroup
          sx={styles.viewToggle}
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

      {/* Filter Section */}
      <Box sx={styles.filterSection}>
        <Tooltip title={showFilters ? "Hide Filters" : "Show Filters"}>
          <Box
            component="button"
            onClick={() => setShowFilters(!showFilters)}
            sx={{
              ...styles.filterButton,
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FilterListIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
            {activeFilterCount > 0 && (
              <Box component="span" sx={styles.activeFilterBadge}>
                {activeFilterCount}
              </Box>
            )}
          </Box>
        </Tooltip>

        <Collapse in={showFilters}>
          <Box sx={styles.filterPanel}>
            {/* Filter Panel Header */}
            <Box sx={styles.filterPanelHeader}>
              <Typography sx={styles.filterTitle}>
                Filter & Sort Options
              </Typography>
              {activeFilterCount > 0 && (
                <Tooltip title="Clear all filters">
                  <Box
                    component="button"
                    onClick={handleClearFilters}
                    sx={{
                      ...styles.clearFiltersButton,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      color: "primary.main",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Clear all
                  </Box>
                </Tooltip>
              )}
            </Box>

            {/* Filter Row: Generation + Sort */}
            <Box sx={styles.filterRow}>
              <FormControl sx={styles.filterControl} size="small">
                <InputLabel>Generation</InputLabel>
                <Select
                  value={selectedGeneration}
                  label="Generation"
                  onChange={(e) => setSelectedGeneration(e.target.value)}
                >
                  <MenuItem value="All">All Generations</MenuItem>
                  {Object.keys(GENERATION_RANGES).map((gen) => (
                    <MenuItem key={gen} value={gen}>
                      {gen}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={styles.filterControl} size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="id-asc">ID ↑</MenuItem>
                  <MenuItem value="id-desc">ID ↓</MenuItem>
                  <MenuItem value="name-asc">Name A-Z</MenuItem>
                  <MenuItem value="name-desc">Name Z-A</MenuItem>
                  <MenuItem value="height-asc">Height ↑</MenuItem>
                  <MenuItem value="height-desc">Height ↓</MenuItem>
                  <MenuItem value="weight-asc">Weight ↑</MenuItem>
                  <MenuItem value="weight-desc">Weight ↓</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Type Filters */}
            <Box sx={styles.typesSection}>
              <Typography sx={styles.typesSectionLabel}>
                Filter by Type
              </Typography>
              <Box sx={styles.typeChipsContainer}>
                {availableTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    size="small"
                    onClick={() => handleTypeToggle(type)}
                    sx={styles.typeChip(type, selectedTypes.includes(type))}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Content Wrapper with Loading Overlay */}
      <Box
        sx={{
          ...styles.contentWrapper,
          pointerEvents: loading ? "none" : "auto",
          opacity: loading ? 0.5 : 1,
        }}
      >

        {/* Pokemon Grid */}
        <Box
          sx={viewMode === "grid" ? styles.gridContainer : styles.listContainer}
        >
          {filteredPokemons.map((pokemon) => (
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
        {!searchTerm && filteredPokemons.length > 0 && totalPages > 1 && (
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
        {filteredPokemons.length === 0 && (
          <Box sx={styles.noResultsBox}>
            <Typography variant="h5" color="text.secondary">
              No Pokemon found
            </Typography>
            {(selectedTypes.length > 0 || selectedGeneration !== "All") && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Try adjusting your filters
              </Typography>
            )}
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
