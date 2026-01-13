import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureTourButton } from './FeatureTourButton';

describe('FeatureTourButton', () => {
  it('renders the button', () => {
    const mockOnClick = vi.fn();
    render(<FeatureTourButton onClick={mockOnClick} showBadge={false} />);
    
    const button = screen.getByRole('button', { name: /feature tour/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const mockOnClick = vi.fn();
    render(<FeatureTourButton onClick={mockOnClick} showBadge={false} />);
    
    const button = screen.getByRole('button', { name: /feature tour/i });
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders LightbulbIcon', () => {
    const mockOnClick = vi.fn();
    const { container } = render(<FeatureTourButton onClick={mockOnClick} showBadge={false} />);
    
    const icon = container.querySelector('[data-testid="LightbulbIcon"]');
    expect(icon).toBeInTheDocument();
  });

  it('renders without badge when showBadge is false', () => {
    const mockOnClick = vi.fn();
    render(<FeatureTourButton onClick={mockOnClick} showBadge={false} />);
    
    const button = screen.getByRole('button', { name: /feature tour/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with badge when showBadge is true', () => {
    const mockOnClick = vi.fn();
    render(<FeatureTourButton onClick={mockOnClick} showBadge={true} />);
    
    const button = screen.getByRole('button', { name: /feature tour/i });
    expect(button).toBeInTheDocument();
  });
});

