import { SxProps, Theme } from "@mui/material/styles";
import { TYPE_COLORS } from "../../../theme/theme";

export const imageStyles = {
  imagePaper: (types: string[]) => {
    const primaryType = types[0] || "normal";
    const secondaryType = types[1] || primaryType;
    const color1 = TYPE_COLORS[primaryType] || "#667eea";
    const color2 = TYPE_COLORS[secondaryType] || "#764ba2";
    return {
      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
      padding: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 1,
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)",
        pointerEvents: "none",
      },
    } as SxProps<Theme>;
  },

  imageContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as SxProps<Theme>,

  image: {
    width: 280,
    minWidth: 280,
    minHeight: 280,
    maxHeight: 280,
    filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.3))",
    cursor: "pointer",
  } as SxProps<Theme>,

  magnifierIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "50%",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(238, 21, 21, 0.9)",
      transform: "scale(1.1)",
    },
  } as SxProps<Theme>,

  spriteGallery: {
    overflow: "hidden",
    mx: -0.75,
  } as SxProps<Theme>,

  emblaViewport: {
    overflow: "hidden",
  } as SxProps<Theme>,

  emblaContainer: {
    display: "flex",
    gap: 1,
    py: 1.4,
    px: 1,
  } as SxProps<Theme>,

  emblaSlide: {
    flex: "0 0 auto",
  } as SxProps<Theme>,

  spriteBox: (isSelected: boolean = false) =>
    ({
      width: 72,
      height: 72,
      minWidth: 72,
      minHeight: 72,
      flexShrink: 0,
      border: "2px solid",
      borderColor: isSelected ? "primary.main" : "divider",
      borderRadius: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "background.paper",
      cursor: "pointer",
      transition: "all 0.2s ease",
      transform: isSelected ? "scale(1.05)" : "scale(1)",
      boxShadow: isSelected ? 3 : 0,
      "&:hover": {
        borderColor: "primary.main",
        transform: "scale(1.05)",
      },
    } as SxProps<Theme>),

  spriteImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    imageRendering: "pixelated",
  } as SxProps<Theme>,
};

