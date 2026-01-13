import { SxProps, Theme } from "@mui/material/styles";

/**
 * Reusable type for MUI sx style objects
 * Use this to type your styles objects without repeating ''
 */
export type StylesObject<T = Record<string, any>> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : SxProps<Theme>;
};

