import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Pagination } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPokemonList, fetchAllTypes } from "../../store/slices/pokemonSlice";
import { Pokemon } from "../../shared/types/pokemon.types";
import { StylesObject } from "../../shared/types/styles.types";
import { usePageTitle } from "../../shared/hooks/usePageTitle";

// Feature components
import {
  SearchBar,
  FilterPanel,
  PokemonGrid,
  LoadingOverlay,
  NoResults,
} from "../../features/pokemon-list/components";

// Custom hooks
import { useUrlFilters } from "../../features/pokemon-list/hooks/useUrlFilters";
import { useSearchDebounce } from "../../features/pokemon-list/hooks/useSearchDebounce";
import { useViewMode } from "../../features/pokemon-list/hooks/useViewMode";

// Simplified styles - most styling moved to child components
const styles: StylesObject = {
  container: {
    py: { xs: 2, sm: 3, md: 4 },
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  },
};

const ITEMS_PER_PAGE = 20;

export const PokemonList: React.FC = () => {
  usePageTitle('Pokémon List');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pokemons, loading, page, total, availableTypes } = useAppSelector(
    (state) => state.pokemon
  );

  // Custom hooks
  const { viewMode, setViewMode } = useViewMode();
  const {
    selectedTypes,
    setSelectedTypes,
    selectedGeneration,
    setSelectedGeneration,
    sortBy,
    setSortBy,
  } = useUrlFilters();
  const { searchTerm, handleSearchChange } = useSearchDebounce(
    sortBy,
    selectedTypes,
    selectedGeneration
  );



  // Fetch all available types on mount
  useEffect(() => {
    if (availableTypes.length === 0) {
      dispatch(fetchAllTypes());
    }
  }, [dispatch, availableTypes.length]);

  // Fetch initial Pokemon list
  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(
        fetchPokemonList({
          page: 0,
          sortBy,
          selectedTypes,
          selectedGeneration,
        })
      );
    }
  }, [dispatch, pokemons.length, sortBy, selectedTypes, selectedGeneration]);

  // Refetch when filters or sort changes
  useEffect(() => {
    if (!searchTerm && pokemons.length > 0) {
      dispatch(
        fetchPokemonList({
          page: 0,
          sortBy,
          selectedTypes,
          selectedGeneration,
        })
      );
    }
  }, [sortBy, selectedTypes, selectedGeneration]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Handle page change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (!loading) {
      dispatch(
        fetchPokemonList({
          page: value - 1,
          sortBy,
          selectedTypes,
          selectedGeneration,
        })
      );
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
      <LoadingOverlay loading={loading} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <FilterPanel
        activeFilterCount={activeFilterCount}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        availableTypes={availableTypes}
        selectedGeneration={selectedGeneration}
        onGenerationChange={setSelectedGeneration}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {pokemons.length === 0 && !loading ? (
        <NoResults searchTerm={searchTerm} />
      ) : (
        <>
          <PokemonGrid
            pokemons={pokemons}
            viewMode={viewMode}
            onPokemonClick={handlePokemonClick}
          />

          {!searchTerm && pokemons.length > 0 && totalPages > 1 && (
            <Box sx={styles.paginationContainer}>
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
        </>
      )}

    </Container>
  );
};
