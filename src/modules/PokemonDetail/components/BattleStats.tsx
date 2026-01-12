import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { BattleStatsProps } from "../types/pokemonDetail.types";
import { statsStyles as styles } from "../styles/statsStyles";
import { pokemonDetailStyles } from "../styles/pokemonDetailStyles";

export const BattleStats: React.FC<BattleStatsProps> = ({ stats }) => {
  const getStatValue = (statName: string): number => {
    const stat = stats?.find((s) => s.stat.name === statName);
    return stat?.base_stat || 0;
  };

  const statNames = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

  return (
    <Box>
      <Typography variant="subtitle2" sx={pokemonDetailStyles.sectionTitle}>
        Battle Stats
      </Typography>
      <Divider sx={pokemonDetailStyles.sectionDivider} />
      <Box sx={styles.statsGrid}>
        {statNames.map((statName) => {
          const value = getStatValue(statName);
          return (
            <Box key={statName}>
              <Box sx={styles.battleStatRow}>
                <Typography sx={styles.battleStatName}>
                  {statName.replace("-", " ")}
                </Typography>
                <Typography sx={styles.battleStatValue}>{value}</Typography>
              </Box>
              <Box sx={styles.statBar}>
                <Box sx={styles.statBarFill(value)} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

