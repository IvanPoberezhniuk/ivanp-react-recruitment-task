import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert, AlertColor, Box, IconButton } from "@mui/material";

import { useAppDispatch } from "../../store";
import { removeSnackbar, SnackbarItem } from "../../store/slices/snackbarSlice";

const styles = {
  container: {
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column-reverse",
    gap: 0,
    alignItems: "flex-end",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      gap: 1,
    },
  },
  notificationWrapper: {
    position: "relative",
    width: { xs: "90vw", sm: "400px", md: "500px" },
    maxWidth: "500px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  alert: {
    width: "100%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "flex-start",
    minHeight: "56px",
    maxHeight: "200px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    pr: 1,
    "& .MuiAlert-message": {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      py: 0.5,
    },
    "& .MuiAlert-action": {
      display: "none",
    },
    // Softer background colors
    "&.MuiAlert-filledSuccess": {
      backgroundColor: "#4caf50",
    },
    "&.MuiAlert-filledError": {
      backgroundColor: "#e57373",
    },
    "&.MuiAlert-filledWarning": {
      backgroundColor: "#ffb74d",
    },
    "&.MuiAlert-filledInfo": {
      backgroundColor: "#64b5f6",
    },
  },
  messageContainer: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 1,
    minWidth: 0,
    width: "100%",
  },
  messageText: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: "all 0.3s ease-in-out",
    wordBreak: "break-word",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    minWidth: 0,
  },
  actions: {
    display: "flex",
    gap: 0.25,
    alignItems: "center",
    flexShrink: 0,
  },
  iconButton: {
    color: "inherit",
    p: 0.25,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
};

interface SnackbarStackProps {
  notifications: SnackbarItem[];
}

export const SnackbarStack: React.FC<SnackbarStackProps> = ({
  notifications,
}) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Auto-remove notifications after their duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        dispatch(removeSnackbar(notification.id));
      }, notification.autoHideDuration);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  const handleClose = (id: string) => {
    dispatch(removeSnackbar(id));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isTextLong = (text: string) => text.length > 100;

  const getStackStyle = (index: number, total: number) => {
    if (isHovered) {
      return {
        transform: "translateY(0) scale(1)",
        opacity: 1,
        zIndex: total - index,
        marginBottom: 0,
      };
    }

    // Stacked appearance when not hovered - very compact with negative margin
    const scale = 1 - index * 0.04; // 4% reduction per notification (no max limit)
    const opacity = 1 - Math.min(index * 0.1, 0.2); // Max 50% opacity reduction
    const marginBottom = index > 0 ? "-50px" : 0; // Overlap notifications significantly

    return {
      transform: `scale(${scale})`,
      opacity,
      zIndex: total - index,
      marginBottom,
    };
  };

  if (notifications.length === 0) return null;

  return (
    <Box
      sx={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {notifications.map((notification, index) => {
        const isExpanded = expandedIds.has(notification.id);
        const needsExpand = isTextLong(notification.message);

        return (
          <Box
            key={notification.id}
            sx={{
              ...styles.notificationWrapper,
              ...getStackStyle(index, notifications.length),
            }}
          >
            <Alert
              severity={notification.severity as AlertColor}
              variant="filled"
              icon={false}
              sx={{
                ...styles.alert,
                maxHeight: isExpanded ? "400px" : "60px",
                overflow: "hidden",
              }}
            >
              <Box sx={styles.messageContainer}>
                <Box
                  sx={{
                    ...styles.messageText,
                    display: isExpanded ? "block" : "-webkit-box",
                    WebkitLineClamp: isExpanded ? "unset" : 2,
                    WebkitBoxOrient: "vertical",
                    overflowY: isExpanded ? "auto" : "hidden",
                    maxHeight: isExpanded ? "350px" : "60px",
                    pr: 1,
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                      borderRadius: "3px",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.5)",
                      },
                    },
                  }}
                >
                  {notification.message}
                </Box>
                <Box sx={styles.actions}>
                  {needsExpand && (
                    <IconButton
                      size="small"
                      onClick={() => toggleExpand(notification.id)}
                      sx={styles.iconButton}
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <ExpandLessIcon fontSize="small" />
                      ) : (
                        <ExpandMoreIcon fontSize="small" />
                      )}
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleClose(notification.id)}
                    sx={styles.iconButton}
                    title="Close"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Alert>
          </Box>
        );
      })}
    </Box>
  );
};
