import { describe, it, expect, beforeEach } from 'vitest';
import pokemonReducer, {
  clearError,
  clearSelectedPokemon,
  setPage,
  resetPokemonList,
  fetchPokemonList,
  fetchPokemonById,
  searchPokemon,
  fetchAllTypes,
} from './pokemonSlice';
import { Pokemon, PokemonState } from '../../shared/types/pokemon.types';

describe('pokemonSlice', () => {
  let initialState: PokemonState;

  beforeEach(() => {
    initialState = {
      pokemons: [],
      selectedPokemon: null,
      loading: false,
      error: null,
      page: 0,
      hasMore: true,
      total: 0,
      availableTypes: [],
    };
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      expect(initialState.pokemons).toEqual([]);
      expect(initialState.selectedPokemon).toBeNull();
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();
      expect(initialState.page).toBe(0);
      expect(initialState.hasMore).toBe(true);
      expect(initialState.total).toBe(0);
      expect(initialState.availableTypes).toEqual([]);
    });
  });

  describe('reducers', () => {
    describe('clearError', () => {
      it('clears the error', () => {
        const stateWithError = { ...initialState, error: 'Some error' };
        const state = pokemonReducer(stateWithError, clearError());
        expect(state.error).toBeNull();
      });
    });

    describe('clearSelectedPokemon', () => {
      it('clears the selected pokemon', () => {
        const mockPokemon = { id: 1, name: 'bulbasaur' } as Pokemon;
        const stateWithSelected = { ...initialState, selectedPokemon: mockPokemon };
        const state = pokemonReducer(stateWithSelected, clearSelectedPokemon());
        expect(state.selectedPokemon).toBeNull();
      });
    });

    describe('setPage', () => {
      it('sets the page number', () => {
        const state = pokemonReducer(initialState, setPage(5));
        expect(state.page).toBe(5);
      });

      it('updates page from existing value', () => {
        const stateWithPage = { ...initialState, page: 2 };
        const state = pokemonReducer(stateWithPage, setPage(10));
        expect(state.page).toBe(10);
      });
    });

    describe('resetPokemonList', () => {
      it('resets pokemon list to initial state', () => {
        const stateWithData = {
          ...initialState,
          pokemons: [{ id: 1, name: 'bulbasaur' }] as Pokemon[],
          page: 5,
          hasMore: false,
          total: 100,
        };
        const state = pokemonReducer(stateWithData, resetPokemonList());
        
        expect(state.pokemons).toEqual([]);
        expect(state.page).toBe(0);
        expect(state.hasMore).toBe(true);
        expect(state.total).toBe(0);
      });
    });
  });

  describe('extraReducers - fetchPokemonList', () => {
    it('sets loading to true on pending', () => {
      const state = pokemonReducer(initialState, fetchPokemonList.pending('', {}));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('sets pokemons and metadata on fulfilled', () => {
      const mockPokemons = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
      ] as Pokemon[];

      const action = {
        type: fetchPokemonList.fulfilled.type,
        payload: {
          pokemons: mockPokemons,
          hasMore: true,
          total: 151,
          page: 0,
        },
      };

      const state = pokemonReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.pokemons).toEqual(mockPokemons);
      expect(state.hasMore).toBe(true);
      expect(state.total).toBe(151);
      expect(state.page).toBe(0);
    });

    it('sets error on rejected', () => {
      const action = {
        type: fetchPokemonList.rejected.type,
        error: { message: 'Network error' },
      };

      const state = pokemonReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });

    it('uses default error message if none provided', () => {
      const action = {
        type: fetchPokemonList.rejected.type,
        error: {},
      };

      const state = pokemonReducer(initialState, action);
      
      expect(state.error).toBe('Failed to fetch Pokemon list');
    });
  });

  describe('extraReducers - fetchPokemonById', () => {
    it('sets loading to true on pending', () => {
      const state = pokemonReducer(initialState, fetchPokemonById.pending('', 1));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('sets selectedPokemon on fulfilled', () => {
      const mockPokemon = { id: 1, name: 'bulbasaur' } as Pokemon;

      const action = {
        type: fetchPokemonById.fulfilled.type,
        payload: mockPokemon,
      };

      const state = pokemonReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.selectedPokemon).toEqual(mockPokemon);
    });

    it('sets error on rejected', () => {
      const action = {
        type: fetchPokemonById.rejected.type,
        error: { message: 'Pokemon not found' },
      };

      const state = pokemonReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Pokemon not found');
    });

    it('uses default error message if none provided', () => {
      const action = {
        type: fetchPokemonById.rejected.type,
        error: {},
      };

      const state = pokemonReducer(initialState, action);

      expect(state.error).toBe('Failed to fetch Pokemon details');
    });
  });

  describe('extraReducers - searchPokemon', () => {
    it('sets loading to true on pending', () => {
      const state = pokemonReducer(initialState, searchPokemon.pending('', 'pikachu'));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('sets pokemons and hasMore to false on fulfilled', () => {
      const mockPokemons = [
        { id: 25, name: 'pikachu' },
      ] as Pokemon[];

      const action = {
        type: searchPokemon.fulfilled.type,
        payload: mockPokemons,
      };

      const state = pokemonReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.pokemons).toEqual(mockPokemons);
      expect(state.hasMore).toBe(false);
    });

    it('sets error on rejected', () => {
      const action = {
        type: searchPokemon.rejected.type,
        error: { message: 'Search failed' },
      };

      const state = pokemonReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Search failed');
    });

    it('uses default error message if none provided', () => {
      const action = {
        type: searchPokemon.rejected.type,
        error: {},
      };

      const state = pokemonReducer(initialState, action);

      expect(state.error).toBe('Pokemon not found');
    });
  });

  describe('extraReducers - fetchAllTypes', () => {
    it('sets availableTypes on fulfilled', () => {
      const mockTypes = ['fire', 'water', 'grass', 'electric'];

      const action = {
        type: fetchAllTypes.fulfilled.type,
        payload: mockTypes,
      };

      const state = pokemonReducer(initialState, action);

      expect(state.availableTypes).toEqual(mockTypes);
    });

    it('does not affect loading state', () => {
      const action = {
        type: fetchAllTypes.fulfilled.type,
        payload: ['fire', 'water'],
      };

      const state = pokemonReducer(initialState, action);

      expect(state.loading).toBe(false);
    });
  });
});

