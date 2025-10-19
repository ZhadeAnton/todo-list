import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { useRoutes, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("@pages/Home/HomePage"));
const LoginPage = lazy(() => import("@pages/Login/LoginPage"));

const routes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/home", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
];

export function DevRoutes() {
  const element = useRoutes(routes);
  return <Suspense fallback={null}>{element}</Suspense>;
}
