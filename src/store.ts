import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import pokemonReducer from "./store/slices/pokemonSlice";

const createStore = (options?: ConfigureStoreOptions["preloadedState"]) =>
  configureStore({
    reducer: {
      pokemon: pokemonReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types for serializable check
          ignoredActions: ['pokemon/fetchPokemonList/fulfilled'],
        },
      }),
    ...options,
  });

export const store = createStore();
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
