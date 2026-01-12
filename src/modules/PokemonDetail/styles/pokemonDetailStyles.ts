import { SxProps, Theme } from "@mui/material/styles";

export const pokemonDetailStyles = {
  container: {
    py: 1.5,
    maxWidth: "100%",
  } as SxProps<Theme>,

  breadcrumbs: {
    mb: 1,
  } as SxProps<Theme>,

  breadcrumbLink: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    cursor: "pointer",
    textDecoration: "none",
    color: "text.primary",
    "&:hover": {
      textDecoration: "underline",
    },
  } as SxProps<Theme>,

  breadcrumbText: {
    textTransform: "capitalize",
  } as SxProps<Theme>,

  contentContainer: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "280px 1fr", lg: "320px 1fr" },
    gridTemplateRows: "auto auto",
    gridTemplateAreas: {
      xs: `"header"
         "main"`,
      md: `"header ."
         "image details"`,
    },
    columnGap: { xs: 1.5, md: 6 },
    rowGap: { xs: 1.5, md: 2 },
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    gridArea: { xs: "main", md: "image" },
  } as SxProps<Theme>,

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    gridArea: { xs: "auto", md: "details" },
  } as SxProps<Theme>,

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  } as SxProps<Theme>,

  errorContainer: {
    mt: 4,
  } as SxProps<Theme>,

  sectionTitle: {
    fontWeight: 600,
    mb: 1,
  } as SxProps<Theme>,

  sectionDivider: {
    mb: 1.5,
  } as SxProps<Theme>,
};

