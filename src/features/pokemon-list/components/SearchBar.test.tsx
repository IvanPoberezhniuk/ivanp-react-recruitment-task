import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
  };

  it('renders search input field', () => {
    render(<SearchBar {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search Pokémon by name...');
    expect(searchInput).toBeInTheDocument();
  });

  it('displays search term value', () => {
    render(<SearchBar {...defaultProps} searchTerm="pikachu" />);
    
    const searchInput = screen.getByPlaceholderText('Search Pokémon by name...');
    expect(searchInput).toHaveValue('pikachu');
  });

  it('calls onSearchChange when typing', () => {
    const handleSearchChange = vi.fn();
    render(<SearchBar {...defaultProps} onSearchChange={handleSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search Pokémon by name...');
    fireEvent.change(searchInput, { target: { value: 'charizard' } });
    
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });

  it('renders with correct placeholder', () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search Pokémon by name...');
    expect(searchInput).toBeInTheDocument();
  });
});

