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

interface PokemonCardListProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

// Styles constant
const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    height: '100%',
  } as SxProps<Theme>,

  imageContainer: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 200,
    width: 200,
  } as SxProps<Theme>,

  image: {
    width: '100%',
    maxWidth: 150,
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
  } as SxProps<Theme>,

  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
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
    mb: 2,
  } as SxProps<Theme>,

  typeChip: (typeName: string): SxProps<Theme> => ({
    backgroundColor: TYPE_COLORS[typeName] || '#777',
    color: '#fff',
    fontWeight: 600,
    textTransform: 'capitalize',
  }),

  statsContainer: {
    display: 'flex',
    gap: 4,
    mt: 'auto',
  } as SxProps<Theme>,

  statBox: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  statLabel: {
    display: 'block',
  } as SxProps<Theme>,

  statValue: {
    fontWeight: 600,
  } as SxProps<Theme>,
};

export const PokemonCardList: React.FC<PokemonCardListProps> = ({ pokemon, onClick }) => {
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
      <CardActionArea onClick={handleClick} disabled={!onClick} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
        <Box sx={styles.imageContainer}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={pokemon.name}
            sx={styles.image}
          />
        </Box>
        <CardContent sx={styles.contentContainer}>
          <Box sx={styles.headerContainer}>
            <Typography variant="h5" component="div" sx={styles.pokemonName}>
              {pokemon.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={styles.pokemonNumber}>
              #{String(pokemon.id).padStart(3, '0')}
            </Typography>
          </Box>

          {pokemon.types && pokemon.types.length > 0 && (
            <Box sx={styles.typesContainer}>
              {pokemon.types.map((type) => (
                <Chip
                  key={type.type.name}
                  label={type.type.name}
                  sx={styles.typeChip(type.type.name)}
                />
              ))}
            </Box>
          )}

          {(pokemon.height || pokemon.weight) && (
            <Box sx={styles.statsContainer}>
              {pokemon.height && (
                <Box sx={styles.statBox}>
                  <Typography variant="caption" color="text.secondary" sx={styles.statLabel}>
                    Height
                  </Typography>
                  <Typography variant="body1" sx={styles.statValue}>
                    {(pokemon.height / 10).toFixed(1)} m
                  </Typography>
                </Box>
              )}
              {pokemon.weight && (
                <Box sx={styles.statBox}>
                  <Typography variant="caption" color="text.secondary" sx={styles.statLabel}>
                    Weight
                  </Typography>
                  <Typography variant="body1" sx={styles.statValue}>
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

