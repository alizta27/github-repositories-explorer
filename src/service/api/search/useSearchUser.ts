import { API_METHOD } from "@/types";
import { SearchStateParams } from "@/interfaces";

import { useAppQuery } from "@/hooks";

import { API_PATH } from "../../apiPath";
import { service } from "../../apiService";

import { searchQueryKeys } from "./searchQueryKeys";

export function useSearchUser(params: SearchStateParams) {
  return useAppQuery({
    queryKey: [searchQueryKeys.all(params)],
    queryFn: () =>
      service(API_PATH.SEARCH, {
        method: API_METHOD.GET,
        params: params,
      }),
    enabled: false,
    retry: false,
  });
}
