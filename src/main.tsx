import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppThemeProvider, DevNavigation, DevRouter, DevRoutes } from "@app";
import { App } from "@app/App";
import "./index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
createRoot(container).render(
  <StrictMode>
    <AppThemeProvider>
      <DevRouter>
        <DevNavigation>{import.meta.env.DEV ? <DevRoutes /> : <App />}</DevNavigation>
      </DevRouter>
    </AppThemeProvider>
  </StrictMode>,
);
