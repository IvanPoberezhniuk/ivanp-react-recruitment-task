import React from "react";
import { Box, Paper } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { PokemonImageSectionProps } from "../types/pokemonDetail.types";
import { imageStyles as styles } from "../styles/imageStyles";
import { pokemonDetailStyles } from "../styles/pokemonDetailStyles";

export const PokemonImageSection: React.FC<PokemonImageSectionProps> = ({
  pokemon,
  showShiny,
  onImageClick,
  selectedImageIndex,
  onSpriteSelect,
  imageUrl,
  sprites,
  types,
}) => {
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    dragFree: true,
  });

  const renderSprite = (src: string, title: string, index: number) => {
    return (
      <Box
        sx={styles.spriteBox(index === selectedImageIndex)}
        onClick={() => onSpriteSelect(index)}
      >
        <Box
          component="img"
          src={src}
          alt={title}
          sx={styles.spriteImage}
          loading="lazy"
        />
      </Box>
    );
  };

  return (
    <Box sx={pokemonDetailStyles.leftColumn}>
      <Paper elevation={3} sx={styles.imagePaper(types)}>
        <Box
          component="img"
          src={imageUrl}
          alt={pokemon.name}
          sx={styles.image}
          onClick={onImageClick}
        />
      </Paper>
      <Box sx={styles.spriteGallery}>
        <Box sx={styles.emblaViewport} ref={emblaRef}>
          <Box sx={styles.emblaContainer}>
            {sprites.map(({ src, title }, index) => (
              <Box key={title} sx={styles.emblaSlide}>
                {renderSprite(src, title, index)}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

