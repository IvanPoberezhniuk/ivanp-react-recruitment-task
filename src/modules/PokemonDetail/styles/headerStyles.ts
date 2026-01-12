import { SxProps, Theme } from "@mui/material/styles";

export const headerStyles = {
  headerContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1,
    justifyContent: "space-between",
    gridArea: "header",
  } as SxProps<Theme>,

  headerLeft: {
    display: "flex",
    gap: 1,
  } as SxProps<Theme>,

  headerButtons: {
    display: "flex",
  } as SxProps<Theme>,

  pokemonName: {
    textTransform: "capitalize",
    fontWeight: 700,
    mb: 0,
  } as SxProps<Theme>,

  pokemonNumber: {
    color: "text.secondary",
    fontSize: "1rem",
    mb: 0.5,
  } as SxProps<Theme>,

  audioButton: {
    ml: 1,
    padding: 0.5,
  } as SxProps<Theme>,

  volumeControlContainer: {
    position: "relative",
    display: "inline-block",
    overflow: "visible",
  } as SxProps<Theme>,

  volumeSliderBox: {
    position: "absolute",
    top: "150%",
    left: "10%",
    py: 2,
    px: 0.5,
    zIndex: 1,
    backgroundColor: "background.paper",
    borderRadius: 2,
    boxShadow: 3,
    height: 120,
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.2s ease-in-out",
    "&.visible": {
      opacity: 1,
      pointerEvents: "auto",
    },
  } as SxProps<Theme>,

  volumeSlider: {
    color: "primary.main",
    "& .MuiSlider-thumb": {
      width: 16,
      height: 16,
    },
  } as SxProps<Theme>,

  shinyButton: {
    ml: 0.5,
    padding: 0.5,
  } as SxProps<Theme>,
};

