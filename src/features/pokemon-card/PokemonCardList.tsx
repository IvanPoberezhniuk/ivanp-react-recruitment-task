import React from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

import { Pokemon } from "../../shared/types/pokemon.types";
import { StylesObject } from "../../shared/types/styles.types";
import { getPokemonGeneration } from "../../shared/utils/pokemonUtils";
import { createTypeChipStyle } from "../../theme/theme";

interface PokemonCardListProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

// Styles constant
const styles: StylesObject = {
  card: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    height: "100%",
  },

  imageContainer: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: { xs: 1.5, sm: 2 },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: { xs: 120, sm: 150, md: 200 },
    width: { xs: 120, sm: 150, md: 200 },
    flexShrink: 0,
  },

  image: {
    width: "100%",
    maxWidth: { xs: 100, sm: 120, md: 150 },
    height: "auto",
    objectFit: "contain",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
  },

  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },

  pokemonName: {
    textTransform: "capitalize",
    fontWeight: 600,
  },

  pokemonNumber: {
    fontWeight: 600,
  },

  typesContainer: {
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
    mb: 2,
  },

  typeChip: (typeName: string) => createTypeChipStyle(typeName),

  statsContainer: {
    display: "flex",
    gap: 4,
    mt: "auto",
  },

  statBox: {
    display: "flex",
    flexDirection: "column",
  },

  statLabel: {
    display: "block",
  },

  statValue: {
    fontWeight: 600,
  },
};

export const PokemonCardList: React.FC<PokemonCardListProps> = ({
  pokemon,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Card sx={styles.card}>
      <CardActionArea
        onClick={handleClick}
        disabled={!onClick}
        sx={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}
      >
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
            <Typography
              variant="h6"
              color="text.secondary"
              sx={styles.pokemonNumber}
            >
              #{String(pokemon.id).padStart(3, "0")}
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

          <Box sx={styles.statsContainer}>
            <Box sx={styles.statBox}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={styles.statLabel}
              >
                Gen
              </Typography>
              <Typography variant="body1" sx={styles.statValue}>
                {getPokemonGeneration(pokemon.id)}
              </Typography>
            </Box>
            {pokemon.height && (
              <Box sx={styles.statBox}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={styles.statLabel}
                >
                  Height
                </Typography>
                <Typography variant="body1" sx={styles.statValue}>
                  {(pokemon.height / 10).toFixed(1)} m
                </Typography>
              </Box>
            )}
            {pokemon.weight && (
              <Box sx={styles.statBox}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={styles.statLabel}
                >
                  Weight
                </Typography>
                <Typography variant="body1" sx={styles.statValue}>
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
