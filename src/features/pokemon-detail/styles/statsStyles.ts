import { StylesObject } from "../../../shared/types/styles.types";

export const statsStyles: StylesObject = {
  statsRow: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
    gap: { xs: 1.5, sm: 2 },
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
    gap: { xs: 1.5, sm: 2 },
  },

  statBar: {
    height: 6,
    borderRadius: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    mt: 0.25,
    flex: 1,
  },

  statBarFill: (value: number) =>
    ({
      height: "100%",
      borderRadius: 1,
      background:
        value >= 100
          ? "linear-gradient(90deg, #4caf50, #8bc34a)"
          : value >= 70
          ? "linear-gradient(90deg, #2196f3, #03a9f4)"
          : "linear-gradient(90deg, #ff9800, #ffc107)",
      width: `${Math.min((value / 255) * 100, 100)}%`,
      transition: "width 0.5s ease-in-out",
    }),

  battleStatRow: {
    display: "flex",
    justifyContent: "space-between",
    mb: 0.3,
  },

  battleStatName: {
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "text.primary",
    textTransform: "capitalize",
  },

  battleStatValue: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "text.primary",
  },
};

