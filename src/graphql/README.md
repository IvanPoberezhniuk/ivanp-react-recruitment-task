# GraphQL Setup

This project uses **GraphQL Code Generator** to create type-safe GraphQL queries without template strings.

## 📁 File Structure

```
src/
├── graphql/
│   ├── fragments/
│   │   └── pokemonFields.graphql    # Reusable GraphQL fragments
│   └── queries/
│       └── pokemon.graphql           # Pokemon queries
├── generated/
│   └── graphql.ts                    # Auto-generated types & SDK (DO NOT EDIT)
└── services/
    └── graphqlClient.ts              # GraphQL client configuration
```

## 🚀 Usage

### 1. Define Queries in `.graphql` Files

Create your queries in `src/graphql/queries/*.graphql`:

```graphql
query GetPokemonList($limit: Int!, $offset: Int!) {
  pokemon_v2_pokemon(limit: $limit, offset: $offset) {
    id
    name
    height
    weight
  }
}
```

### 2. Generate TypeScript Types

Run the code generator:

```bash
pnpm codegen
```

Or watch for changes:

```bash
pnpm codegen:watch
```

### 3. Use the Generated SDK

Import and use the type-safe SDK in your Redux slices or components:

```typescript
import { graphqlClient } from '../../services/graphqlClient';
import { getSdk } from '../../generated/graphql';

const sdk = getSdk(graphqlClient);

// Fully typed! No template strings!
const data = await sdk.GetPokemonList({
  limit: 20,
  offset: 0,
});
```

## 📝 Benefits

✅ **No template strings** - All queries in separate `.graphql` files  
✅ **Full type safety** - TypeScript autocomplete and error checking  
✅ **Auto-generated** - Types sync automatically with schema  
✅ **Reusable fragments** - DRY principle for common fields  
✅ **Single request** - GraphQL fetches only what you need  

## 🔧 Configuration

- **`codegen.yml`** - GraphQL Code Generator configuration
- **`.graphqlrc.yml`** - GraphQL schema configuration for IDE support
- **`src/services/graphqlClient.ts`** - GraphQL client setup

## 📚 Resources

- [GraphQL Code Generator Docs](https://the-guild.dev/graphql/codegen)
- [PokeAPI GraphQL Docs](https://pokeapi.co/docs/graphql)
- [graphql-request Docs](https://github.com/jasonkuhrt/graphql-request)

## ⚠️ Important Notes

- The `src/generated/` folder is auto-generated - **DO NOT EDIT** manually
- Run `pnpm codegen` after modifying any `.graphql` files
- The generated files are gitignored - run codegen after cloning the repo

