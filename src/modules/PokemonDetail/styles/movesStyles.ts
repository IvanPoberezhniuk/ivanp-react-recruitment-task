import { SxProps, Theme } from "@mui/material/styles";
import { GAME_COLORS } from "../../../constants/gameColors";

export const movesStyles = {
  movesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
  } as SxProps<Theme>,

  moveChip: {
    m: 0.25,
    fontSize: "0.7rem",
    height: 22,
    transition: "all 0.2s ease",
    textTransform: "capitalize",
  } as SxProps<Theme>,

  generationGroup: {
    mb: 1,
  } as SxProps<Theme>,

  generationTitle: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "text.secondary",
    mb: 0.5,
    textTransform: "uppercase",
  } as SxProps<Theme>,

  gamesFlexContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
  } as SxProps<Theme>,

  gameChip: (gameName: string): SxProps<Theme> => {
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

