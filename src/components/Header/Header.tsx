import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import GitHubIcon from "@mui/icons-material/GitHub";
import { StylesObject } from "../../types/styles.types";

const styles: StylesObject = {
  appBar: {
    background: "linear-gradient(135deg, #EE1515 0%, #3B4CCA 100%)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: 1,
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.9,
    },
  },
  logoIcon: {
    fontSize: 40,
    color: "#FFCC00",
    animation: "spin 3s linear infinite",
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },
  title: {
    fontWeight: 700,
    fontSize: { xs: "1.25rem", sm: "1.75rem" },
    color: "white",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  navButtons: {
    display: "flex",
    gap: 1,
  },
  homeButton: {
    color: "white",
    borderColor: "white",
    "&:hover": {
      borderColor: "#FFCC00",
      backgroundColor: "rgba(255, 204, 0, 0.1)",
    },
  },
  navButton: {
    color: "white",
    textTransform: "none",
    fontSize: "0.95rem",
    px: 2,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  iconButton: {
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "#FFCC00",
    },
  },
};

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/PokeAPI/pokeapi", "_blank", "noopener,noreferrer");
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Container maxWidth="lg">
        <Toolbar sx={styles.toolbar} disableGutters>
          {/* Logo Section */}
          <Box sx={styles.logoSection} onClick={handleLogoClick}>
            <CatchingPokemonIcon sx={styles.logoIcon} />
            <Typography variant="h1" sx={styles.title}>
              Pokédex
            </Typography>
          </Box>

          {/* Navigation Buttons */}
          <Box sx={styles.navButtons}>
            {/* Home/Browse Button */}
            {!isHomePage ? (
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={handleHomeClick}
                sx={styles.homeButton}
              >
                Home
              </Button>
            ) : (
              <Button
                startIcon={<GridViewIcon />}
                onClick={handleHomeClick}
                sx={styles.navButton}
              >
                Browse All
              </Button>
            )}

            {/* GitHub Link */}
            <Tooltip title="View on GitHub">
              <IconButton
                onClick={handleGitHubClick}
                sx={styles.iconButton}
                size="medium"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

