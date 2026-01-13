import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Footer } from './Footer';
import snackbarReducer from '../../../store/slices/snackbarSlice';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createMockStore = () => {
  return configureStore({
    reducer: {
      snackbar: snackbarReducer,
    },
  });
};

const renderWithProviders = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

describe('Footer', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders footer sections', () => {
    renderWithProviders();
    
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Built With')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders();
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Highlights')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('navigates to home when Home link is clicked', () => {
    renderWithProviders();
    
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to highlights when Highlights link is clicked', () => {
    renderWithProviders();
    
    const highlightsLink = screen.getByText('Highlights');
    fireEvent.click(highlightsLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/highlights');
  });

  it('renders external resource links', () => {
    renderWithProviders();
    
    const pokeApiLink = screen.getByText('PokéAPI');
    const githubLink = screen.getByText('GitHub');
    
    expect(pokeApiLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    
    expect(pokeApiLink.closest('a')).toHaveAttribute('href', 'https://pokeapi.co/');
    expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/PokeAPI/pokeapi');
  });

  it('renders tech stack information', () => {
    renderWithProviders();
    
    expect(screen.getByText(/React • Redux Toolkit/i)).toBeInTheDocument();
    expect(screen.getByText(/Material-UI • GraphQL/i)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript • React Router/i)).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    renderWithProviders();
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Pokédex`))).toBeInTheDocument();
  });

  it('renders test notification buttons', () => {
    renderWithProviders();
    
    expect(screen.getByRole('button', { name: /test stack x3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /test long text/i })).toBeInTheDocument();
  });

  it('renders trademark notice', () => {
    renderWithProviders();
    
    expect(screen.getByText(/Pokémon and Pokémon character names are trademarks of Nintendo/i)).toBeInTheDocument();
  });

  it('renders icons', () => {
    const { container } = renderWithProviders();
    
    expect(container.querySelector('[data-testid="HomeIcon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="InfoIcon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="ApiIcon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="GitHubIcon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="FavoriteIcon"]')).toBeInTheDocument();
  });

  it('external links have correct attributes', () => {
    renderWithProviders();
    
    const pokeApiLink = screen.getByText('PokéAPI').closest('a');
    const githubLink = screen.getByText('GitHub').closest('a');
    
    expect(pokeApiLink).toHaveAttribute('target', '_blank');
    expect(pokeApiLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

