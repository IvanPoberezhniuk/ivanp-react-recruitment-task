import { useState, useCallback } from 'react';
import { useAppDispatch } from '../../../store';
import { resetPokemonList, searchPokemon, fetchPokemonList } from '../../../store/slices/pokemonSlice';

/**
 * Custom hook for search with debounce functionality
 */
export const useSearchDebounce = (
  sortBy: string,
  selectedTypes: string[],
  selectedGeneration: string
) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
          dispatch(searchPokemon({
            searchTerm: value.trim(),
            sortBy,
            selectedTypes,
            selectedGeneration,
          }));
        } else {
          dispatch(resetPokemonList());
          dispatch(
            fetchPokemonList({
              page: 0,
              sortBy,
              selectedTypes,
              selectedGeneration,
            })
          );
        }
      }, 500);

      setSearchTimeout(timeout);
    },
    [dispatch, searchTimeout, sortBy, selectedTypes, selectedGeneration]
  );

  return {
    searchTerm,
    handleSearchChange,
  };
};

