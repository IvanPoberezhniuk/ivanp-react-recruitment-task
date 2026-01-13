import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { snackbarMiddleware } from './snackbarMiddleware';
import pokemonReducer, {
  fetchPokemonList,
  fetchPokemonById,
  searchPokemon,
} from '../slices/pokemonSlice';
import snackbarReducer, { showSnackbar } from '../slices/snackbarSlice';

// Mock the graphqlClient
vi.mock('../../services/graphqlClient', () => ({
  graphqlClient: {},
}));

// Mock the generated GraphQL SDK
vi.mock('../../generated/graphql', () => ({
  getSdk: () => ({
    GetPokemonList: vi.fn().mockRejectedValue(new Error('Network error')),
    GetPokemonById: vi.fn().mockRejectedValue(new Error('Pokemon not found')),
    GetPokemonByName: vi.fn().mockRejectedValue(new Error('Pokemon not found')),
    SearchPokemon: vi.fn().mockRejectedValue(new Error('Search failed')),
  }),
  Order_By: {
    Asc: 'asc',
    Desc: 'desc',
  },
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      pokemon: pokemonReducer,
      snackbar: snackbarReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(snackbarMiddleware.middleware),
  });
};

describe('snackbarMiddleware', () => {
  it('dispatches snackbar on fetchPokemonList.rejected', async () => {
    const store = createTestStore();

    await store.dispatch(fetchPokemonList({ page: 0 }));

    const state = store.getState();
    expect(state.snackbar.notifications).toHaveLength(1);
    expect(state.snackbar.notifications[0].message).toBe('Network error');
    expect(state.snackbar.notifications[0].severity).toBe('error');
  });

  it('dispatches snackbar on fetchPokemonById.rejected with number', async () => {
    const store = createTestStore();

    await store.dispatch(fetchPokemonById(999));

    const state = store.getState();
    expect(state.snackbar.notifications).toHaveLength(1);
    expect(state.snackbar.notifications[0].message).toBe('Pokemon not found');
    expect(state.snackbar.notifications[0].severity).toBe('error');
  });

  it('dispatches snackbar on fetchPokemonById.rejected with string', async () => {
    const store = createTestStore();

    await store.dispatch(fetchPokemonById('unknown'));

    const state = store.getState();
    expect(state.snackbar.notifications).toHaveLength(1);
    expect(state.snackbar.notifications[0].message).toBe('Pokemon not found');
    expect(state.snackbar.notifications[0].severity).toBe('error');
  });

  it('dispatches snackbar on searchPokemon.rejected', async () => {
    const store = createTestStore();

    await store.dispatch(searchPokemon('nonexistent'));

    const state = store.getState();
    expect(state.snackbar.notifications).toHaveLength(1);
    expect(state.snackbar.notifications[0].message).toBe('Search failed');
    expect(state.snackbar.notifications[0].severity).toBe('error');
  });

  it('handles multiple errors and creates multiple notifications', async () => {
    const store = createTestStore();

    await store.dispatch(fetchPokemonList({ page: 0 }));
    await store.dispatch(fetchPokemonById(999));
    await store.dispatch(searchPokemon('test'));

    const state = store.getState();
    expect(state.snackbar.notifications).toHaveLength(3);
  });

  it('uses default error message when error message is undefined', async () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
        snackbar: snackbarReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(snackbarMiddleware.middleware),
    });

    // Manually dispatch a rejected action without a message
    store.dispatch({
      type: fetchPokemonList.rejected.type,
      error: {},
    });

    const state = store.getState();
    expect(state.snackbar.notifications).toHaveLength(1);
    expect(state.snackbar.notifications[0].message).toBe('Failed to fetch Pokemon list');
  });
});

