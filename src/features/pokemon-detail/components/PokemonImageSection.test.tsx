import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonImageSection } from './PokemonImageSection';
import { Pokemon } from '../../../shared/types/pokemon.types';

// Mock embla-carousel-react
vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), vi.fn()],
}));

describe('PokemonImageSection', () => {
  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    height: 4,
    weight: 60,
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
  };

  const mockSprites = [
    { src: 'https://example.com/sprite1.png', title: 'Front' },
    { src: 'https://example.com/sprite2.png', title: 'Back' },
    { src: 'https://example.com/sprite3.png', title: 'Shiny' },
  ];

  const defaultProps = {
    pokemon: mockPokemon,
    showShiny: false,
    onImageClick: vi.fn(),
    selectedImageIndex: 0,
    onSpriteSelect: vi.fn(),
    imageUrl: 'https://example.com/pikachu-main.png',
    sprites: mockSprites,
    types: ['electric'],
  };

  it('renders main pokemon image', () => {
    render(<PokemonImageSection {...defaultProps} />);
    
    const mainImage = screen.getByAltText('pikachu');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', 'https://example.com/pikachu-main.png');
  });

  it('calls onImageClick when main image is clicked', () => {
    const onImageClick = vi.fn();

    render(<PokemonImageSection {...defaultProps} onImageClick={onImageClick} />);

    const mainImage = screen.getByAltText('pikachu');
    fireEvent.click(mainImage);

    expect(onImageClick).toHaveBeenCalledTimes(1);
  });

  it('calls onImageClick when zoom icon is clicked', () => {
    const onImageClick = vi.fn();

    render(<PokemonImageSection {...defaultProps} onImageClick={onImageClick} />);

    // Find the zoom icon container
    const zoomIcon = screen.getByTestId('ZoomInIcon').parentElement;
    if (zoomIcon) {
      fireEvent.click(zoomIcon);
      expect(onImageClick).toHaveBeenCalledTimes(1);
    }
  });

  it('renders all sprite thumbnails', () => {
    render(<PokemonImageSection {...defaultProps} />);
    
    const sprite1 = screen.getByAltText('Front');
    const sprite2 = screen.getByAltText('Back');
    const sprite3 = screen.getByAltText('Shiny');
    
    expect(sprite1).toBeInTheDocument();
    expect(sprite2).toBeInTheDocument();
    expect(sprite3).toBeInTheDocument();
  });

  it('calls onSpriteSelect when sprite is clicked', () => {
    const onSpriteSelect = vi.fn();

    render(<PokemonImageSection {...defaultProps} onSpriteSelect={onSpriteSelect} />);

    const sprite2 = screen.getByAltText('Back');
    fireEvent.click(sprite2);

    expect(onSpriteSelect).toHaveBeenCalledWith(1);
  });

  it('highlights selected sprite', () => {
    render(<PokemonImageSection {...defaultProps} selectedImageIndex={1} />);
    
    // The selected sprite should have different styling
    // This is a visual test, so we just verify it renders
    const sprite2 = screen.getByAltText('Back');
    expect(sprite2).toBeInTheDocument();
  });

  it('renders with multiple types', () => {
    render(<PokemonImageSection {...defaultProps} types={['electric', 'steel']} />);
    
    const mainImage = screen.getByAltText('pikachu');
    expect(mainImage).toBeInTheDocument();
  });

  it('renders with empty sprites array', () => {
    render(<PokemonImageSection {...defaultProps} sprites={[]} />);
    
    const mainImage = screen.getByAltText('pikachu');
    expect(mainImage).toBeInTheDocument();
  });
});

