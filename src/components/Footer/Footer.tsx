import React from "react";
import { Box, Container, Typography, Link, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import ApiIcon from "@mui/icons-material/Api";

const styles = {
  footer: {
    bgcolor: "background.paper",
    borderTop: "1px solid",
    borderColor: "divider",
    py: 4,
    mt: "auto",
  },
  container: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "center", md: "flex-start" },
    gap: 3,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: { xs: "center", md: "flex-start" },
    gap: 1,
  },
  sectionTitle: {
    fontWeight: 600,
    color: "text.primary",
    mb: 1,
  },
  link: {
    color: "text.secondary",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    transition: "color 0.2s",
    "&:hover": {
      color: "primary.main",
    },
  },
  copyright: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: "text.secondary",
    fontSize: "0.875rem",
  },
  heart: {
    color: "#EE1515",
    fontSize: "1rem",
  },
  divider: {
    my: 2,
  },
  bottomSection: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    mt: 2,
  },
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="lg">
        <Box sx={styles.container}>
          {/* About Section */}
          <Box sx={styles.section}>
            <Typography variant="h6" sx={styles.sectionTitle}>
              About
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign={{ xs: "center", md: "left" }}>
              A modern Pokédex built with React, Redux Toolkit,
              <br />
              Material-UI, and GraphQL.
            </Typography>
          </Box>

          {/* Resources Section */}
          <Box sx={styles.section}>
            <Typography variant="h6" sx={styles.sectionTitle}>
              Resources
            </Typography>
            <Link
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              sx={styles.link}
            >
              <ApiIcon fontSize="small" />
              PokéAPI
            </Link>
            <Link
              href="https://github.com/PokeAPI/pokeapi"
              target="_blank"
              rel="noopener noreferrer"
              sx={styles.link}
            >
              <GitHubIcon fontSize="small" />
              GitHub
            </Link>
          </Box>

          {/* Tech Stack Section */}
          <Box sx={styles.section}>
            <Typography variant="h6" sx={styles.sectionTitle}>
              Built With
            </Typography>
            <Typography variant="body2" color="text.secondary">
              React • Redux Toolkit
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Material-UI • GraphQL
            </Typography>
            <Typography variant="body2" color="text.secondary">
              TypeScript • React Router
            </Typography>
          </Box>
        </Box>

        <Divider sx={styles.divider} />

        {/* Bottom Section */}
        <Box sx={styles.bottomSection}>
          <Typography sx={styles.copyright}>
            © {currentYear} Pokédex • Made with{" "}
            <FavoriteIcon sx={styles.heart} /> for Pokémon fans
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
            Pokémon and Pokémon character names are trademarks of Nintendo.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

