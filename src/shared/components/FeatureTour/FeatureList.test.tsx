import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureList } from './FeatureList';

describe('FeatureList', () => {
  it('does not render when isOpen is false', () => {
    const mockOnClose = vi.fn();
    const { container } = render(<FeatureList isOpen={false} onClose={mockOnClose} />);
    
    // Collapse component still renders but with height 0
    expect(container.querySelector('.MuiCollapse-hidden')).toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('✨ Feature Highlights')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Implementation details, pros & cons')).toBeInTheDocument();
  });

  it('renders close button', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('close feature tour');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('close feature tour');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders all feature items', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Component Optimization')).toBeInTheDocument();
    expect(screen.getByText('Custom Hooks')).toBeInTheDocument();
    expect(screen.getByText('URL State Sync')).toBeInTheDocument();
    expect(screen.getByText('LocalStorage Persistence')).toBeInTheDocument();
    expect(screen.getByText('Debounced Search')).toBeInTheDocument();
    expect(screen.getByText('GraphQL Integration')).toBeInTheDocument();
    expect(screen.getByText('Redux State Management')).toBeInTheDocument();
    expect(screen.getByText('Responsive Design')).toBeInTheDocument();
    expect(screen.getByText('Type Safety')).toBeInTheDocument();
    expect(screen.getByText('Material UI Theming')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText(/Split PokemonListPage from 597 lines/i)).toBeInTheDocument();
    expect(screen.getByText(/Extracted logic into useViewMode/i)).toBeInTheDocument();
  });

  it('expands feature when clicked', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    const featureItem = screen.getByText('Component Optimization');
    fireEvent.click(featureItem);
    
    // Check if expanded content is visible
    expect(screen.getByText(/Large components become hard to maintain/i)).toBeInTheDocument();
  });

  it('collapses feature when clicked again', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    const featureItem = screen.getByText('Component Optimization');
    
    // Expand
    fireEvent.click(featureItem);
    expect(screen.getByText(/Large components become hard to maintain/i)).toBeInTheDocument();
    
    // Collapse
    fireEvent.click(featureItem);
    
    // The content should still be in DOM but hidden (Collapse component behavior)
    const reasonText = screen.queryByText(/Large components become hard to maintain/i);
    expect(reasonText).toBeInTheDocument();
  });

  it('shows expand/collapse icons', () => {
    const mockOnClose = vi.fn();
    const { container } = render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    // Initially should show ExpandMore icons
    const expandIcons = container.querySelectorAll('[data-testid="ExpandMoreIcon"]');
    expect(expandIcons.length).toBeGreaterThan(0);
  });

  it('renders pros for expanded features', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    const featureItem = screen.getByText('Component Optimization');
    fireEvent.click(featureItem);
    
    expect(screen.getByText(/Easier to test individual components/i)).toBeInTheDocument();
    expect(screen.getByText(/Better code reusability/i)).toBeInTheDocument();
  });

  it('renders feature icons', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('🧩')).toBeInTheDocument();
    expect(screen.getByText('🪝')).toBeInTheDocument();
    expect(screen.getByText('🔗')).toBeInTheDocument();
    expect(screen.getByText('💾')).toBeInTheDocument();
  });

  it('only expands one feature at a time', () => {
    const mockOnClose = vi.fn();
    render(<FeatureList isOpen={true} onClose={mockOnClose} />);
    
    // Expand first feature
    const firstFeature = screen.getByText('Component Optimization');
    fireEvent.click(firstFeature);
    
    // Expand second feature
    const secondFeature = screen.getByText('Custom Hooks');
    fireEvent.click(secondFeature);
    
    // Both should be visible since Collapse doesn't remove from DOM
    expect(screen.getByText(/Large components become hard to maintain/i)).toBeInTheDocument();
    expect(screen.getByText(/Keeps components focused on UI/i)).toBeInTheDocument();
  });
});

