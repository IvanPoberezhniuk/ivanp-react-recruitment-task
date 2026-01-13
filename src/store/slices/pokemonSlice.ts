import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonState } from '../../types/pokemon.types';
import { graphqlClient } from '../../services/graphqlClient';
import { getSdk } from '../../generated/graphql';

const LIMIT = 20;
const sdk = getSdk(graphqlClient);

// Helper function to transform GraphQL Pokemon to REST-like Pokemon
const transformPokemon = (gqlPokemon: any): Pokemon => {
  return {
    id: gqlPokemon.id,
    name: gqlPokemon.name,
    url: `https://pokeapi.co/api/v2/pokemon/${gqlPokemon.id}/`,
    height: gqlPokemon.height,
    weight: gqlPokemon.weight,
    base_experience: gqlPokemon.base_experience,
    types: gqlPokemon.pokemon_v2_pokemontypes?.map((pt: any) => ({
      slot: 0,
      type: {
        name: pt.pokemon_v2_type?.name || '',
        url: `https://pokeapi.co/api/v2/type/${pt.pokemon_v2_type?.id}/`,
      },
    })) || [],
    sprites: {
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${gqlPokemon.id}.png`,
    },
    stats: gqlPokemon.pokemon_v2_pokemonstats?.map((ps: any) => ({
      base_stat: ps.base_stat,
      effort: ps.effort,
      stat: {
        name: ps.pokemon_v2_stat?.name || '',
        url: `https://pokeapi.co/api/v2/stat/${ps.pokemon_v2_stat?.id}/`,
      },
    })) || [],
    abilities: gqlPokemon.pokemon_v2_pokemonabilities?.map((pa: any) => ({
      is_hidden: pa.is_hidden,
      slot: pa.slot,
      ability: {
        name: pa.pokemon_v2_ability?.name || '',
        url: `https://pokeapi.co/api/v2/ability/${pa.pokemon_v2_ability?.id}/`,
      },
    })) || [],
    species: gqlPokemon.pokemon_v2_pokemonspecy ? {
      name: gqlPokemon.pokemon_v2_pokemonspecy.name,
      url: `https://pokeapi.co/api/v2/pokemon-species/${gqlPokemon.pokemon_v2_pokemonspecy.id}/`,
    } : undefined,
  };
};

// Async thunk for fetching Pokemon list using GraphQL
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (page: number = 0) => {
    const offset = page * LIMIT;

    const data = await sdk.GetPokemonList({
      limit: LIMIT,
      offset: offset,
    });

    const pokemons = data.pokemon_v2_pokemon.map(transformPokemon);

    return {
      pokemons,
      hasMore: data.pokemon_v2_pokemon.length === LIMIT,
      total: data.pokemon_v2_pokemon_aggregate.aggregate?.count || 0,
      page,
    };
  }
);

// Async thunk for fetching a single Pokemon by ID or name using GraphQL
export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (idOrName: string | number) => {
    let data;

    if (typeof idOrName === 'number') {
      // Fetch by ID
      data = await sdk.GetPokemonById({ id: idOrName });
      if (!data.pokemon_v2_pokemon_by_pk) {
        throw new Error('Failed to fetch Pokemon details');
      }
      return transformPokemon(data.pokemon_v2_pokemon_by_pk);
    } else {
      // Fetch by name
      data = await sdk.GetPokemonByName({ name: idOrName.toLowerCase() });
      if (!data.pokemon_v2_pokemon || data.pokemon_v2_pokemon.length === 0) {
        throw new Error('Failed to fetch Pokemon details');
      }
      return transformPokemon(data.pokemon_v2_pokemon[0]);
    }
  }
);

// Async thunk for searching Pokemon by name using GraphQL
export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (searchTerm: string) => {
    // Add % wildcards for partial matching
    const pattern = `%${searchTerm.toLowerCase()}%`;
    const data = await sdk.SearchPokemon({ searchTerm: pattern });
    
    if (!data.pokemon_v2_pokemon || data.pokemon_v2_pokemon.length === 0) {
      throw new Error('Pokemon not found');
    }
    
    // Return array of matching Pokemon
    return data.pokemon_v2_pokemon.map(transformPokemon);
  }
);

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  page: 0,
  hasMore: true,
  total: 0,
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
      state.total = 0;
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
        state.pokemons = action.payload.pokemons;
        state.hasMore = action.payload.hasMore;
        state.total = action.payload.total;
        state.page = action.payload.page;
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
        state.pokemons = action.payload;
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

