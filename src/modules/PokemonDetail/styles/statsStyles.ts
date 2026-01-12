import { SxProps, Theme } from "@mui/material/styles";

export const statsStyles = {
  statsRow: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
    gap: 2,
  } as SxProps<Theme>,

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 2,
  } as SxProps<Theme>,

  statBar: {
    height: 6,
    borderRadius: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    mt: 0.25,
    flex: 1,
  } as SxProps<Theme>,

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
    } as SxProps<Theme>),

  battleStatRow: {
    display: "flex",
    justifyContent: "space-between",
    mb: 0.3,
  } as SxProps<Theme>,

  battleStatName: {
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "text.primary",
    textTransform: "capitalize",
  } as SxProps<Theme>,

  battleStatValue: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "text.primary",
  } as SxProps<Theme>,
};

