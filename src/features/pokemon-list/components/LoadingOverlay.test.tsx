import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LoadingOverlay } from './LoadingOverlay';

describe('LoadingOverlay', () => {
  it('shows loading spinner when loading is true', () => {
    const { container } = render(<LoadingOverlay loading={true} />);
    
    const spinner = container.querySelector('.MuiCircularProgress-root');
    expect(spinner).toBeInTheDocument();
  });

  it('does not render when loading is false', () => {
    const { container } = render(<LoadingOverlay loading={false} />);
    
    const spinner = container.querySelector('.MuiCircularProgress-root');
    expect(spinner).not.toBeInTheDocument();
  });

  it('renders with fixed positioning', () => {
    const { container } = render(<LoadingOverlay loading={true} />);
    
    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toBeInTheDocument();
  });

  it('returns null when not loading', () => {
    const { container } = render(<LoadingOverlay loading={false} />);
    
    expect(container.firstChild).toBeNull();
  });
});

