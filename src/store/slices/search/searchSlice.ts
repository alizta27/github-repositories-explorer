import { StateCreator } from "zustand";

import { SearchSlice } from "@/types";

import { createActionSetter } from "@/store/utils";

import { defaultValue } from "./defaultValue";

export const createSearchSlice: StateCreator<SearchSlice> = (set) => {
  const setAction = createActionSetter<SearchSlice>(set);

  const search_setParams = setAction(
    "search_setParams",
    (state, value, key) => {
      const finalValue = {
        ...state.search_params,
        [key]: value,
      };

      return {
        search_params: finalValue,
      };
    },
  );

  const search_resetState = setAction("search_resetState", () => ({
    search_params: defaultValue,
  }));

  return {
    search_params: defaultValue,
    search_setParams,
    search_resetState,
  };
};
