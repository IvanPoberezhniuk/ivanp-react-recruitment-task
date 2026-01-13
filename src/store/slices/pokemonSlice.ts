import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonState } from '../../shared/types/pokemon.types';
import { graphqlClient } from '../../services/graphqlClient';
import { getSdk, Pokemon_V2_Pokemon_Order_By, Order_By, Pokemon_V2_Pokemon_Bool_Exp } from '../../generated/graphql';
import { GENERATION_RANGES } from '../../shared/utils/pokemonUtils';

const LIMIT = 20;
const sdk = getSdk(graphqlClient);

// Type for fetch parameters
export interface FetchPokemonListParams {
  page?: number;
  sortBy?: string;
  selectedTypes?: string[];
  selectedGeneration?: string;
}

const transformPokemon = (gqlPokemon: any): Pokemon => {
  const spritesData = gqlPokemon.pokemon_v2_pokemonsprites?.[0]?.sprites || {};
  const criesData = gqlPokemon.pokemon_v2_pokemoncries?.[0]?.cries || {};

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
    sprites: spritesData.front_default ? spritesData : {
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${gqlPokemon.id}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${gqlPokemon.id}.png`,
      other: {
        'official-artwork': {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${gqlPokemon.id}.png`,
          front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${gqlPokemon.id}.png`,
        },
      },
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
    moves: gqlPokemon.pokemon_v2_pokemonmoves?.map((pm: any) => ({
      move: {
        name: pm.pokemon_v2_move?.name || '',
        url: `https://pokeapi.co/api/v2/move/${pm.pokemon_v2_move?.id}/`,
      },
      version_group_details: [{
        level_learned_at: pm.level || 0,
        move_learn_method: {
          name: pm.pokemon_v2_movelearnmethod?.name || '',
          url: `https://pokeapi.co/api/v2/move-learn-method/${pm.pokemon_v2_movelearnmethod?.id}/`,
        },
        version_group: {
          name: pm.pokemon_v2_versiongroup?.name || '',
          url: `https://pokeapi.co/api/v2/version-group/${pm.pokemon_v2_versiongroup?.id}/`,
        },
      }],
    })) || [],
    game_indices: gqlPokemon.pokemon_v2_pokemongameindices?.map((gi: any) => ({
      game_index: gi.game_index,
      version: {
        name: gi.pokemon_v2_version?.name || '',
        url: `https://pokeapi.co/api/v2/version/${gi.pokemon_v2_version?.id}/`,
      },
    })) || [],
    cries: criesData.latest ? {
      latest: criesData.latest,
      legacy: criesData.legacy || criesData.latest,
    } : undefined,
    species: gqlPokemon.pokemon_v2_pokemonspecy ? {
      name: gqlPokemon.pokemon_v2_pokemonspecy.name,
      url: `https://pokeapi.co/api/v2/pokemon-species/${gqlPokemon.pokemon_v2_pokemonspecy.id}/`,
    } : undefined,
  };
};

// Helper function to convert sortBy string to GraphQL order_by
const getSortOrderBy = (sortBy: string = 'id-asc'): Pokemon_V2_Pokemon_Order_By[] => {
  const [field, direction] = sortBy.split('-');
  const order: Order_By = direction === 'desc' ? Order_By.Desc : Order_By.Asc;

  switch (field) {
    case 'id':
      return [{ id: order }];
    case 'name':
      return [{ name: order }];
    case 'height':
      return [{ height: order }];
    case 'weight':
      return [{ weight: order }];
    default:
      return [{ id: Order_By.Asc }];
  }
};

// Helper function to build where clause for filtering
const buildWhereClause = (
  selectedTypes: string[] = [],
  selectedGeneration: string = 'All'
): Pokemon_V2_Pokemon_Bool_Exp => {
  const conditions: any = {};

  // Filter by type
  if (selectedTypes.length > 0) {
    conditions.pokemon_v2_pokemontypes = {
      pokemon_v2_type: {
        name: { _in: selectedTypes }
      }
    };
  }

  // Filter by generation (ID range)
  if (selectedGeneration !== 'All') {
    if (selectedGeneration === 'Unknown') {
      // Unknown generation: Pokemon with ID outside all defined ranges
      // This means ID < 1 or ID > 1025
      conditions._or = [
        { id: { _lt: 1 } },
        { id: { _gt: 1025 } }
      ];
    } else {
      const range = GENERATION_RANGES[selectedGeneration as keyof typeof GENERATION_RANGES];
      if (range) {
        conditions.id = {
          _gte: range.min,
          _lte: range.max
        };
      }
    }
  }

  return conditions;
};

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (params: FetchPokemonListParams = {}) => {
    const {
      page = 0,
      sortBy = 'id-asc',
      selectedTypes = [],
      selectedGeneration = 'All'
    } = params;
    const offset = page * LIMIT;

    const data = await sdk.GetPokemonList({
      limit: LIMIT,
      offset: offset,
      orderBy: getSortOrderBy(sortBy),
      where: buildWhereClause(selectedTypes, selectedGeneration),
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

export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (idOrName: string | number) => {
    let data;

    if (typeof idOrName === 'number') {
      data = await sdk.GetPokemonById({ id: idOrName });
      if (!data.pokemon_v2_pokemon_by_pk) {
        throw new Error('Failed to fetch Pokemon details');
      }
      return transformPokemon(data.pokemon_v2_pokemon_by_pk);
    } else {
      data = await sdk.GetPokemonByName({ name: idOrName.toLowerCase() });
      if (!data.pokemon_v2_pokemon || data.pokemon_v2_pokemon.length === 0) {
        throw new Error('Failed to fetch Pokemon details');
      }
      return transformPokemon(data.pokemon_v2_pokemon[0]);
    }
  }
);

export interface SearchPokemonParams {
  searchTerm: string;
  sortBy?: string;
  selectedTypes?: string[];
  selectedGeneration?: string;
}

export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (params: SearchPokemonParams) => {
    const {
      searchTerm,
      sortBy = 'id-asc',
      selectedTypes = [],
      selectedGeneration = 'All'
    } = params;

    const pattern = `%${searchTerm.toLowerCase()}%`;

    // Combine search with other filters
    const baseWhereClause = buildWhereClause(selectedTypes, selectedGeneration);
    const whereClause = {
      ...baseWhereClause,
      name: { _ilike: pattern }
    };

    const data = await sdk.SearchPokemon({
      orderBy: getSortOrderBy(sortBy),
      where: whereClause
    });

    // Return empty array if no results found (don't throw error)
    if (!data.pokemon_v2_pokemon || data.pokemon_v2_pokemon.length === 0) {
      return [];
    }

    return data.pokemon_v2_pokemon.map(transformPokemon);
  }
);

export const fetchAllTypes = createAsyncThunk(
  'pokemon/fetchAllTypes',
  async () => {
    const data = await sdk.GetAllTypes();
    return data.pokemon_v2_type.map((type) => type.name).filter((name): name is string => !!name);
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
  availableTypes: [],
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

    builder
      .addCase(fetchAllTypes.fulfilled, (state, action) => {
        state.availableTypes = action.payload;
      });
  },
});

export const { clearError, clearSelectedPokemon, setPage, resetPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;

