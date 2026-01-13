import { StylesObject } from "../../../shared/types/styles.types";

export const pokemonDetailStyles: StylesObject = {
  container: {
    py: 1.5,
    maxWidth: "100%",
  },

  breadcrumbs: {
    mb: 1,
  },

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
  },

  breadcrumbText: {
    textTransform: "capitalize",
  },

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
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    gridArea: { xs: "auto", md: "details" },
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  },

  errorContainer: {
    mt: 4,
  },

  sectionTitle: {
    fontWeight: 600,
    mb: 1,
  },

  sectionDivider: {
    mb: 1.5,
  },
};

