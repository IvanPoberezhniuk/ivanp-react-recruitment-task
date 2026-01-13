import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonGrid } from './PokemonGrid';
import { Pokemon } from '../../../shared/types/pokemon.types';

describe('PokemonGrid', () => {
  const mockPokemons: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      height: 7,
      weight: 69,
      types: [
        { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
      ],
    },
    {
      id: 4,
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
      height: 6,
      weight: 85,
      types: [
        { slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' } },
      ],
    },
    {
      id: 7,
      name: 'squirtle',
      url: 'https://pokeapi.co/api/v2/pokemon/7/',
      height: 5,
      weight: 90,
      types: [
        { slot: 1, type: { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' } },
      ],
    },
  ];

  const defaultProps = {
    pokemons: mockPokemons,
    viewMode: 'grid' as const,
    onPokemonClick: vi.fn(),
  };

  it('renders all pokemon in grid mode', () => {
    render(<PokemonGrid {...defaultProps} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('renders all pokemon in list mode', () => {
    render(<PokemonGrid {...defaultProps} viewMode="list" />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
  });

  it('renders correct number of pokemon', () => {
    render(<PokemonGrid {...defaultProps} />);
    
    const pokemonCards = screen.getAllByRole('button');
    expect(pokemonCards).toHaveLength(3);
  });

  it('renders empty when no pokemon provided', () => {
    render(<PokemonGrid {...defaultProps} pokemons={[]} />);
    
    const pokemonCards = screen.queryAllByRole('button');
    expect(pokemonCards).toHaveLength(0);
  });

  it('calls onPokemonClick when clicking a pokemon in grid mode', () => {
    const handleClick = vi.fn();
    render(<PokemonGrid {...defaultProps} onPokemonClick={handleClick} />);
    
    const bulbasaurCard = screen.getByText('bulbasaur').closest('button');
    if (bulbasaurCard) {
      fireEvent.click(bulbasaurCard);
    }
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockPokemons[0]);
  });

  it('calls onPokemonClick when clicking a pokemon in list mode', () => {
    const handleClick = vi.fn();
    render(<PokemonGrid {...defaultProps} viewMode="list" onPokemonClick={handleClick} />);
    
    const charmanderCard = screen.getByText('charmander').closest('button');
    if (charmanderCard) {
      fireEvent.click(charmanderCard);
    }
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockPokemons[1]);
  });

  it('renders pokemon with unique keys', () => {
    const { container } = render(<PokemonGrid {...defaultProps} />);
    
    const boxes = container.querySelectorAll('[class*="MuiBox-root"]');
    expect(boxes.length).toBeGreaterThan(0);
  });

  it('switches between grid and list view modes', () => {
    const { rerender } = render(<PokemonGrid {...defaultProps} viewMode="grid" />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    
    rerender(<PokemonGrid {...defaultProps} viewMode="list" />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders single pokemon correctly', () => {
    const singlePokemon = [mockPokemons[0]];
    render(<PokemonGrid {...defaultProps} pokemons={singlePokemon} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.queryByText('charmander')).not.toBeInTheDocument();
  });

  it('handles large number of pokemon', () => {
    const manyPokemons = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `pokemon-${i + 1}`,
      url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
      height: 10,
      weight: 100,
    }));
    
    render(<PokemonGrid {...defaultProps} pokemons={manyPokemons} />);
    
    const pokemonCards = screen.getAllByRole('button');
    expect(pokemonCards).toHaveLength(20);
  });
});

