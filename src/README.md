# Project Structure

This project follows a **page-based architecture** for better organization and scalability.

## 📁 Directory Structure

```
src/
├── pages/                          # Page components (route-level)
│   ├── PokemonListPage/           # List page
│   │   ├── PokemonListPage.tsx
│   │   └── index.ts
│   └── PokemonDetailPage/         # Detail page
│       ├── PokemonDetailPage.tsx
│       └── index.ts
│
├── features/                       # Feature-specific components
│   ├── pokemon-list/              # List page features
│   │   └── components/
│   ├── pokemon-detail/            # Detail page features
│   │   ├── components/
│   │   ├── styles/
│   │   ├── types/
│   │   └── index.ts
│   └── pokemon-card/              # Shared Pokemon card
│       ├── PokemonCard.tsx
│       ├── PokemonCardList.tsx
│       └── index.ts
│
├── shared/                        # Shared across app
│   ├── components/                # Shared UI components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── GlobalSnackbar/
│   │   └── index.ts
│   ├── hooks/                     # Custom React hooks
│   │   └── usePageTitle.ts
│   ├── utils/                     # Utility functions
│   │   └── pokemonUtils.ts
│   └── types/                     # TypeScript types
│       ├── pokemon.types.ts
│       └── styles.types.ts
│
├── store/                         # Redux state management
│   ├── slices/
│   │   ├── pokemonSlice.ts
│   │   └── snackbarSlice.ts
│   └── middleware/
│
├── graphql/                       # GraphQL queries & fragments
│   ├── queries/
│   └── fragments/
│
├── services/                      # API & external services
│   └── graphqlClient.ts
│
├── theme/                         # MUI theme configuration
│   └── theme.ts
│
├── generated/                     # Auto-generated files
│   └── graphql.ts
│
├── assets/                        # Static assets
│   └── *.png
│
├── styles/                        # Global styles
│   └── lightbox.css
│
├── App.tsx                        # Root App component
├── index.tsx                      # Entry point
└── README.md                      # This file
```

## 🎯 Architecture Principles

### 1. **Pages** (`pages/`)
- **Purpose**: Top-level route components
- **Contains**: Page-level logic, layout, data fetching
- **Example**: `PokemonListPage`, `PokemonDetailPage`
- **Rule**: One page per route

### 2. **Features** (`features/`)
- **Purpose**: Feature-specific components and logic
- **Contains**: Components, styles, types specific to a feature
- **Example**: `pokemon-detail/components/BattleStats.tsx`
- **Rule**: Organized by feature domain, not by file type

### 3. **Shared** (`shared/`)
- **Purpose**: Reusable code across the entire app
- **Contains**: 
  - `components/` - UI components (Header, Footer)
  - `hooks/` - Custom React hooks
  - `utils/` - Helper functions
  - `types/` - TypeScript interfaces
- **Rule**: Must be used in 2+ places to live here

### 4. **Store** (`store/`)
- **Purpose**: Global state management
- **Contains**: Redux slices, middleware
- **Rule**: Keep slices focused and domain-specific

### 5. **GraphQL** (`graphql/`)
- **Purpose**: GraphQL queries and fragments
- **Contains**: `.graphql` files
- **Rule**: Auto-generates types via codegen

## 📝 Import Conventions

### Pages import from:
```typescript
// ✅ Good
import { PokemonCard } from '../../features/pokemon-card';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { Pokemon } from '../../shared/types/pokemon.types';
```

### Features import from:
```typescript
// ✅ Good - relative imports within feature
import { BattleStats } from './components/BattleStats';
import { statsStyles } from './styles/statsStyles';

// ✅ Good - shared utilities
import { Pokemon } from '../../shared/types/pokemon.types';
```

### Shared components import from:
```typescript
// ✅ Good
import { useAppDispatch } from '../../../store';
import { StylesObject } from '../../types/styles.types';
```

## 🚀 Benefits of This Structure

1. **Scalability**: Easy to add new pages and features
2. **Maintainability**: Clear separation of concerns
3. **Discoverability**: Intuitive file locations
4. **Reusability**: Shared code is centralized
5. **Testability**: Features are isolated and testable
6. **Team Collaboration**: Clear ownership boundaries

## 🔄 Migration Notes

This structure was migrated from a module-based architecture to improve:
- Page-level organization
- Feature isolation
- Shared code reusability
- Developer experience

