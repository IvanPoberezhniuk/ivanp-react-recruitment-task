import React from "react";
import { Box, Chip, Divider, Typography } from "@mui/material";
import { GameAppearancesProps, GamesByGeneration } from "../types/pokemonDetail.types";
import { movesStyles as styles } from "../styles/movesStyles";
import { pokemonDetailStyles } from "../styles/pokemonDetailStyles";

export const GameAppearances: React.FC<GameAppearancesProps> = ({
  gameIndices,
}) => {
  const getUniqueGames = (): string[] => {
    if (!gameIndices) return [];
    return gameIndices
      .map((g) => g.version.name)
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 15);
  };

  const groupGamesByGeneration = (): GamesByGeneration => {
    const games = getUniqueGames();
    const generations: { [key: string]: string[] } = {
      "Gen I": ["red", "blue", "yellow"],
      "Gen II": ["gold", "silver", "crystal"],
      "Gen III": ["ruby", "sapphire", "emerald", "firered", "leafgreen"],
      "Gen IV": ["diamond", "pearl", "platinum", "heartgold", "soulsilver"],
      "Gen V": ["black", "white", "black-2", "white-2"],
      "Gen VI": ["x", "y", "omega-ruby", "alpha-sapphire"],
      "Gen VII": ["sun", "moon", "ultra-sun", "ultra-moon"],
      "Gen VIII": ["sword", "shield", "brilliant-diamond", "shining-pearl"],
      "Gen IX": ["scarlet", "violet"],
    };

    const grouped: GamesByGeneration = {};
    Object.entries(generations).forEach(([gen, genGames]) => {
      const matchingGames = games.filter((g) => genGames.includes(g));
      if (matchingGames.length > 0) {
        grouped[gen] = matchingGames;
      }
    });
    return grouped;
  };

  const gamesByGeneration = groupGamesByGeneration();

  if (Object.keys(gamesByGeneration).length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={pokemonDetailStyles.sectionTitle}>
        Game Appearances
      </Typography>
      <Divider sx={pokemonDetailStyles.sectionDivider} />
      <Box>
        {Object.entries(gamesByGeneration).map(([gen, games]) => (
          <Box key={gen} sx={styles.generationGroup}>
            <Typography sx={styles.generationTitle}>{gen}</Typography>
            <Box sx={styles.gamesFlexContainer}>
              {games.map((game) => (
                <Chip
                  key={game}
                  label={game.replace("-", " ")}
                  size="small"
                  variant="outlined"
                  sx={styles.gameChip(game)}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

