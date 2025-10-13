import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppThemeProvider, DevRouter, DevRoutes } from "@app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

// Создаем клиент для TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Асинхронная функция для инициализации приложения
async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("@shared/mocks/browser");

  // Запускаем MSW только в dev режиме
  return worker.start({
    onUnhandledRequest: "bypass", // Пропускаем необработанные запросы
  });
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

// Запускаем MSW перед рендером приложения
enableMocking().then(() => {
  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <DevRouter>
            <DevRoutes />
          </DevRouter>
        </AppThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
});
