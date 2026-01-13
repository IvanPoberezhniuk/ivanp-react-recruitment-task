import { describe, it, expect } from 'vitest';
import {
  GENERATION_RANGES,
  getPokemonGeneration,
  getAllTypes,
  filterByTypes,
  filterByGeneration,
  sortPokemon,
  applyFiltersAndSort,
} from './pokemonUtils';
import { Pokemon } from '../types/pokemon.types';

const mockPokemon: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    height: 7,
    weight: 69,
    types: [
      { slot: 1, type: { name: 'grass', url: '' } },
      { slot: 2, type: { name: 'poison', url: '' } },
    ],
  } as Pokemon,
  {
    id: 4,
    name: 'charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
    height: 6,
    weight: 85,
    types: [
      { slot: 1, type: { name: 'fire', url: '' } },
    ],
  } as Pokemon,
  {
    id: 7,
    name: 'squirtle',
    url: 'https://pokeapi.co/api/v2/pokemon/7/',
    height: 5,
    weight: 90,
    types: [
      { slot: 1, type: { name: 'water', url: '' } },
    ],
  } as Pokemon,
  {
    id: 152,
    name: 'chikorita',
    url: 'https://pokeapi.co/api/v2/pokemon/152/',
    height: 9,
    weight: 64,
    types: [
      { slot: 1, type: { name: 'grass', url: '' } },
    ],
  } as Pokemon,
  {
    id: 252,
    name: 'treecko',
    url: 'https://pokeapi.co/api/v2/pokemon/252/',
    height: 5,
    weight: 50,
    types: [
      { slot: 1, type: { name: 'grass', url: '' } },
    ],
  } as Pokemon,
];

describe('pokemonUtils', () => {
  describe('GENERATION_RANGES', () => {
    it('has correct generation ranges', () => {
      expect(GENERATION_RANGES['Gen I']).toEqual({ min: 1, max: 151, label: 'Gen I' });
      expect(GENERATION_RANGES['Gen II']).toEqual({ min: 152, max: 251, label: 'Gen II' });
      expect(GENERATION_RANGES['Gen III']).toEqual({ min: 252, max: 386, label: 'Gen III' });
      expect(GENERATION_RANGES['Gen IX']).toEqual({ min: 906, max: 1025, label: 'Gen IX' });
    });
  });

  describe('getPokemonGeneration', () => {
    it('returns Gen I for Pokemon ID 1', () => {
      expect(getPokemonGeneration(1)).toBe('Gen I');
    });

    it('returns Gen I for Pokemon ID 151', () => {
      expect(getPokemonGeneration(151)).toBe('Gen I');
    });

    it('returns Gen II for Pokemon ID 152', () => {
      expect(getPokemonGeneration(152)).toBe('Gen II');
    });

    it('returns Gen III for Pokemon ID 252', () => {
      expect(getPokemonGeneration(252)).toBe('Gen III');
    });

    it('returns Gen IX for Pokemon ID 1025', () => {
      expect(getPokemonGeneration(1025)).toBe('Gen IX');
    });

    it('returns Unknown for Pokemon ID outside ranges', () => {
      expect(getPokemonGeneration(9999)).toBe('Unknown');
      expect(getPokemonGeneration(0)).toBe('Unknown');
    });
  });

  describe('getAllTypes', () => {
    it('returns all unique types sorted', () => {
      const types = getAllTypes(mockPokemon);
      expect(types).toEqual(['fire', 'grass', 'poison', 'water']);
    });

    it('returns empty array for empty pokemon list', () => {
      expect(getAllTypes([])).toEqual([]);
    });

    it('handles pokemon without types', () => {
      const pokemonWithoutTypes = [{ id: 1, name: 'test', url: '' }] as Pokemon[];
      expect(getAllTypes(pokemonWithoutTypes)).toEqual([]);
    });
  });

  describe('filterByTypes', () => {
    it('returns all pokemon when no types selected', () => {
      const result = filterByTypes(mockPokemon, []);
      expect(result).toEqual(mockPokemon);
    });

    it('filters pokemon by single type', () => {
      const result = filterByTypes(mockPokemon, ['fire']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('charmander');
    });

    it('filters pokemon by multiple types (OR logic)', () => {
      const result = filterByTypes(mockPokemon, ['fire', 'water']);
      expect(result).toHaveLength(2);
      expect(result.map(p => p.name)).toEqual(['charmander', 'squirtle']);
    });

    it('filters pokemon with multiple types', () => {
      const result = filterByTypes(mockPokemon, ['poison']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('bulbasaur');
    });
  });

  describe('filterByGeneration', () => {
    it('returns all pokemon when generation is null', () => {
      const result = filterByGeneration(mockPokemon, null);
      expect(result).toEqual(mockPokemon);
    });

    it('returns all pokemon when generation is "All"', () => {
      const result = filterByGeneration(mockPokemon, 'All');
      expect(result).toEqual(mockPokemon);
    });

    it('filters pokemon by Gen I', () => {
      const result = filterByGeneration(mockPokemon, 'Gen I');
      expect(result).toHaveLength(3);
      expect(result.map(p => p.name)).toEqual(['bulbasaur', 'charmander', 'squirtle']);
    });

    it('filters pokemon by Gen II', () => {
      const result = filterByGeneration(mockPokemon, 'Gen II');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('chikorita');
    });

    it('filters pokemon by Gen III', () => {
      const result = filterByGeneration(mockPokemon, 'Gen III');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('treecko');
    });

    it('filters pokemon by Unknown generation', () => {
      const unknownPokemon = [
        ...mockPokemon,
        { id: 0, name: 'invalid-low', url: '', types: [] } as Pokemon,
        { id: 1026, name: 'invalid-high', url: '', types: [] } as Pokemon,
      ];
      const result = filterByGeneration(unknownPokemon, 'Unknown');
      expect(result).toHaveLength(2);
      expect(result.map(p => p.name)).toEqual(['invalid-low', 'invalid-high']);
    });

    it('returns all pokemon for invalid generation', () => {
      const result = filterByGeneration(mockPokemon, 'Invalid Gen');
      expect(result).toEqual(mockPokemon);
    });
  });

  describe('sortPokemon', () => {
    it('sorts by id ascending', () => {
      const result = sortPokemon(mockPokemon, 'id-asc');
      expect(result[0].id).toBe(1);
      expect(result[result.length - 1].id).toBe(252);
    });

    it('sorts by id descending', () => {
      const result = sortPokemon(mockPokemon, 'id-desc');
      expect(result[0].id).toBe(252);
      expect(result[result.length - 1].id).toBe(1);
    });

    it('sorts by name ascending', () => {
      const result = sortPokemon(mockPokemon, 'name-asc');
      expect(result[0].name).toBe('bulbasaur');
      expect(result[result.length - 1].name).toBe('treecko');
    });

    it('sorts by name descending', () => {
      const result = sortPokemon(mockPokemon, 'name-desc');
      expect(result[0].name).toBe('treecko');
      expect(result[result.length - 1].name).toBe('bulbasaur');
    });

    it('sorts by height ascending', () => {
      const result = sortPokemon(mockPokemon, 'height-asc');
      expect(result[0].height).toBe(5);
      expect(result[result.length - 1].height).toBe(9);
    });

    it('sorts by height descending', () => {
      const result = sortPokemon(mockPokemon, 'height-desc');
      expect(result[0].height).toBe(9);
      expect(result[result.length - 1].height).toBe(5);
    });

    it('sorts by weight ascending', () => {
      const result = sortPokemon(mockPokemon, 'weight-asc');
      expect(result[0].weight).toBe(50);
      expect(result[result.length - 1].weight).toBe(90);
    });

    it('sorts by weight descending', () => {
      const result = sortPokemon(mockPokemon, 'weight-desc');
      expect(result[0].weight).toBe(90);
      expect(result[result.length - 1].weight).toBe(50);
    });

    it('returns original order for unknown sort option', () => {
      const result = sortPokemon(mockPokemon, 'unknown');
      expect(result).toEqual(mockPokemon);
    });

    it('does not mutate original array', () => {
      const original = [...mockPokemon];
      sortPokemon(mockPokemon, 'name-desc');
      expect(mockPokemon).toEqual(original);
    });
  });

  describe('applyFiltersAndSort', () => {
    it('applies all filters and sorting', () => {
      const result = applyFiltersAndSort(mockPokemon, ['grass'], 'Gen I', 'name-asc');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('bulbasaur');
    });

    it('applies type filter only', () => {
      const result = applyFiltersAndSort(mockPokemon, ['fire'], 'All', 'id-asc');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('charmander');
    });

    it('applies generation filter only', () => {
      const result = applyFiltersAndSort(mockPokemon, [], 'Gen II', 'id-asc');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('chikorita');
    });

    it('applies sorting only', () => {
      const result = applyFiltersAndSort(mockPokemon, [], 'All', 'name-desc');
      expect(result[0].name).toBe('treecko');
      expect(result[result.length - 1].name).toBe('bulbasaur');
    });

    it('returns all pokemon with no filters or sorting', () => {
      const result = applyFiltersAndSort(mockPokemon, [], 'All', 'id-asc');
      expect(result).toHaveLength(5);
    });
  });
});

