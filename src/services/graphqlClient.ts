import { GraphQLClient } from 'graphql-request';

/**
 * GraphQL client for PokeAPI v1beta
 *
 * Endpoint: https://beta.pokeapi.co/graphql/v1beta
 * Documentation: https://pokeapi.co/docs/graphql
 *
 * Note: Using v1beta endpoint (v1beta2 is having connectivity issues)
 * Schema uses pokemon_v2_ prefix for all types
 */
export const graphqlClient = new GraphQLClient(
  'https://beta.pokeapi.co/graphql/v1beta',
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

