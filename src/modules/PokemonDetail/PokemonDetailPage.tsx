import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Collapse,
  Card,
  CardContent,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPokemonById, clearSelectedPokemon } from '../../store/slices/pokemonSlice';
import { TYPE_COLORS } from '../../theme/theme';

const styles = {
  container: {
    py: 1.5,
    maxWidth: '100%',
  } as SxProps<Theme>,

  breadcrumbs: {
    mb: 1,
  } as SxProps<Theme>,

  breadcrumbLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'text.primary',
    '&:hover': {
      textDecoration: 'underline',
    },
  } as SxProps<Theme>,

  contentContainer: {
    display: 'flex',
    gap: 2,
    flexDirection: { xs: 'column', md: 'row' },
  } as SxProps<Theme>,

  imageSection: {
    flex: '0 0 auto',
    width: { xs: '100%', md: '280px' },
  } as SxProps<Theme>,

  imagePaper: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  } as SxProps<Theme>,

  image: {
    width: '100%',
    maxWidth: 240,
    height: 'auto',
    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))',
  } as SxProps<Theme>,

  detailsSection: {
    flex: 1,
  } as SxProps<Theme>,

  pokemonName: {
    textTransform: 'capitalize',
    fontWeight: 700,
    fontSize: '1.75rem',
    mb: 0,
  } as SxProps<Theme>,

  pokemonNumber: {
    color: 'text.secondary',
    fontSize: '1rem',
    mb: 0.5,
  } as SxProps<Theme>,

  sectionTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    mb: 0.75,
    mt: 1.5,
    color: 'text.secondary',
  } as SxProps<Theme>,

  typesContainer: {
    display: 'flex',
    gap: 0.5,
    flexWrap: 'wrap',
    mb: 1,
  } as SxProps<Theme>,

  typeChip: (typeName: string): SxProps<Theme> => ({
    backgroundColor: TYPE_COLORS[typeName] || '#777',
    color: '#fff',
    fontWeight: 600,
    textTransform: 'capitalize',
    fontSize: '0.75rem',
    padding: '4px 12px',
    height: 24,
  }),

  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.75,
    mb: 1,
  } as SxProps<Theme>,

  statRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  } as SxProps<Theme>,

  statLabel: {
    minWidth: 110,
    fontWeight: 600,
    textTransform: 'capitalize',
    fontSize: '0.85rem',
  } as SxProps<Theme>,

  statValue: {
    fontWeight: 700,
    fontSize: '0.95rem',
    color: 'primary.main',
    minWidth: 35,
    textAlign: 'right',
  } as SxProps<Theme>,

  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  } as SxProps<Theme>,

  errorContainer: {
    mt: 4,
  } as SxProps<Theme>,

  statBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    mt: 0.25,
    flex: 1,
  } as SxProps<Theme>,

  statBarFill: (value: number) => ({
    height: '100%',
    borderRadius: 3,
    background: value >= 100 ? 'linear-gradient(90deg, #4caf50, #8bc34a)' :
                value >= 70 ? 'linear-gradient(90deg, #2196f3, #03a9f4)' :
                'linear-gradient(90deg, #ff9800, #ffc107)',
    width: `${Math.min((value / 255) * 100, 100)}%`,
    transition: 'width 0.5s ease-in-out',
  } as SxProps<Theme>),

  audioButton: {
    ml: 1,
    padding: 0.5,
  } as SxProps<Theme>,

  shinyButton: {
    ml: 0.5,
    padding: 0.5,
  } as SxProps<Theme>,

  expandButton: {
    mt: 0.5,
  } as SxProps<Theme>,

  movesContainer: {
    mt: 1,
    maxHeight: 200,
    overflowY: 'auto',
  } as SxProps<Theme>,

  moveChip: {
    m: 0.25,
    fontSize: '0.7rem',
    height: 22,
  } as SxProps<Theme>,

  gameChip: {
    m: 0.25,
    fontSize: '0.65rem',
    height: 20,
  } as SxProps<Theme>,

  spriteGallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mt: 1,
  } as SxProps<Theme>,

  spriteBox: {
    width: 72,
    height: 72,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'background.paper',
    '&:hover': {
      borderColor: 'primary.main',
      transform: 'scale(1.05)',
      transition: 'all 0.2s',
    },
  } as SxProps<Theme>,

  spriteImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    imageRendering: 'pixelated',
  } as SxProps<Theme>,

  experienceChip: {
    fontSize: '0.8rem',
    fontWeight: 600,
    px: 1.5,
    py: 0.5,
    height: 28,
  } as SxProps<Theme>,

  sectionCard: {
    mt: 1.5,
    p: 1.5,
  } as SxProps<Theme>,

  hiddenAbilityChip: {
    border: '1.5px dashed',
    borderColor: 'warning.main',
  } as SxProps<Theme>,
};

export const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPokemon, loading, error } = useAppSelector((state) => state.pokemon);

  const [showShiny, setShowShiny] = useState(false);
  const [showMoves, setShowMoves] = useState(false);
  const [showSprites, setShowSprites] = useState(false);
  const [showGames, setShowGames] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemonById(id));
    }

    return () => {
      dispatch(clearSelectedPokemon());
    };
  }, [id, dispatch]);

  const handleBreadcrumbClick = () => {
    navigate('/');
  };

  const playCry = () => {
    if (selectedPokemon?.cries?.latest) {
      const audio = new Audio(selectedPokemon.cries.latest);
      audio.play();
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.loadingContainer}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.errorContainer}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  if (!selectedPokemon) {
    return null;
  }

  const imageUrl = showShiny
    ? (selectedPokemon.sprites?.other?.['official-artwork']?.front_shiny ||
       selectedPokemon.sprites?.front_shiny ||
       `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${selectedPokemon.id}.png`)
    : (selectedPokemon.sprites?.other?.['official-artwork']?.front_default ||
       selectedPokemon.sprites?.front_default ||
       `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`);

  const getStatValue = (statName: string): number => {
    const stat = selectedPokemon.stats?.find((s) => s.stat.name === statName);
    return stat?.base_stat || 0;
  };

  const getLevelUpMoves = () => {
    if (!selectedPokemon.moves) return [];
    return selectedPokemon.moves
      .filter(m => m.version_group_details.some(v => v.move_learn_method.name === 'level-up'))
      .slice(0, 20)
      .map(m => m.move.name);
  };

  const getUniqueGames = () => {
    if (!selectedPokemon.game_indices) return [];
    return selectedPokemon.game_indices
      .map(g => g.version.name)
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 15);
  };

  return (
    <Container maxWidth="xl" sx={styles.container}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={styles.breadcrumbs}
      >
        <Link sx={styles.breadcrumbLink} onClick={handleBreadcrumbClick}>
          <HomeIcon fontSize="small" />
          <Typography>Home</Typography>
        </Link>
        <Typography color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {selectedPokemon.name}
        </Typography>
      </Breadcrumbs>

      {/* Content */}
      <Box sx={styles.contentContainer}>
        {/* Image Section */}
        <Box sx={styles.imageSection}>
          <Paper elevation={3} sx={styles.imagePaper}>
            <Box
              component="img"
              src={imageUrl}
              alt={selectedPokemon.name}
              sx={styles.image}
            />
          </Paper>
        </Box>

        {/* Details Section */}
        <Box sx={styles.detailsSection}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="h4" sx={styles.pokemonName}>
              {selectedPokemon.name}
            </Typography>
            <Typography variant="h6" sx={styles.pokemonNumber}>
              #{String(selectedPokemon.id).padStart(3, '0')}
            </Typography>
            {selectedPokemon.cries?.latest && (
              <Tooltip title="Play Cry">
                <IconButton onClick={playCry} sx={styles.audioButton} color="primary" size="small">
                  <VolumeUpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={showShiny ? "Show Normal" : "Show Shiny"}>
              <IconButton onClick={() => setShowShiny(!showShiny)} sx={styles.shinyButton} color="secondary" size="small">
                <AutoAwesomeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {selectedPokemon.base_experience && (
              <Chip
                icon={<SportsEsportsIcon fontSize="small" />}
                label={`XP: ${selectedPokemon.base_experience}`}
                color="primary"
                size="small"
                sx={styles.experienceChip}
              />
            )}
          </Box>

          {/* Types */}
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            Types
          </Typography>
          {selectedPokemon.types && selectedPokemon.types.length > 0 && (
            <Box sx={styles.typesContainer}>
              {selectedPokemon.types.map((type) => (
                <Chip
                  key={type.type.name}
                  label={type.type.name}
                  size="small"
                  sx={styles.typeChip(type.type.name)}
                />
              ))}
            </Box>
          )}

          {/* Abilities */}
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            Abilities
          </Typography>
          {selectedPokemon.abilities && selectedPokemon.abilities.length > 0 && (
            <Box sx={styles.typesContainer}>
              {selectedPokemon.abilities.map((ability) => (
                <Chip
                  key={ability.ability.name}
                  label={ability.ability.name.replace('-', ' ')}
                  color={ability.is_hidden ? "warning" : "default"}
                  variant={ability.is_hidden ? "outlined" : "filled"}
                  size="small"
                  sx={ability.is_hidden ? { ...styles.hiddenAbilityChip, fontSize: '0.75rem', height: 24 } : { fontSize: '0.75rem', height: 24 }}
                  icon={ability.is_hidden ? <AutoAwesomeIcon fontSize="small" /> : undefined}
                />
              ))}
            </Box>
          )}

          {/* Physical Stats */}
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            Physical Stats
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
            {selectedPokemon.height && (
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Height</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  {(selectedPokemon.height / 10).toFixed(1)} m
                </Typography>
              </Box>
            )}
            {selectedPokemon.weight && (
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Weight</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  {(selectedPokemon.weight / 10).toFixed(1)} kg
                </Typography>
              </Box>
            )}
          </Box>

          {/* Battle Stats */}
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            Battle Stats
          </Typography>
          <Box sx={styles.statsContainer}>
            {['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'].map((statName) => {
              const value = getStatValue(statName);
              return (
                <Box key={statName} sx={{ mb: 0.5 }}>
                  <Box sx={styles.statRow}>
                    <Typography sx={styles.statLabel}>
                      {statName.replace('-', ' ')}
                    </Typography>
                    <Typography sx={styles.statValue}>{value}</Typography>
                    <Box sx={styles.statBar}>
                      <Box sx={styles.statBarFill(value)} />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Moves Section */}
          <Card sx={styles.sectionCard}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Learnable Moves (Level-up)
                </Typography>
                <IconButton onClick={() => setShowMoves(!showMoves)} size="small">
                  {showMoves ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
              </Box>
              <Collapse in={showMoves}>
                <Box sx={styles.movesContainer}>
                  {getLevelUpMoves().map((move) => (
                    <Chip
                      key={move}
                      label={move.replace('-', ' ')}
                      size="small"
                      sx={styles.moveChip}
                    />
                  ))}
                </Box>
              </Collapse>
            </CardContent>
          </Card>

          {/* Game Appearances */}
          <Card sx={styles.sectionCard}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Game Appearances
                </Typography>
                <IconButton onClick={() => setShowGames(!showGames)} size="small">
                  {showGames ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
              </Box>
              <Collapse in={showGames}>
                <Box sx={{ mt: 1 }}>
                  {getUniqueGames().map((game) => (
                    <Chip
                      key={game}
                      label={game.replace('-', ' ')}
                      size="small"
                      variant="outlined"
                      sx={styles.gameChip}
                    />
                  ))}
                </Box>
              </Collapse>
            </CardContent>
          </Card>

          {/* Sprite Gallery */}
          <Card sx={styles.sectionCard}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Sprite Gallery
                </Typography>
                <IconButton onClick={() => setShowSprites(!showSprites)} size="small">
                  {showSprites ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
              </Box>
              <Collapse in={showSprites}>
                <Box sx={styles.spriteGallery}>
                  {selectedPokemon.sprites?.front_default && (
                    <Tooltip title="Front">
                      <Box sx={styles.spriteBox}>
                        <Box component="img" src={selectedPokemon.sprites.front_default} sx={styles.spriteImage} />
                      </Box>
                    </Tooltip>
                  )}
                  {selectedPokemon.sprites?.front_shiny && (
                    <Tooltip title="Shiny">
                      <Box sx={styles.spriteBox}>
                        <Box component="img" src={selectedPokemon.sprites.front_shiny} sx={styles.spriteImage} />
                      </Box>
                    </Tooltip>
                  )}
                  {selectedPokemon.sprites?.back_default && (
                    <Tooltip title="Back">
                      <Box sx={styles.spriteBox}>
                        <Box component="img" src={selectedPokemon.sprites.back_default} sx={styles.spriteImage} />
                      </Box>
                    </Tooltip>
                  )}
                  {selectedPokemon.sprites?.back_shiny && (
                    <Tooltip title="Back Shiny">
                      <Box sx={styles.spriteBox}>
                        <Box component="img" src={selectedPokemon.sprites.back_shiny} sx={styles.spriteImage} />
                      </Box>
                    </Tooltip>
                  )}
                  {selectedPokemon.sprites?.other?.dream_world?.front_default && (
                    <Tooltip title="Dream">
                      <Box sx={styles.spriteBox}>
                        <Box component="img" src={selectedPokemon.sprites.other.dream_world.front_default} sx={styles.spriteImage} />
                      </Box>
                    </Tooltip>
                  )}
                  {selectedPokemon.sprites?.other?.home?.front_default && (
                    <Tooltip title="Home">
                      <Box sx={styles.spriteBox}>
                        <Box component="img" src={selectedPokemon.sprites.other.home.front_default} sx={styles.spriteImage} />
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};


