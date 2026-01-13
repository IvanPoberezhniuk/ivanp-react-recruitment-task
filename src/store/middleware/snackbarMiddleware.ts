import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  fetchPokemonList,
  fetchPokemonById,
  searchPokemon,
} from "../slices/pokemonSlice";
import { showSnackbar } from "../slices/snackbarSlice";

export const snackbarMiddleware = createListenerMiddleware();

// Listen for fetchPokemonList errors
snackbarMiddleware.startListening({
  actionCreator: fetchPokemonList.rejected,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(
      showSnackbar({
        message: action.error.message || "Failed to fetch Pokemon list",
        severity: "error",
      })
    );
  },
});

// Listen for fetchPokemonById errors
snackbarMiddleware.startListening({
  actionCreator: fetchPokemonById.rejected,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(
      showSnackbar({
        message: action.error.message || "Failed to fetch Pokemon details",
        severity: "error",
      })
    );
  },
});

// Listen for searchPokemon errors
snackbarMiddleware.startListening({
  actionCreator: searchPokemon.rejected,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(
      showSnackbar({
        message: action.error.message || "Pokemon not found",
        severity: "error",
      })
    );
  },
});
