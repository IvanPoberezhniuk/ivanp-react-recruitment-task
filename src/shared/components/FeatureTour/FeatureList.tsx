import React, { useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Chip,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { scrollbarStyles } from "../../../theme/theme";
import { StylesObject } from "../../types/styles.types";
import { features } from "./featureData";

interface FeatureListProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles: StylesObject = {
  container: {
    position: "fixed",
    bottom: 80,
    left: 16,
    zIndex: 1300,
    maxWidth: 450,
    width: "calc(100vw - 32px)",
  },
  paper: {
    maxHeight: "75vh",
    overflowY: "auto",
    backgroundColor: "background.paper",
    boxShadow: 6,
    borderRadius: 2,
    ...scrollbarStyles.medium,
  },
  header: {
    p: 2,
    pb: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    backgroundColor: "background.paper",
    zIndex: 1,
    borderBottom: "1px solid",
    borderColor: "divider",
  },
  title: {
    fontWeight: 700,
    fontSize: "1.25rem",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "text.secondary",
    mt: 0.5,
  },
  list: {
    p: 0,
  },
  listItem: {
    py: 1.5,
    px: 2,
    gap: 2,
    alignItems: "flex-start",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "action.hover",
    },
  },
  icon: {
    fontSize: "1.5rem",
    minWidth: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontWeight: 600,
    fontSize: "0.95rem",
    mb: 0.5,
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  featureDescription: {
    fontSize: "0.85rem",
    color: "text.secondary",
    lineHeight: 1.5,
    mb: 1,
  },
  reason: {
    fontSize: "0.8rem",
    color: "text.secondary",
    fontStyle: "italic",
    mb: 1,
    p: 1,
    backgroundColor: "action.hover",
    borderRadius: 1,
    borderLeft: "3px solid",
    borderColor: "primary.main",
  },
  prosConsContainer: {
    mt: 1,
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  proConItem: {
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "flex-start",
    gap: 0.5,
    lineHeight: 1.4,
  },
  proIcon: {
    fontSize: "1rem",
    color: "success.main",
    mt: 0.2,
  },
  expandedContent: {
    mt: 1,
    pt: 1,
    borderTop: "1px solid",
    borderColor: "divider",
  },
  sectionTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
    mb: 0.5,
    color: "text.primary",
  },
  contentBox: {
    flex: 1,
  },
  titleChip: {
    ml: "auto",
    fontSize: "0.7rem",
  },
  proConText: {
    flex: 1,
  },
};

export const FeatureList: React.FC<FeatureListProps> = ({
  isOpen,
  onClose,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Collapse in={isOpen} timeout={300}>
      <Box sx={styles.container}>
        <Paper sx={styles.paper} elevation={8}>
          <Box sx={styles.header}>
            <Box>
              <Typography sx={styles.title}>✨ Feature Highlights</Typography>
              <Typography sx={styles.subtitle}>
                Implementation details, pros & cons
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="close feature tour"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={styles.list}>
            {features.map((feature, index) => {
              const isExpanded = expandedId === feature.id;

              return (
                <React.Fragment key={feature.id}>
                  <ListItem
                    sx={styles.listItem}
                    onClick={() => toggleExpand(feature.id)}
                  >
                    <Box sx={styles.icon}>{feature.icon}</Box>
                    <Box sx={styles.contentBox}>
                      <Typography sx={styles.featureTitle}>
                        {feature.title}
                        <Chip
                          label={isExpanded ? "Less" : "More"}
                          size="small"
                          variant="outlined"
                          icon={
                            isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                          }
                          sx={styles.titleChip}
                        />
                      </Typography>

                      <Typography sx={styles.featureDescription}>
                        {feature.description}
                      </Typography>

                      <Collapse in={isExpanded} timeout={200}>
                        <Box sx={styles.expandedContent}>
                          {/* Reason */}
                          <Typography sx={styles.reason}>
                            💡 <strong>Why:</strong> {feature.reason}
                          </Typography>

                          {/* Pros */}
                          <Box sx={styles.prosConsContainer}>
                            <Box>
                              <Typography sx={styles.sectionTitle}>
                                ✅ Pros:
                              </Typography>
                              <Stack spacing={0.5}>
                                {feature.pros.map((pro, idx) => (
                                  <Box key={idx} sx={styles.proConItem}>
                                    <CheckCircleIcon sx={styles.proIcon} />
                                    <Typography
                                      variant="body2"
                                      sx={styles.proConText}
                                    >
                                      {pro}
                                    </Typography>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  </ListItem>
                  {index < features.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Collapse>
  );
};
