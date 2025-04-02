import { StateCreator } from "zustand";

import { GlobalSlice } from "@/types";

import { createActionSetter } from "@/store/utils";

export const createGlobalSlice: StateCreator<GlobalSlice> = (set) => {
  const setAction = createActionSetter<GlobalSlice>(set);

  const global_setIsLoading = setAction("setIsLoading", (_, value) => ({
    global_isLoading: value,
  }));

  const global_setApiKey = setAction("global_setApiKey", (_, value) => ({
    global_apiKey: value,
  }));

  return {
    global_apiKey: "",
    global_isLoading: false,
    global_setIsLoading,
    global_setApiKey,
  };
};
