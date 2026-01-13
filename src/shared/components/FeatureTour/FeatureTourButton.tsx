import React from "react";

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Badge, Fab } from "@mui/material";

import { StylesObject } from "../../types/styles.types";

interface FeatureTourButtonProps {
  onClick: () => void;
  showBadge: boolean;
}

const styles: StylesObject = {
  fab: {
    position: "fixed",
    bottom: 16,
    left: 16,
    zIndex: 1300,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white",
    boxShadow: 4,
    "&:hover": {
      background: "linear-gradient(45deg, #1976D2 30%, #00B0D7 90%)",
      boxShadow: 6,
      transform: "scale(1.05)",
    },
    transition: "all 0.3s ease",
  },
  badge: {
    "& .MuiBadge-badge": {
      backgroundColor: "#ff4444",
      color: "white",
      fontWeight: 700,
      fontSize: "0.7rem",
      animation: "pulse 2s infinite",
    },
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
        opacity: 1,
      },
      "50%": {
        transform: "scale(1.1)",
        opacity: 0.8,
      },
      "100%": {
        transform: "scale(1)",
        opacity: 1,
      },
    },
  },
};

export const FeatureTourButton: React.FC<FeatureTourButtonProps> = ({
  onClick,
  showBadge,
}) => {
  return (
    <Badge
      badgeContent="NEW"
      color="error"
      invisible={!showBadge}
      sx={styles.badge}
    >
      <Fab
        color="primary"
        aria-label="feature tour"
        onClick={onClick}
        sx={styles.fab}
      >
        <LightbulbIcon />
      </Fab>
    </Badge>
  );
};
