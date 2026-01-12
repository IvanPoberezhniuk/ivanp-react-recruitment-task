import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Pokemon } from '../../types/pokemon.types';
import { TYPE_COLORS } from '../../theme/theme';

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  open: boolean;
  onClose: () => void;
}

// Styles constant
const styles = {
  dialogTitle: {
    // DialogTitle styles
  } as SxProps<Theme>,

  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,

  pokemonName: {
    textTransform: 'capitalize',
    fontWeight: 700,
  } as SxProps<Theme>,

  closeButton: {
    // IconButton size handled by component prop
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      md: '5fr 7fr',
    },
    gap: 3,
  } as SxProps<Theme>,

  imagePaper: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    p: 3,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as SxProps<Theme>,

  image: {
    width: '100%',
    maxWidth: 250,
    height: 'auto',
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
  } as SxProps<Theme>,

  pokemonNumber: {
    mt: 2,
    fontWeight: 600,
  } as SxProps<Theme>,

  sectionBox: {
    mb: 3,
  } as SxProps<Theme>,

  sectionLabel: {
    // Typography variant handled by component prop
  } as SxProps<Theme>,

  typesContainer: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
  } as SxProps<Theme>,

  typeChip: (typeName: string): SxProps<Theme> => ({
    backgroundColor: TYPE_COLORS[typeName] || '#777',
    color: '#fff',
    fontWeight: 600,
    textTransform: 'capitalize',
  }),

  divider: {
    my: 2,
  } as SxProps<Theme>,

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 2,
    mb: 3,
  } as SxProps<Theme>,

  statPaper: {
    p: 2,
    bgcolor: 'background.default',
  } as SxProps<Theme>,

  statIconBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  } as SxProps<Theme>,

  statValue: {
    fontWeight: 600,
  } as SxProps<Theme>,

  abilitiesContainer: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
  } as SxProps<Theme>,

  abilityChip: {
    textTransform: 'capitalize',
  } as SxProps<Theme>,
};

export const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ pokemon, open, onClose }) => {
  if (!pokemon) return null;

  const imageUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={styles.dialogTitle}>
        <Box sx={styles.titleBox}>
          <Typography variant="h5" component="div" sx={styles.pokemonName}>
            {pokemon.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={styles.gridContainer}>
          {/* Image Section */}
          <Box>
            <Paper elevation={0} sx={styles.imagePaper}>
              <Box
                component="img"
                src={imageUrl}
                alt={pokemon.name}
                sx={styles.image}
              />
            </Paper>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={styles.pokemonNumber}
            >
              #{String(pokemon.id).padStart(3, '0')}
            </Typography>
          </Box>

          {/* Details Section */}
          <Box>
            {/* Types */}
            <Box sx={styles.sectionBox}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Type
              </Typography>
              <Box sx={styles.typesContainer}>
                {pokemon.types?.map((type) => (
                  <Chip
                    key={type.type.name}
                    label={type.type.name}
                    sx={styles.typeChip(type.type.name)}
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={styles.divider} />

            {/* Physical Stats */}
            <Box sx={styles.statsGrid}>
              <Paper elevation={0} sx={styles.statPaper}>
                <Box sx={styles.statIconBox}>
                  <HeightIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Height
                  </Typography>
                </Box>
                <Typography variant="h6" sx={styles.statValue}>
                  {pokemon.height ? (pokemon.height / 10).toFixed(1) : 'N/A'} m
                </Typography>
              </Paper>
              <Paper elevation={0} sx={styles.statPaper}>
                <Box sx={styles.statIconBox}>
                  <FitnessCenterIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Weight
                  </Typography>
                </Box>
                <Typography variant="h6" sx={styles.statValue}>
                  {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : 'N/A'} kg
                </Typography>
              </Paper>
            </Box>

            {/* Abilities */}
            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Abilities
                </Typography>
                <Box sx={styles.abilitiesContainer}>
                  {pokemon.abilities.map((ability, index) => (
                    <Chip
                      key={index}
                      label={ability.ability.name.replace('-', ' ')}
                      variant="outlined"
                      sx={styles.abilityChip}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

