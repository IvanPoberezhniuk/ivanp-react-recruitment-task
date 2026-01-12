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
import { SxProps, Theme } from '@mui/material/styles';
import { Pokemon } from '../../types/pokemon.types';
import { TYPE_COLORS } from '../../theme/theme';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

// Styles constant
const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  } as SxProps<Theme>,

  imageContainer: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  } as SxProps<Theme>,

  image: {
    width: '100%',
    maxWidth: 180,
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
  } as SxProps<Theme>,

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
  } as SxProps<Theme>,

  pokemonName: {
    textTransform: 'capitalize',
    fontWeight: 600,
  } as SxProps<Theme>,

  pokemonNumber: {
    fontWeight: 600,
  } as SxProps<Theme>,

  typesContainer: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
    mb: 1,
  } as SxProps<Theme>,

  typeChip: (typeName: string): SxProps<Theme> => ({
    backgroundColor: TYPE_COLORS[typeName] || '#777',
    color: '#fff',
    fontWeight: 600,
    textTransform: 'capitalize',
  }),

  statsContainer: {
    display: 'flex',
    gap: 2,
    mt: 2,
  } as SxProps<Theme>,

  statLabel: {
    display: 'block',
  } as SxProps<Theme>,

  statValue: {
    fontWeight: 600,
  } as SxProps<Theme>,
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

          {(pokemon.height || pokemon.weight) && (
            <Box sx={styles.statsContainer}>
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
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

