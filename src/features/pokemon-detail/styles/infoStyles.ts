import { createTypeChipStyle } from "../../../theme/theme";
import { StylesObject } from "../../../shared/types/styles.types";

export const infoStyles: StylesObject = {
  typesAbilitiesRow: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: 1,
    rowGap: 1.5,
  },

  inlineGroup: {
    display: "contents",
  },

  inlineLabel: {
    fontWeight: 600,
    color: "text.secondary",
    paddingRight: 1,
    whiteSpace: "nowrap",
  },

  inlineValue: {
    display: "flex",
    gap: 0.5,
    flexWrap: "wrap",
    alignItems: "center",
  },

  statValue: {
    fontSize: "0.8rem",
  },

  typeChip: (typeName: string) => ({
    ...createTypeChipStyle(typeName, { fontSize: "0.7rem", height: 22 }),
    padding: "0 12px",
    maxWidth: 120,
  }),

  abilityChipHidden: {
    fontSize: "0.7rem",
    height: 22,
    border: "1.5px dashed",
    borderColor: "warning.main",
  },

  abilityChipNormal: {
    fontSize: "0.7rem",
    height: 22,
  },

  abilityIcon: {
    fontSize: "0.9rem",
  },
};

