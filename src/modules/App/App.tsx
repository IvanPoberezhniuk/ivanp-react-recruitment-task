import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { PokemonList } from "../PokemonList/PokemonList";
import { PokemonDetailPage } from "../PokemonDetail/PokemonDetailPage";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

const styles = {
  root: {
    minHeight: "100vh",
    bgcolor: "background.default",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
};

export const App = () => {
  return (
    <Box sx={styles.root}>
      {/* Header - persists across all routes */}
      <Header />

      {/* Main Content Area */}
      <Box component="main" sx={styles.main}>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/:id" element={<PokemonDetailPage />} />
        </Routes>
      </Box>

      {/* Footer - persists across all routes */}
      <Footer />
    </Box>
  );
}
