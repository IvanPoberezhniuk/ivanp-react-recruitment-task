import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NoResults } from './NoResults';

describe('NoResults', () => {
  it('displays default message when no search term provided', () => {
    render(<NoResults />);
    
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
  });

  it('displays search term in message when provided', () => {
    render(<NoResults searchTerm="pikachu" />);
    
    expect(screen.getByText('No Pokémon found matching "pikachu"')).toBeInTheDocument();
  });

  it('displays message with empty search term', () => {
    render(<NoResults searchTerm="" />);
    
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
  });

  it('renders with correct typography variant', () => {
    render(<NoResults searchTerm="charizard" />);
    
    const heading = screen.getByText(/No Pokémon found/);
    expect(heading.tagName).toBe('H6');
  });

  it('displays different search terms correctly', () => {
    const { rerender } = render(<NoResults searchTerm="bulbasaur" />);
    expect(screen.getByText('No Pokémon found matching "bulbasaur"')).toBeInTheDocument();
    
    rerender(<NoResults searchTerm="mewtwo" />);
    expect(screen.getByText('No Pokémon found matching "mewtwo"')).toBeInTheDocument();
  });
});

