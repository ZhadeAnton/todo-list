import { ThemeProvider } from "@emotion/react";
import type { PropsWithChildren } from "react";
import { useMemo } from "react";

const baseTheme = {
  colors: {
    primary: "#3f51b5",
    text: "#222",
    background: "#fff",
  },
  spacing: (factor: number) => `${4 * factor}px`,
};

export function AppThemeProvider({ children }: PropsWithChildren) {
  const theme = useMemo(() => baseTheme, []);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
