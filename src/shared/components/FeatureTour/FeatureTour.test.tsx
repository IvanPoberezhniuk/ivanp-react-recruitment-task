import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureTour } from './FeatureTour';

// Mock the useFeatureTour hook
const mockToggleTour = vi.fn();
const mockCloseTour = vi.fn();

vi.mock('../../hooks/useFeatureTour', () => ({
  useFeatureTour: () => ({
    isOpen: false,
    hasSeenTour: true,
    toggleTour: mockToggleTour,
    closeTour: mockCloseTour,
  }),
}));

describe('FeatureTour', () => {
  beforeEach(() => {
    mockToggleTour.mockClear();
    mockCloseTour.mockClear();
  });

  it('renders FeatureTourButton', () => {
    render(<FeatureTour />);
    
    const button = screen.getByRole('button', { name: /feature tour/i });
    expect(button).toBeInTheDocument();
  });

  it('renders FeatureList', () => {
    render(<FeatureTour />);
    
    // FeatureList is rendered but collapsed when isOpen is false
    const container = document.querySelector('.MuiCollapse-root');
    expect(container).toBeInTheDocument();
  });
});

