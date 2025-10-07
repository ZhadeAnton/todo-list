import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import { useMemo } from "react";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// Расширяем MUI тему нашими кастомными свойствами
const extendedTheme = {
  ...muiTheme,
  colors: {
    primary: "#3f51b5",
    text: "#222",
    background: "#fff",
  },
  spacing: (factor: number) => `${4 * factor}px`,
};

export function AppThemeProvider({ children }: PropsWithChildren) {
  const theme = useMemo(() => extendedTheme, []);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
