import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

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
  desktopNav: {
    display: { xs: "none", sm: "flex" },
    gap: 2,
    alignItems: "center",
  },
  mobileMenuButton: {
    display: { xs: "flex", sm: "none" },
    color: "white",
  },
  navLink: {
    color: "white",
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 500,
    px: 2,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  activeNavLink: {
    color: "#FFCC00",
    backgroundColor: "rgba(255, 204, 0, 0.1)",
  },
  drawer: {
    "& .MuiDrawer-paper": {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      pb: 2,
    },
  },
  drawerList: {
    width: "100%",
    pt: 2,
  },
  drawerItem: {
    py: 1.5,
  },
  drawerItemText: {
    fontSize: "1.1rem",
    fontWeight: 500,
  },
};

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const isHighlightsPage = location.pathname === "/highlights";

  const handleLogoClick = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  const handleHighlightsClick = () => {
    navigate("/highlights");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
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

            {/* Desktop Navigation */}
            <Box sx={styles.desktopNav}>
              <Button
                onClick={handleHomeClick}
                sx={{
                  ...styles.navLink,
                  ...(isHomePage && styles.activeNavLink),
                }}
              >
                Home
              </Button>
              <Button
                onClick={handleHighlightsClick}
                sx={{
                  ...styles.navLink,
                  ...(isHighlightsPage && styles.activeNavLink),
                }}
              >
                Highlights
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={styles.drawer}
      >
        <List sx={styles.drawerList}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleHomeClick}
              selected={isHomePage}
              sx={styles.drawerItem}
            >
              <ListItemText
                primary="Home"
                slotProps={{
                  primary: { sx: styles.drawerItemText },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleHighlightsClick}
              selected={isHighlightsPage}
              sx={styles.drawerItem}
            >
              <ListItemText
                primary="Highlights"
                slotProps={{
                  primary: { sx: styles.drawerItemText },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
