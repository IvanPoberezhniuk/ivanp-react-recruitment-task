# Redux Toolkit Setup Guide

This project uses **Redux Toolkit** for state management with async thunks as middleware for handling API calls.

## 📁 File Structure

```
src/
├── store.ts                          # Redux store configuration
├── store/
│   └── slices/
│       └── pokemonSlice.ts          # Pokemon slice with reducers & thunks
├── types/
│   └── pokemon.types.ts             # TypeScript interfaces
└── modules/
    └── PokemonList/
        └── PokemonList.example.tsx  # Example usage component
```

## 🔧 What's Configured

### 1. **Store Configuration** (`src/store.ts`)
- ✅ Pokemon reducer added
- ✅ Middleware configured with serializable check
- ✅ TypeScript hooks exported: `useAppDispatch`, `useAppSelector`

### 2. **Pokemon Slice** (`src/store/slices/pokemonSlice.ts`)

#### Async Thunks (Middleware):
- `fetchPokemonList(page)` - Fetch paginated Pokemon list
- `fetchPokemonById(id)` - Fetch single Pokemon details
- `searchPokemon(name)` - Search for Pokemon by name

#### Reducers:
- `clearError()` - Clear error state
- `clearSelectedPokemon()` - Clear selected Pokemon
- `setPage(number)` - Set current page
- `resetPokemonList()` - Reset Pokemon list

#### State:
```typescript
{
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}
```

## 🚀 How to Use in Components

### Import hooks and actions:
```typescript
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPokemonList, fetchPokemonById } from '../../store/slices/pokemonSlice';
```

### Access state:
```typescript
const { pokemons, loading, error } = useAppSelector((state) => state.pokemon);
```

### Dispatch actions:
```typescript
const dispatch = useAppDispatch();

// Fetch Pokemon list
dispatch(fetchPokemonList(0));

// Fetch Pokemon by ID
dispatch(fetchPokemonById(25)); // Pikachu

// Search Pokemon
dispatch(searchPokemon('charizard'));
```

## 📝 Example Component

See `src/modules/PokemonList/PokemonList.example.tsx` for a complete working example.

## 🔄 Async Thunk Flow

1. **Pending**: `loading = true`, `error = null`
2. **Fulfilled**: `loading = false`, data updated in state
3. **Rejected**: `loading = false`, `error = error message`

## 🎯 Next Steps

1. Import and use the example component in your App
2. Customize the UI to match your design
3. Add more slices as needed (e.g., favorites, filters)
4. Add more thunks for additional API endpoints

## 📚 Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)

