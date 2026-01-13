import React from "react";

import { useNavigate } from "react-router-dom";

import ApiIcon from "@mui/icons-material/Api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";

import { useAppDispatch } from "../../../store";
import {
  showSnackbar,
  SnackbarSeverity,
} from "../../../store/slices/snackbarSlice";
import { StylesObject } from "../../types/styles.types";

const styles: StylesObject = {
  footer: {
    bgcolor: "background.paper",
    borderTop: "1px solid",
    borderColor: "divider",
    py: 4,
    mt: "auto",
  },
  container: {
    display: "flex",
    justifyContent: { md: "space-between" },
    flexWrap: "wrap",

    gap: 1.5,
  },
  section: {
    display: "flex",
    flexDirection: "column",
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
  testButton: {
    textTransform: "none",
    borderRadius: 2,
    px: 2,
    py: 1,
  },
  testButtonGroup: {
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const messages = {
    success: [
      "Pokemon caught successfully! 🎉",
      "Data loaded perfectly! ✨",
      "Operation completed! 🎊",
      "Great job, Trainer! 🌟",
      "Mission accomplished! 🏆",
    ],
    error: [
      "Failed to catch Pokemon! ❌",
      "Connection error occurred! 🔌",
      "Something went wrong! ⚠️",
      "Unable to load data! 💥",
      "Operation failed! 🚫",
    ],
    warning: [
      "Pokemon is already in your collection! ⚡",
      "Low battery warning! 🔋",
      "Approaching storage limit! 📦",
      "Network connection unstable! 📡",
      "Cache needs clearing! 🗑️",
    ],
    info: [
      "Did you know? Pikachu is the most popular Pokemon! 💡",
      "Loading Pokemon data... 📊",
      "Tip: Use search to find Pokemon faster! 🔍",
      "New features coming soon! 🚀",
      "Check out the GraphQL API! 📡",
    ],
  };

  const handleTestMultiple = () => {
    // Generate 3 notifications with slight delay
    const severities: SnackbarSeverity[] = [
      "success",
      "error",
      "warning",
      "info",
    ];

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const randomSeverity =
          severities[Math.floor(Math.random() * severities.length)];
        const messagesForSeverity = messages[randomSeverity];
        const randomMessage =
          messagesForSeverity[
            Math.floor(Math.random() * messagesForSeverity.length)
          ];

        dispatch(
          showSnackbar({
            message: randomMessage,
            severity: randomSeverity,
            autoHideDuration: 10000, // Longer duration to see stacking
          })
        );
      }, i * 100); // 100ms delay between each
    }
  };

  const handleTestLongText = () => {
    dispatch(
      showSnackbar({
        message:
          "This is a very long notification message that demonstrates the expand/collapse functionality. When text exceeds 60 characters, an expand button will appear allowing you to read the full message. This is useful for detailed error messages or important information that needs more space! 🚀",
        severity: "info",
        autoHideDuration: 15000,
      })
    );
  };

  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="lg">
        <Box sx={styles.container}>
          {/* Navigation Section */}
          <Box sx={styles.section}>
            <Typography variant="h6" sx={styles.sectionTitle}>
              Navigation
            </Typography>
            <Link
              onClick={() => navigate("/")}
              sx={{ ...styles.link, cursor: "pointer" }}
            >
              <HomeIcon fontSize="small" />
              Home
            </Link>
            <Link
              onClick={() => navigate("/highlights")}
              sx={{ ...styles.link, cursor: "pointer" }}
            >
              <InfoIcon fontSize="small" />
              Highlights
            </Link>
            <Link href="#about" sx={styles.link}>
              <InfoIcon fontSize="small" />
              About
            </Link>
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

          {/* Test Notification Buttons */}
          <Box sx={styles.testButtonGroup}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleTestMultiple}
              sx={styles.testButton}
            >
              Test Stack x3
            </Button>
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={handleTestLongText}
              sx={styles.testButton}
            >
              Test Long Text
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
            Pokémon and Pokémon character names are trademarks of Nintendo.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
