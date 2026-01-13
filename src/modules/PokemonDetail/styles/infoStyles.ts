import { SxProps, Theme } from "@mui/material/styles";
import { TYPE_COLORS } from "../../../theme/theme";

export const infoStyles = {
  typesAbilitiesRow: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: 1,
    rowGap: 1.5,
  } as SxProps<Theme>,

  inlineGroup: {
    display: "contents",
  } as SxProps<Theme>,

  inlineLabel: {
    fontWeight: 600,
    color: "text.secondary",
    paddingRight: 1,
    whiteSpace: "nowrap",
  } as SxProps<Theme>,

  inlineValue: {
    display: "flex",
    gap: 0.5,
    flexWrap: "wrap",
    alignItems: "center",
  } as SxProps<Theme>,

  statValue: {
    fontSize: "0.8rem",
  } as SxProps<Theme>,

  typeChip: (typeName: string): SxProps<Theme> => ({
    backgroundColor: TYPE_COLORS[typeName] || "#777",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.7rem",
    textTransform: "capitalize",
    padding: "0 12px",
    transition: "all 0.2s ease",
    height: 22,
    maxWidth: 120,
  }),

  abilityChipHidden: {
    fontSize: "0.7rem",
    height: 22,
    border: "1.5px dashed",
    borderColor: "warning.main",
  } as SxProps<Theme>,

  abilityChipNormal: {
    fontSize: "0.7rem",
    height: 22,
  } as SxProps<Theme>,

  abilityIcon: {
    fontSize: "0.9rem",
  } as SxProps<Theme>,
};

