import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.scss";

import { AppProvider } from "./providers/AppProviders.tsx";
import { appRoutes } from "./routes.tsx";

const router = createBrowserRouter(appRoutes, {
  basename: "/github-repositories-explorer",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
);
