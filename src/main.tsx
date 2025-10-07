import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppThemeProvider, DevRouter, DevRoutes } from "@app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
createRoot(container).render(
  <StrictMode>
    <AppThemeProvider>
      <DevRouter>
        <DevRoutes />
      </DevRouter>
    </AppThemeProvider>
  </StrictMode>,
);
