import React from "react";
import { Box, Chip, Divider, Typography } from "@mui/material";
import { LearnableMovesProps } from "../types/pokemonDetail.types";
import { movesStyles as styles } from "../styles/movesStyles";
import { pokemonDetailStyles } from "../styles/pokemonDetailStyles";

export const LearnableMoves: React.FC<LearnableMovesProps> = ({ moves }) => {
  const getLevelUpMoves = (): string[] => {
    if (!moves) return [];

    const levelUpMoves = moves
      .filter((move) =>
        move.version_group_details.some(
          (detail) => detail.move_learn_method.name === "level-up"
        )
      )
      .map((move) => move.move.name);

    return Array.from(new Set(levelUpMoves)).sort();
  };

  const levelUpMoves = getLevelUpMoves();

  if (levelUpMoves.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={pokemonDetailStyles.sectionTitle}>
        Learnable Moves (Level-up)
      </Typography>
      <Divider sx={pokemonDetailStyles.sectionDivider} />
      <Box sx={styles.movesContainer}>
        {levelUpMoves.map((move) => (
          <Chip
            key={move}
            label={move.replace("-", " ")}
            size="small"
            sx={styles.moveChip}
          />
        ))}
      </Box>
    </Box>
  );
};

