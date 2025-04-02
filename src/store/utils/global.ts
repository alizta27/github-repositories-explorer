import { TSFixMe } from "@/types";

export const createActionSetter =
  <T>(
    set: (
      fn: (state: T) => Partial<T>,
      replace?: TSFixMe,
      actionName?: string,
    ) => void,
  ) =>
  <A extends TSFixMe[]>(
    key: string,
    updater: (state: T, ...args: A) => Partial<T>,
  ) =>
  (...args: A) =>
    set((state) => updater(state, ...args), undefined, key);

export const mergePersistState = <T extends Record<string, TSFixMe>>(
  newObj: T,
  oldObj: unknown, // Accept unknown type for oldObj
): T => {
  const merged: T = { ...newObj }; // Ensure merged has the same structure as newObj

  if (typeof oldObj !== "object" || oldObj === null) {
    return merged; // If oldObj is not an object, return newObj as it is
  }

  for (const key in newObj) {
    if (typeof newObj[key] === "object" && newObj[key] !== null) {
      merged[key] = { ...newObj[key] }; // Clone object to avoid mutation

      for (const subKey in newObj[key]) {
        if (
          typeof newObj[key][subKey] === "function" &&
          (oldObj as TSFixMe)[key] &&
          typeof (oldObj as TSFixMe)[key][subKey] === "function"
        ) {
          // Take function from newObj
          merged[key][subKey] = newObj[key][subKey];
        } else {
          // Keep primitive value from oldObj if available, otherwise use newObj
          merged[key][subKey] =
            (oldObj as TSFixMe)[key] &&
            (oldObj as TSFixMe)[key][subKey] !== undefined
              ? (oldObj as TSFixMe)[key][subKey]
              : newObj[key][subKey];
        }
      }
    } else {
      // Copy non-object values from oldObj if available, otherwise use newObj
      merged[key] =
        (oldObj as TSFixMe)[key] !== undefined
          ? (oldObj as TSFixMe)[key]
          : newObj[key];
    }
  }

  return merged;
};
