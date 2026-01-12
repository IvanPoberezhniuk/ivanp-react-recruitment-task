import React, { useRef, useState } from "react";
import { Box, IconButton, Slider, Tooltip, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { PokemonHeaderProps } from "../types/pokemonDetail.types";
import { headerStyles as styles } from "../styles/headerStyles";

export const PokemonHeader: React.FC<PokemonHeaderProps> = ({
  name,
  id,
  cryUrl,
  showShiny,
  onToggleShiny,
}) => {
  const [volume, setVolume] = useState(15);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playCry = () => {
    if (cryUrl) {
      const audio = new Audio(cryUrl);
      audio.volume = volume / 100;
      audio.play();
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleVolumeMouseEnter = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolumeControl(true);
  };

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeControl(false);
    }, 1000);
  };

  return (
    <Box sx={styles.headerContainer}>
      <Box sx={styles.headerLeft}>
        <Typography variant="h2" component="h1" sx={styles.pokemonName}>
          {name}
        </Typography>
        <Typography variant="h6" sx={styles.pokemonNumber}>
          #{String(id).padStart(3, "0")}
        </Typography>
      </Box>

      <Box sx={styles.headerButtons}>
        {cryUrl && (
          <Box
            sx={styles.volumeControlContainer}
            onMouseEnter={handleVolumeMouseEnter}
            onMouseLeave={handleVolumeMouseLeave}
          >
            <Box
              sx={styles.volumeSliderBox}
              className={showVolumeControl ? "visible" : ""}
              onMouseEnter={handleVolumeMouseEnter}
              onMouseLeave={handleVolumeMouseLeave}
            >
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                min={0}
                max={100}
                orientation="vertical"
                sx={styles.volumeSlider}
              />
            </Box>
            <Tooltip title="Play Cry">
              <IconButton
                onClick={playCry}
                sx={styles.audioButton}
                color="primary"
                size="small"
              >
                <VolumeUpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Tooltip title={showShiny ? "Show Normal" : "Show Shiny"}>
          <IconButton
            onClick={onToggleShiny}
            sx={styles.shinyButton}
            color="secondary"
            size="small"
          >
            <AutoAwesomeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

