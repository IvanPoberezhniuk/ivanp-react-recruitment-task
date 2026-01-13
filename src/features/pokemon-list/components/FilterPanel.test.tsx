import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPanel } from './FilterPanel';

describe('FilterPanel', () => {
  const defaultProps = {
    activeFilterCount: 0,
    selectedTypes: [],
    onTypeToggle: vi.fn(),
    availableTypes: ['grass', 'fire', 'water', 'electric', 'psychic'],
    selectedGeneration: 'All',
    onGenerationChange: vi.fn(),
    sortBy: 'id-asc',
    onSortChange: vi.fn(),
    onClearFilters: vi.fn(),
    viewMode: 'grid' as const,
    onViewModeChange: vi.fn(),
  };

  it('renders generation dropdown', () => {
    render(<FilterPanel {...defaultProps} />);

    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('renders sort dropdown', () => {
    render(<FilterPanel {...defaultProps} />);

    expect(screen.getByText('ID (Low to High)')).toBeInTheDocument();
  });

  it('renders all available type chips', () => {
    render(<FilterPanel {...defaultProps} />);

    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('water')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('psychic')).toBeInTheDocument();
  });

  it('calls onTypeToggle when clicking a type chip', () => {
    const handleTypeToggle = vi.fn();
    render(<FilterPanel {...defaultProps} onTypeToggle={handleTypeToggle} />);

    const grassChip = screen.getByText('grass');
    fireEvent.click(grassChip);

    expect(handleTypeToggle).toHaveBeenCalledWith('grass');
  });

  it('highlights selected types', () => {
    render(<FilterPanel {...defaultProps} selectedTypes={['fire', 'water']} />);

    const fireChip = screen.getByText('fire').closest('.MuiChip-root');
    const waterChip = screen.getByText('water').closest('.MuiChip-root');

    expect(fireChip).toBeInTheDocument();
    expect(waterChip).toBeInTheDocument();
  });

  it('shows Clear All button', () => {
    render(<FilterPanel {...defaultProps} />);

    expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
  });

  it('calls onClearFilters when clicking Clear All', () => {
    const handleClearFilters = vi.fn();
    render(<FilterPanel {...defaultProps} onClearFilters={handleClearFilters} />);

    const clearButton = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(clearButton);

    expect(handleClearFilters).toHaveBeenCalledTimes(1);
  });

  it('calls onGenerationChange when selecting a generation', () => {
    const handleGenerationChange = vi.fn();
    render(<FilterPanel {...defaultProps} onGenerationChange={handleGenerationChange} />);

    const generationSelect = screen.getByText('All');
    fireEvent.mouseDown(generationSelect);

    const genIOption = screen.getByRole('option', { name: /gen i$/i });
    fireEvent.click(genIOption);

    expect(handleGenerationChange).toHaveBeenCalledWith('Gen I');
  });

  it('calls onSortChange when selecting a sort option', () => {
    const handleSortChange = vi.fn();
    render(<FilterPanel {...defaultProps} onSortChange={handleSortChange} />);

    const sortSelect = screen.getByText('ID (Low to High)');
    fireEvent.mouseDown(sortSelect);

    const nameOption = screen.getByRole('option', { name: /name \(a-z\)/i });
    fireEvent.click(nameOption);

    expect(handleSortChange).toHaveBeenCalledWith('name-asc');
  });

  it('renders view mode toggle buttons', () => {
    render(<FilterPanel {...defaultProps} />);

    const gridButton = screen.getByRole('button', { name: /grid view/i });
    const listButton = screen.getByRole('button', { name: /list view/i });

    expect(gridButton).toBeInTheDocument();
    expect(listButton).toBeInTheDocument();
  });

  it('calls onViewModeChange when clicking view mode button', () => {
    const handleViewModeChange = vi.fn();
    render(<FilterPanel {...defaultProps} viewMode="grid" onViewModeChange={handleViewModeChange} />);

    const listButton = screen.getByRole('button', { name: /list view/i });
    fireEvent.click(listButton);

    expect(handleViewModeChange).toHaveBeenCalledWith('list');
  });
});

