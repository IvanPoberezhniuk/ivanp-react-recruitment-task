import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonCardList } from './PokemonCardList';
import { Pokemon } from '../../shared/types/pokemon.types';

describe('PokemonCardList', () => {
  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    height: 4,
    weight: 60,
    sprites: {
      front_default: 'https://example.com/pikachu.png',
      other: {
        'official-artwork': {
          front_default: 'https://example.com/pikachu-official.png',
        },
      },
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'https://pokeapi.co/api/v2/type/13/',
        },
      },
    ],
  };

  it('renders pokemon name', () => {
    render(<PokemonCardList pokemon={mockPokemon} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('renders pokemon ID with leading zeros', () => {
    render(<PokemonCardList pokemon={mockPokemon} />);
    
    expect(screen.getByText('#025')).toBeInTheDocument();
  });

  it('renders pokemon image with alt text', () => {
    render(<PokemonCardList pokemon={mockPokemon} />);
    
    const image = screen.getByAltText('pikachu');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/pikachu-official.png');
  });

  it('uses fallback image when sprites not available', () => {
    const pokemonWithoutSprites = { ...mockPokemon, sprites: undefined };
    render(<PokemonCardList pokemon={pokemonWithoutSprites} />);
    
    const image = screen.getByAltText('pikachu');
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });

  it('renders pokemon types as chips', () => {
    render(<PokemonCardList pokemon={mockPokemon} />);
    
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  it('renders multiple types', () => {
    const multiTypePokemon: Pokemon = {
      ...mockPokemon,
      types: [
        { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
        { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } },
      ],
    };
    
    render(<PokemonCardList pokemon={multiTypePokemon} />);
    
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('does not render types section when no types', () => {
    const noTypesPokemon = { ...mockPokemon, types: undefined };
    render(<PokemonCardList pokemon={noTypesPokemon} />);
    
    expect(screen.queryByText('electric')).not.toBeInTheDocument();
  });

  it('renders generation', () => {
    render(<PokemonCardList pokemon={mockPokemon} />);

    expect(screen.getByText('Gen')).toBeInTheDocument();
    expect(screen.getByText('Gen I')).toBeInTheDocument();
  });

  it('renders height in meters', () => {
    render(<PokemonCardList pokemon={mockPokemon} />);
    
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('0.4 m')).toBeInTheDocument();
  });

  it('renders weight in kilograms', () => {
    render(<PokemonCardList pokemon={mockPokemon} />);
    
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('6.0 kg')).toBeInTheDocument();
  });

  it('does not render height when not provided', () => {
    const noHeightPokemon = { ...mockPokemon, height: undefined };
    render(<PokemonCardList pokemon={noHeightPokemon} />);
    
    expect(screen.queryByText('Height')).not.toBeInTheDocument();
  });

  it('does not render weight when not provided', () => {
    const noWeightPokemon = { ...mockPokemon, weight: undefined };
    render(<PokemonCardList pokemon={noWeightPokemon} />);
    
    expect(screen.queryByText('Weight')).not.toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = vi.fn();
    render(<PokemonCardList pokemon={mockPokemon} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockPokemon);
  });

  it('does not call onClick when not provided', () => {
    render(<PokemonCardList pokemon={mockPokemon} />);

    const card = screen.getByRole('button');
    expect(card).toBeDisabled();
  });

  it('renders in horizontal layout', () => {
    const { container } = render(<PokemonCardList pokemon={mockPokemon} />);
    
    const card = container.querySelector('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });
});

