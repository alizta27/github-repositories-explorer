import { SearchStateParams } from "@/interfaces";

export const searchQueryKeys = {
  all: (params: SearchStateParams) => ["search", params],
};
