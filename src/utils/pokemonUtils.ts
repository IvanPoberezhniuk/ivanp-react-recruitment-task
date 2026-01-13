import { Pokemon } from "../types/pokemon.types";

// Generation ranges based on National Pokedex numbers
export const GENERATION_RANGES = {
  "Gen I": { min: 1, max: 151, label: "Gen I" },
  "Gen II": { min: 152, max: 251, label: "Gen II" },
  "Gen III": { min: 252, max: 386, label: "Gen III" },
  "Gen IV": { min: 387, max: 493, label: "Gen IV" },
  "Gen V": { min: 494, max: 649, label: "Gen V" },
  "Gen VI": { min: 650, max: 721, label: "Gen VI" },
  "Gen VII": { min: 722, max: 809, label: "Gen VII" },
  "Gen VIII": { min: 810, max: 905, label: "Gen VIII" },
  "Gen IX": { min: 906, max: 1025, label: "Gen IX" },
} as const;

export type GenerationKey = keyof typeof GENERATION_RANGES;

/**
 * Get the generation of a Pokemon based on its ID
 */
export const getPokemonGeneration = (pokemonId: number): string => {
  for (const [gen, range] of Object.entries(GENERATION_RANGES)) {
    if (pokemonId >= range.min && pokemonId <= range.max) {
      return gen;
    }
  }
  return "Unknown";
};

/**
 * Get all unique types from a list of Pokemon
 */
export const getAllTypes = (pokemons: Pokemon[]): string[] => {
  const typesSet = new Set<string>();
  pokemons.forEach((pokemon) => {
    pokemon.types?.forEach((type) => {
      typesSet.add(type.type.name);
    });
  });
  return Array.from(typesSet).sort();
};

/**
 * Filter Pokemon by selected types (OR logic - Pokemon has ANY of the selected types)
 */
export const filterByTypes = (
  pokemons: Pokemon[],
  selectedTypes: string[]
): Pokemon[] => {
  if (selectedTypes.length === 0) return pokemons;
  
  return pokemons.filter((pokemon) =>
    pokemon.types?.some((type) => selectedTypes.includes(type.type.name))
  );
};

/**
 * Filter Pokemon by generation
 */
export const filterByGeneration = (
  pokemons: Pokemon[],
  generation: string | null
): Pokemon[] => {
  if (!generation || generation === "All") return pokemons;
  
  const range = GENERATION_RANGES[generation as GenerationKey];
  if (!range) return pokemons;
  
  return pokemons.filter(
    (pokemon) => pokemon.id >= range.min && pokemon.id <= range.max
  );
};

/**
 * Sort Pokemon by different criteria
 */
export const sortPokemon = (
  pokemons: Pokemon[],
  sortBy: string
): Pokemon[] => {
  const sorted = [...pokemons];
  
  switch (sortBy) {
    case "id-asc":
      return sorted.sort((a, b) => a.id - b.id);
    case "id-desc":
      return sorted.sort((a, b) => b.id - a.id);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "height-asc":
      return sorted.sort((a, b) => (a.height || 0) - (b.height || 0));
    case "height-desc":
      return sorted.sort((a, b) => (b.height || 0) - (a.height || 0));
    case "weight-asc":
      return sorted.sort((a, b) => (a.weight || 0) - (b.weight || 0));
    case "weight-desc":
      return sorted.sort((a, b) => (b.weight || 0) - (a.weight || 0));
    default:
      return sorted;
  }
};

/**
 * Apply all filters and sorting to Pokemon list
 */
export const applyFiltersAndSort = (
  pokemons: Pokemon[],
  selectedTypes: string[],
  selectedGeneration: string | null,
  sortBy: string
): Pokemon[] => {
  let filtered = pokemons;
  
  // Apply type filter
  filtered = filterByTypes(filtered, selectedTypes);
  
  // Apply generation filter
  filtered = filterByGeneration(filtered, selectedGeneration);
  
  // Apply sorting
  filtered = sortPokemon(filtered, sortBy);
  
  return filtered;
};

