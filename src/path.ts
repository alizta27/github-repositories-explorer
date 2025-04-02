import { FlattenKeys, PathObjectType } from "./types";

const PATH = {
  ROOT: "/",
  SEARCH: "search",
} as const;

const generateRoutes = <T extends PathObjectType>(
  obj: T,
  parentKey = "",
  parentPath = "",
): Record<FlattenKeys<T>, string> => {
  const routes = {} as Record<string, string>;

  for (const key in obj) {
    const currentValue = obj[key];
    const routeKey = parentKey
      ? `${parentKey}_${key}`.toUpperCase()
      : key.toUpperCase();

    if (typeof currentValue === "string") {
      if (key === "ROOT") {
        routes[routeKey] = currentValue;
      } else {
        const fullPath =
          parentPath === "/"
            ? `/${currentValue}`
            : `${parentPath}/${currentValue}`.replace(/\/+/g, "/");
        routes[routeKey] = fullPath;
      }
    } else {
      // Handle object paths
      if (currentValue.ROOT) {
        routes[`${routeKey}_ROOT`] =
          currentValue.ROOT === "/"
            ? "/"
            : `/${currentValue.ROOT}`.replace(/\/+/g, "/");
      }

      // Generate nested routes with the correct parent path
      const newParentPath = currentValue.ROOT
        ? `/${currentValue.ROOT}`.replace(/\/+/g, "/")
        : parentPath;

      const nestedRoutes = generateRoutes(
        currentValue,
        routeKey,
        newParentPath,
      );

      // Merge routes
      (Object.entries(nestedRoutes) as [string, string][]).forEach(
        ([key, value]) => {
          if (!key.endsWith("_ROOT") || !routes[key]) {
            routes[key] = value;
          }
        },
      );
    }
  }

  return routes as Record<FlattenKeys<T>, string>;
};

export const ROUTES = generateRoutes(PATH);

export const APP_ROOT_PATH = PATH.ROOT;
