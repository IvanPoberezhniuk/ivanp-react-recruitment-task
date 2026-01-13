import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PokemonInfo } from './PokemonInfo';

describe('PokemonInfo', () => {
  const defaultProps = {
    types: [
      { slot: 1, type: { name: 'electric', url: 'https://example.com/electric' } },
    ],
    abilities: [
      { ability: { name: 'static', url: 'https://example.com/static' }, is_hidden: false, slot: 1 },
      { ability: { name: 'lightning-rod', url: 'https://example.com/lightning-rod' }, is_hidden: true, slot: 3 },
    ],
    baseExperience: 112,
    baseStatTotal: 320,
    height: 4,
    weight: 60,
  };

  it('renders section title', () => {
    render(<PokemonInfo {...defaultProps} />);
    
    expect(screen.getByText('Pokemon Info')).toBeInTheDocument();
  });

  it('renders pokemon types', () => {
    render(<PokemonInfo {...defaultProps} />);
    
    expect(screen.getByText('Types:')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  it('renders multiple types', () => {
    const props = {
      ...defaultProps,
      types: [
        { slot: 1, type: { name: 'electric', url: 'https://example.com/electric' } },
        { slot: 2, type: { name: 'steel', url: 'https://example.com/steel' } },
      ],
    };
    
    render(<PokemonInfo {...props} />);
    
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('steel')).toBeInTheDocument();
  });

  it('renders abilities', () => {
    render(<PokemonInfo {...defaultProps} />);
    
    expect(screen.getByText('Abilities:')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning rod')).toBeInTheDocument();
  });

  it('displays hidden ability with special styling', () => {
    render(<PokemonInfo {...defaultProps} />);
    
    const hiddenAbility = screen.getByText('lightning rod');
    expect(hiddenAbility).toBeInTheDocument();
    // Hidden abilities should have an icon
    expect(screen.getByTestId('AutoAwesomeIcon')).toBeInTheDocument();
  });

  it('renders base experience', () => {
    render(<PokemonInfo {...defaultProps} />);
    
    expect(screen.getByText('XP:')).toBeInTheDocument();
    expect(screen.getByText('112')).toBeInTheDocument();
  });

  it('renders base stat total', () => {
    render(<PokemonInfo {...defaultProps} />);
    
    expect(screen.getByText('BST:')).toBeInTheDocument();
    expect(screen.getByText('320')).toBeInTheDocument();
  });

  it('renders height in meters', () => {
    render(<PokemonInfo {...defaultProps} />);
    
    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText('0.4 m')).toBeInTheDocument();
  });

  it('renders weight in kilograms', () => {
    render(<PokemonInfo {...defaultProps} />);
    
    expect(screen.getByText('Weight:')).toBeInTheDocument();
    expect(screen.getByText('6.0 kg')).toBeInTheDocument();
  });

  it('does not render types when not provided', () => {
    const props = { ...defaultProps, types: undefined };
    render(<PokemonInfo {...props} />);
    
    expect(screen.queryByText('Types:')).not.toBeInTheDocument();
  });

  it('does not render abilities when not provided', () => {
    const props = { ...defaultProps, abilities: undefined };
    render(<PokemonInfo {...props} />);
    
    expect(screen.queryByText('Abilities:')).not.toBeInTheDocument();
  });

  it('does not render base experience when not provided', () => {
    const props = { ...defaultProps, baseExperience: undefined };
    render(<PokemonInfo {...props} />);
    
    expect(screen.queryByText('XP:')).not.toBeInTheDocument();
  });

  it('does not render height when not provided', () => {
    const props = { ...defaultProps, height: undefined };
    render(<PokemonInfo {...props} />);
    
    expect(screen.queryByText('Height:')).not.toBeInTheDocument();
  });

  it('does not render weight when not provided', () => {
    const props = { ...defaultProps, weight: undefined };
    render(<PokemonInfo {...props} />);
    
    expect(screen.queryByText('Weight:')).not.toBeInTheDocument();
  });

  it('renders with minimal props', () => {
    const minimalProps = {
      baseStatTotal: 320,
    };
    
    render(<PokemonInfo {...minimalProps} />);
    
    expect(screen.getByText('Pokemon Info')).toBeInTheDocument();
    expect(screen.getByText('BST:')).toBeInTheDocument();
  });
});

