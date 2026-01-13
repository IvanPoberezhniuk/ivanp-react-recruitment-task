import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  fetchPokemonList,
  fetchPokemonById,
  searchPokemon,
  clearError,
  resetPokemonList,
} from '../../store/slices/pokemonSlice';

/**
 * Example component showing how to use Redux Toolkit with async thunks
 * This is a reference implementation - customize as needed for your UI
 */
export const PokemonListExample: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Select data from Redux store
  const { pokemons, loading, error, page, hasMore, selectedPokemon } = useAppSelector(
    (state) => state.pokemon
  );

  // Fetch initial Pokemon list on component mount
  useEffect(() => {
    dispatch(fetchPokemonList({ page: 0 }));
  }, [dispatch]);

  // Handler to load more Pokemon
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchPokemonList({ page: page + 1 }));
    }
  };

  // Handler to view Pokemon details
  const handleViewDetails = (id: number) => {
    dispatch(fetchPokemonById(id));
  };

  // Handler to search for a Pokemon
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      dispatch(resetPokemonList());
      dispatch(searchPokemon(searchTerm));
    } else {
      dispatch(resetPokemonList());
      dispatch(fetchPokemonList({ page: 0 }));
    }
  };

  // Handler to clear errors
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div>
      <h1>Pokemon List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Pokemon..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Error Display */}
      {error && (
        <div style={{ color: 'red' }}>
          Error: {error}
          <button onClick={handleClearError}>Clear Error</button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && <div>Loading...</div>}

      {/* Pokemon List */}
      <div>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{pokemon.name}</h3>
            <img
              src={pokemon.sprites?.front_default}
              alt={pokemon.name}
              style={{ width: '100px' }}
            />
            <button onClick={() => handleViewDetails(pokemon.id)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}

      {/* Selected Pokemon Details */}
      {selectedPokemon && (
        <div style={{ border: '2px solid blue', padding: '20px', margin: '20px' }}>
          <h2>Selected Pokemon: {selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites?.other?.['official-artwork']?.front_default}
            alt={selectedPokemon.name}
            style={{ width: '200px' }}
          />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>Types: {selectedPokemon.types?.map(t => t.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

