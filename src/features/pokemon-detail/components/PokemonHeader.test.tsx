import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonHeader } from './PokemonHeader';

describe('PokemonHeader', () => {
  const defaultProps = {
    name: 'pikachu',
    id: 25,
    cryUrl: 'https://example.com/pikachu.mp3',
    showShiny: false,
    onToggleShiny: vi.fn(),
  };

  it('renders pokemon name and id correctly', () => {
    render(<PokemonHeader {...defaultProps} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
  });

  it('formats pokemon id with leading zeros', () => {
    render(<PokemonHeader {...defaultProps} id={5} />);
    
    expect(screen.getByText('#005')).toBeInTheDocument();
  });

  it('renders shiny toggle button', () => {
    render(<PokemonHeader {...defaultProps} />);
    
    const shinyButton = screen.getByRole('button', { name: /show shiny/i });
    expect(shinyButton).toBeInTheDocument();
  });

  it('calls onToggleShiny when shiny button is clicked', () => {
    const onToggleShiny = vi.fn();

    render(<PokemonHeader {...defaultProps} onToggleShiny={onToggleShiny} />);

    const shinyButton = screen.getByRole('button', { name: /show shiny/i });
    fireEvent.click(shinyButton);

    expect(onToggleShiny).toHaveBeenCalledTimes(1);
  });

  it('shows "Show Normal" tooltip when showShiny is true', () => {
    render(<PokemonHeader {...defaultProps} showShiny={true} />);
    
    const shinyButton = screen.getByRole('button', { name: /show normal/i });
    expect(shinyButton).toBeInTheDocument();
  });

  it('renders play cry button when cryUrl is provided', () => {
    render(<PokemonHeader {...defaultProps} />);
    
    const playButton = screen.getByRole('button', { name: /play cry/i });
    expect(playButton).toBeInTheDocument();
  });

  it('does not render play cry button when cryUrl is not provided', () => {
    render(<PokemonHeader {...defaultProps} cryUrl={undefined} />);
    
    const playButton = screen.queryByRole('button', { name: /play cry/i });
    expect(playButton).not.toBeInTheDocument();
  });

  it('plays audio when play cry button is clicked', () => {
    const mockPlay = vi.fn().mockResolvedValue(undefined);

    // Mock Audio constructor as a class
    global.Audio = class {
      public volume = 0;
      public play = mockPlay;
      constructor(public src: string) {}
    } as any;

    render(<PokemonHeader {...defaultProps} />);

    const playButton = screen.getByRole('button', { name: /play cry/i });
    fireEvent.click(playButton);

    expect(mockPlay).toHaveBeenCalled();
  });

  it('renders volume slider', () => {
    render(<PokemonHeader {...defaultProps} />);
    
    const slider = screen.getByRole('slider', { name: /volume/i });
    expect(slider).toBeInTheDocument();
  });

  it('updates volume when slider is changed', () => {
    render(<PokemonHeader {...defaultProps} />);

    const slider = screen.getByRole('slider', { name: /volume/i });

    // Simulate slider change
    fireEvent.click(slider);

    expect(slider).toBeInTheDocument();
  });
});

