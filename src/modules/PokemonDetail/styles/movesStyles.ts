import { GAME_COLORS } from "../../../constants/gameColors";
import { StylesObject } from "../../../types/styles.types";

export const movesStyles: StylesObject = {
  movesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
  },

  moveChip: {
    m: 0.25,
    fontSize: "0.7rem",
    height: 22,
    transition: "all 0.2s ease",
    textTransform: "capitalize",
  },

  generationGroup: {
    mb: 1,
  },

  generationTitle: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "text.secondary",
    mb: 0.5,
    textTransform: "uppercase",
  },

  gamesFlexContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
  },

  gameChip: (gameName: string) => {
    const gameColors = GAME_COLORS[gameName];
    return {
      m: 0.25,
      fontSize: "0.65rem",
      height: 20,
      transition: "all 0.2s ease",
      textTransform: "capitalize",
      ...(gameColors && {
        backgroundColor: gameColors.bg,
        color: gameColors.color,
        borderColor: gameColors.bg,
        fontWeight: 600,
      }),
    };
  },
};

