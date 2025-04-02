import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { StoreType } from "@/types";
import { EXCLUDE_SLICES } from "@/constants";

import { createGlobalSlice, createSearchSlice } from "./slices";

export const useStore = create<StoreType>()(
  devtools(
    persist(
      (...args) => ({
        ...createGlobalSlice(...args),
        ...createSearchSlice(...args),
      }),
      {
        name: "app-store",
        partialize: (state) => {
          return Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !EXCLUDE_SLICES.includes(key),
            ),
          );
        },
      },
    ),
  ),
);
