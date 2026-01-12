import { Pokemon } from "../../../types/pokemon.types";

// Component Props Types

export interface PokemonHeaderProps {
  name: string;
  id: number;
  cryUrl?: string;
  showShiny: boolean;
  onToggleShiny: () => void;
}

export interface PokemonImageSectionProps {
  pokemon: Pokemon;
  showShiny: boolean;
  onImageClick: () => void;
  selectedImageIndex: number;
  onSpriteSelect: (index: number) => void;
  imageUrl: string;
  sprites: SpriteItem[];
  types: string[];
}

export interface PokemonInfoProps {
  types?: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  abilities?: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  baseExperience?: number;
  baseStatTotal: number;
  height?: number;
  weight?: number;
}

export interface BattleStatsProps {
  stats?: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}

export interface LearnableMovesProps {
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
}

export interface GameAppearancesProps {
  gameIndices?: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
}

// Helper Types

export interface SpriteItem {
  src: string;
  title: string;
}

export interface LightboxSlide {
  src: string;
  title?: string;
}

export interface GamesByGeneration {
  [generation: string]: string[];
}

