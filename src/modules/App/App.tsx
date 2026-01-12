import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { PokemonList } from "../PokemonList/PokemonList";

export const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Routes>
        <Route path="/" element={<PokemonList />} />
      </Routes>
    </Box>
  );
}
