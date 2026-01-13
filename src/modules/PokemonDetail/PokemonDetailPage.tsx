import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Alert,
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  clearSelectedPokemon,
  fetchPokemonById,
} from "../../store/slices/pokemonSlice";

import { PokemonHeader } from "./components/PokemonHeader";
import { PokemonImageSection } from "./components/PokemonImageSection";
import { PokemonInfo } from "./components/PokemonInfo";
import { BattleStats } from "./components/BattleStats";
import { LearnableMoves } from "./components/LearnableMoves";
import { GameAppearances } from "./components/GameAppearances";
import { LightboxSlide } from "./types/pokemonDetail.types";
import { pokemonDetailStyles as styles } from "./styles/pokemonDetailStyles";
import { statsStyles } from "./styles/statsStyles";

export const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPokemon, loading, error } = useAppSelector(
    (state) => state.pokemon
  );

  const [showShiny, setShowShiny] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const pokemonId = !isNaN(Number(id)) ? Number(id) : id;
      dispatch(fetchPokemonById(pokemonId));
    }

    return () => {
      dispatch(clearSelectedPokemon());
    };
  }, [id, dispatch]);

  const handleBreadcrumbClick = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={styles.container}>
        <Box sx={styles.loadingContainer}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={styles.container}>
        <Box sx={styles.errorContainer}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  if (!selectedPokemon) {
    return null;
  }

  const getBaseStatTotal = (): number => {
    if (!selectedPokemon.stats) return 0;
    return selectedPokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  };

  const getPokemonTypes = (): string[] => {
    return selectedPokemon.types?.map((t) => t.type.name) || [];
  };

  const getSprites = () => {
    const sprites = selectedPokemon.sprites;
    if (!sprites) return [];

    const spriteList = [
      {
        src: showShiny
          ? sprites.other?.["official-artwork"]?.front_shiny ||
            sprites.front_shiny ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${selectedPokemon.id}.png`
          : sprites.other?.["official-artwork"]?.front_default ||
            sprites.front_default ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`,
        title: showShiny ? "Official (Shiny)" : "Official Artwork",
      },
      { src: sprites.front_default || "", title: "Front" },
      { src: sprites.front_shiny || "", title: "Shiny" },
      { src: sprites.back_default || "", title: "Back" },
      { src: sprites.back_shiny || "", title: "Back Shiny" },
      { src: sprites.other?.dream_world?.front_default || "", title: "Dream" },
      { src: sprites.other?.home?.front_default || "", title: "Home" },
    ];

    return spriteList.filter((sprite) => sprite.src);
  };

  const getLightboxSlides = (): LightboxSlide[] => {
    return getSprites().map((sprite) => ({
      src: sprite.src,
      title: sprite.title,
    }));
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={styles.breadcrumbs}
      >
        <Link sx={styles.breadcrumbLink} onClick={handleBreadcrumbClick}>
          <HomeIcon fontSize="small" />
          <Typography>Home</Typography>
        </Link>
        <Typography color="text.primary" sx={styles.breadcrumbText}>
          {selectedPokemon.name}
        </Typography>
      </Breadcrumbs>

      <Box sx={styles.contentContainer}>
        <PokemonHeader
          name={selectedPokemon.name}
          id={selectedPokemon.id}
          cryUrl={selectedPokemon.cries?.latest}
          showShiny={showShiny}
          onToggleShiny={() => setShowShiny(!showShiny)}
        />

        <PokemonImageSection
          pokemon={selectedPokemon}
          showShiny={showShiny}
          onImageClick={() => setLightboxOpen(true)}
          selectedImageIndex={selectedImageIndex}
          onSpriteSelect={setSelectedImageIndex}
          imageUrl={getLightboxSlides()[selectedImageIndex]?.src || ""}
          sprites={getSprites()}
          types={getPokemonTypes()}
        />

        <Box sx={styles.rightColumn}>
          <Box sx={statsStyles.statsRow}>
            <PokemonInfo
              types={selectedPokemon.types}
              abilities={selectedPokemon.abilities}
              height={selectedPokemon.height}
              weight={selectedPokemon.weight}
              baseExperience={selectedPokemon.base_experience}
              baseStatTotal={getBaseStatTotal()}
            />

            <BattleStats stats={selectedPokemon.stats} />
          </Box>

          <LearnableMoves moves={selectedPokemon.moves} />

          <GameAppearances gameIndices={selectedPokemon.game_indices} />
        </Box>
      </Box>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={getLightboxSlides().map((slide) => ({
          src: slide.src,
          alt: slide.title,
        }))}
        index={selectedImageIndex}
        on={{
          view: ({ index }) => setSelectedImageIndex(index),
        }}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{
          position: "bottom",
          width: 80,
          height: 80,
          border: 2,
          borderRadius: 4,
          padding: 0,
          gap: 8,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
      />
    </Container>
  );
};
