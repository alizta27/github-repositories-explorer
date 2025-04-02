import { RouteObject } from "react-router-dom";

import publicRoute from "./routes/PublicRoute";
import { PageNotFound } from "./pages";

export const appRoutes: RouteObject[] = [
  ...publicRoute,

  // Catch-all 404 route
  {
    path: "*",
    element: <PageNotFound />,
  },
];
