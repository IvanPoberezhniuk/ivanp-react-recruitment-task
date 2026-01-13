import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (initialPath = '/') => {
  window.history.pushState({}, '', initialPath);
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the logo and title', () => {
    renderWithRouter();
    
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter();
    
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /highlights/i })).toBeInTheDocument();
  });

  it('navigates to home when logo is clicked', () => {
    renderWithRouter();
    
    const logo = screen.getByText('Pokédex');
    fireEvent.click(logo);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to home when Home button is clicked', () => {
    renderWithRouter();
    
    const homeButton = screen.getByRole('button', { name: /home/i });
    fireEvent.click(homeButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to highlights when Highlights button is clicked', () => {
    renderWithRouter();
    
    const highlightsButton = screen.getByRole('button', { name: /highlights/i });
    fireEvent.click(highlightsButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/highlights');
  });

  it('renders mobile menu button', () => {
    renderWithRouter();
    
    const menuButton = screen.getByLabelText('menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile drawer when menu button is clicked', () => {
    renderWithRouter();
    
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);
    
    // Check if drawer items are visible
    const drawerItems = screen.getAllByText(/home/i);
    expect(drawerItems.length).toBeGreaterThan(1); // One in desktop nav, one in drawer
  });

  it('closes mobile drawer when Home is clicked in drawer', () => {
    renderWithRouter();
    
    // Open drawer
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);
    
    // Click Home in drawer (get the last one which is in the drawer)
    const drawerHomeButtons = screen.getAllByText(/home/i);
    const drawerHomeButton = drawerHomeButtons[drawerHomeButtons.length - 1];
    fireEvent.click(drawerHomeButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('closes mobile drawer when Highlights is clicked in drawer', () => {
    renderWithRouter();
    
    // Open drawer
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);
    
    // Click Highlights in drawer
    const drawerHighlightsButtons = screen.getAllByText(/highlights/i);
    const drawerHighlightsButton = drawerHighlightsButtons[drawerHighlightsButtons.length - 1];
    fireEvent.click(drawerHighlightsButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/highlights');
  });

  it('renders CatchingPokemon icon', () => {
    const { container } = renderWithRouter();
    
    const icon = container.querySelector('[data-testid="CatchingPokemonIcon"]');
    expect(icon).toBeInTheDocument();
  });

  it('renders menu icon', () => {
    const { container } = renderWithRouter();
    
    const menuIcon = container.querySelector('[data-testid="MenuIcon"]');
    expect(menuIcon).toBeInTheDocument();
  });
});

