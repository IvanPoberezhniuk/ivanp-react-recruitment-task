export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default: string;
    front_shiny?: string;
    back_default?: string;
    back_shiny?: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
        front_shiny?: string;
      };
      'dream_world'?: {
        front_default: string;
      };
      'home'?: {
        front_default: string;
        front_shiny?: string;
      };
      'showdown'?: {
        front_default: string;
        back_default?: string;
      };
    };
    versions?: {
      [generation: string]: {
        [game: string]: {
          front_default?: string;
          front_shiny?: string;
          animated?: {
            front_default?: string;
            front_shiny?: string;
          };
        };
      };
    };
  };
  types?: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  height?: number;
  weight?: number;
  abilities?: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats?: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  base_experience?: number;
  moves?: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  game_indices?: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items?: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  forms?: Array<{
    name: string;
    url: string;
  }>;
  species?: {
    name: string;
    url: string;
  };
  cries?: {
    latest: string;
    legacy: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

