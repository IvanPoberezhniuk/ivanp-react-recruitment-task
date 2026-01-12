import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonListResponse, PokemonState } from '../../types/pokemon.types';

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2';
const LIMIT = 20;

// Async thunk for fetching Pokemon list
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (page: number = 0) => {
    const offset = page * LIMIT;
    const response = await fetch(`${POKEMON_API_BASE}/pokemon?limit=${LIMIT}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }
    const data: PokemonListResponse = await response.json();
    
    // Fetch detailed data for each Pokemon
    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        return detailResponse.json();
      })
    );
    
    return {
      pokemons: detailedPokemons,
      hasMore: data.next !== null,
    };
  }
);

// Async thunk for fetching a single Pokemon by ID or name
export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (idOrName: string | number) => {
    const response = await fetch(`${POKEMON_API_BASE}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon details');
    }
    const data: Pokemon = await response.json();
    return data;
  }
);

// Async thunk for searching Pokemon by name
export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (searchTerm: string) => {
    const response = await fetch(`${POKEMON_API_BASE}/pokemon/${searchTerm.toLowerCase()}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    const data: Pokemon = await response.json();
    return data;
  }
);

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  page: 0,
  hasMore: true,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedPokemon: (state) => {
      state.selectedPokemon = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetPokemonList: (state) => {
      state.pokemons = [];
      state.page = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    // Fetch Pokemon List
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = [...state.pokemons, ...action.payload.pokemons];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon list';
      });

    // Fetch Pokemon by ID
    builder
      .addCase(fetchPokemonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon details';
      });

    // Search Pokemon
    builder
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = [action.payload];
        state.hasMore = false;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Pokemon not found';
      });
  },
});

export const { clearError, clearSelectedPokemon, setPage, resetPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;

