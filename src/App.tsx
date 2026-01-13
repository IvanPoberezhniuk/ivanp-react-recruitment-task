import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { PokemonListPage } from "./pages/PokemonListPage";
import { PokemonDetailPage } from "./pages/PokemonDetailPage";
import { HighlightsPage } from "./pages/HighlightsPage";
import { Header } from "./shared/components/Header/Header";
import { Footer } from "./shared/components/Footer/Footer";
import { GlobalSnackbar } from "./shared/components/GlobalSnackbar";
import { FeatureTour } from "./shared/components/FeatureTour";
import { StylesObject } from "./shared/types/styles.types";

const styles: StylesObject = {
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
      <Header />
      <Box component="main" sx={styles.main}>
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/highlights" element={<HighlightsPage />} />
          <Route path="/:id" element={<PokemonDetailPage />} />
        </Routes>
      </Box>
      <Footer />
      <GlobalSnackbar />
      <FeatureTour />
    </Box>
  );
}

