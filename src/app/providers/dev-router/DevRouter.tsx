import type { PropsWithChildren } from "react";

let DevBrowserRouter: React.ComponentType<PropsWithChildren> | null = null;

if (import.meta.env.DEV) {
  const rrd = await import("react-router-dom");
  DevBrowserRouter = rrd.BrowserRouter;
}

export function DevRouter({ children }: PropsWithChildren) {
  if (!import.meta.env.DEV || !DevBrowserRouter) return <>{children}</>;
  const Router = DevBrowserRouter;
  return <Router>{children}</Router>;
}
