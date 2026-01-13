import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  CardActionArea,
} from '@mui/material';
import { Pokemon } from '../../shared/types/pokemon.types';
import { createTypeChipStyle } from '../../theme/theme';
import { StylesObject } from '../../shared/types/styles.types';
import { getPokemonGeneration } from '../../shared/utils/pokemonUtils';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

// Styles constant
const styles: StylesObject = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },

  imageContainer: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },

  image: {
    width: '100%',
    maxWidth: 180,
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
  },

  pokemonName: {
    textTransform: 'capitalize',
    fontWeight: 600,
  },

  pokemonNumber: {
    fontWeight: 600,
  },

  typesContainer: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
    mb: 1,
  },

  typeChip: (typeName: string) => createTypeChipStyle(typeName),

  statsContainer: {
    display: 'flex',
    gap: 2,
    mt: 2,
  },

  statLabel: {
    display: 'block',
  },

  statValue: {
    fontWeight: 600,
  },

  genBadge: {
    fontSize: '0.65rem',
    fontWeight: 600,
    color: 'text.secondary',
  },
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  const imageUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Card sx={styles.card}>
      <CardActionArea onClick={handleClick} disabled={!onClick}>
        <Box sx={styles.imageContainer}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={pokemon.name}
            sx={styles.image}
            loading="lazy"
            width={200}
            height={200}
          />
        </Box>
        <CardContent>
          <Box sx={styles.headerContainer}>
            <Typography variant="h6" component="div" sx={styles.pokemonName}>
              {pokemon.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={styles.pokemonNumber}>
              #{String(pokemon.id).padStart(3, '0')}
            </Typography>
          </Box>

          {pokemon.types && pokemon.types.length > 0 && (
            <Box sx={styles.typesContainer}>
              {pokemon.types.map((type) => (
                <Chip
                  key={type.type.name}
                  label={type.type.name}
                  size="small"
                  sx={styles.typeChip(type.type.name)}
                />
              ))}
            </Box>
          )}

          <Box sx={styles.statsContainer}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={styles.statLabel}>
                Gen
              </Typography>
              <Typography variant="body2" sx={styles.statValue}>
                {getPokemonGeneration(pokemon.id)}
              </Typography>
            </Box>
            {pokemon.height && (
              <Box>
                <Typography variant="caption" color="text.secondary" sx={styles.statLabel}>
                  Height
                </Typography>
                <Typography variant="body2" sx={styles.statValue}>
                  {(pokemon.height / 10).toFixed(1)} m
                </Typography>
              </Box>
            )}
            {pokemon.weight && (
              <Box>
                <Typography variant="caption" color="text.secondary" sx={styles.statLabel}>
                  Weight
                </Typography>
                <Typography variant="body2" sx={styles.statValue}>
                  {(pokemon.weight / 10).toFixed(1)} kg
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

