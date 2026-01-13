import React from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { PokemonInfoProps } from "../types/pokemonDetail.types";
import { infoStyles as styles } from "../styles/infoStyles";
import { pokemonDetailStyles } from "../styles/pokemonDetailStyles";

export const PokemonInfo: React.FC<PokemonInfoProps> = ({
  types,
  abilities,
  baseExperience,
  baseStatTotal,
  height,
  weight,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" sx={pokemonDetailStyles.sectionTitle}>
        Pokemon Info
      </Typography>
      <Divider sx={pokemonDetailStyles.sectionDivider} />
      <Stack sx={styles.typesAbilitiesRow}>
        {types && types.length > 0 && (
          <>
            <Typography variant="caption" sx={styles.inlineLabel}>
              Types:
            </Typography>
            <Box sx={styles.inlineValue}>
              {types.map((type) => (
                <Chip
                  key={type.type.name}
                  label={type.type.name}
                  size="small"
                  sx={styles.typeChip(type.type.name)}
                />
              ))}
            </Box>
          </>
        )}
        {abilities && abilities.length > 0 && (
          <>
            <Typography variant="caption" sx={styles.inlineLabel}>
              Abilities:
            </Typography>
            <Box sx={styles.inlineValue}>
              {abilities.map((ability) => (
                <Chip
                  key={ability.ability.name}
                  label={ability.ability.name.replace("-", " ")}
                  color={ability.is_hidden ? "warning" : "default"}
                  variant={ability.is_hidden ? "outlined" : "filled"}
                  size="small"
                  sx={
                    ability.is_hidden
                      ? styles.abilityChipHidden
                      : styles.abilityChipNormal
                  }
                  icon={
                    ability.is_hidden ? (
                      <AutoAwesomeIcon sx={styles.abilityIcon} />
                    ) : undefined
                  }
                />
              ))}
            </Box>
          </>
        )}
        {baseExperience && (
          <>
            <Typography variant="caption" sx={styles.inlineLabel}>
              XP:
            </Typography>
            <Typography sx={styles.statValue}>{baseExperience}</Typography>
          </>
        )}
        {baseStatTotal && (
          <>
            <Typography variant="caption" sx={styles.inlineLabel}>
              BST:
            </Typography>
            <Typography sx={styles.statValue}>{baseStatTotal}</Typography>
          </>
        )}
        {height && (
          <>
            <Typography variant="caption" sx={styles.inlineLabel}>
              Height:
            </Typography>
            <Typography sx={styles.statValue}>
              {(height / 10).toFixed(1)} m
            </Typography>
          </>
        )}
        {weight && (
          <>
            <Typography variant="caption" sx={styles.inlineLabel}>
              Weight:
            </Typography>
            <Typography sx={styles.statValue}>
              {(weight / 10).toFixed(1)} kg
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

