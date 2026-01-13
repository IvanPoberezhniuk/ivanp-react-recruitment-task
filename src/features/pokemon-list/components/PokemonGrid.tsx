import React from "react";
import { Box } from "@mui/material";
import { Pokemon } from "../../../shared/types/pokemon.types";
import { PokemonCard } from "../../pokemon-card/PokemonCard";
import { PokemonCardList } from "../../pokemon-card/PokemonCardList";
import { StylesObject } from "../../../shared/types/styles.types";

interface PokemonGridProps {
  pokemons: Pokemon[];
  viewMode: "grid" | "list";
  onPokemonClick: (pokemon: Pokemon) => void;
}

const styles: StylesObject = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(auto-fill, minmax(150px, 1fr))",
      sm: "repeat(auto-fill, minmax(180px, 1fr))",
      md: "repeat(auto-fill, minmax(200px, 1fr))",
    },
    gap: 2,
    mb: 4,
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 4,
  },
};

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  viewMode,
  onPokemonClick,
}) => {
  return (
    <Box sx={viewMode === "grid" ? styles.gridContainer : styles.listContainer}>
      {pokemons.map((pokemon) => (
        <Box key={pokemon.id}>
          {viewMode === "grid" ? (
            <PokemonCard pokemon={pokemon} onClick={onPokemonClick} />
          ) : (
            <PokemonCardList pokemon={pokemon} onClick={onPokemonClick} />
          )}
        </Box>
      ))}
    </Box>
  );
};
