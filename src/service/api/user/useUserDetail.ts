import { API_METHOD } from "@/types";

import { useAppQuery } from "@/hooks";

import { API_PATH } from "../../apiPath";
import { service } from "../../apiService";

import { userQueryKeys } from "./userQueryKeys";

export function useUserDetail(account_id: number) {
  return useAppQuery({
    queryKey: [userQueryKeys.datail(account_id)],
    queryFn: () =>
      service(API_PATH.USER.DETAIL(account_id), {
        method: API_METHOD.GET,
      }),
    enabled: Boolean(account_id),
    retry: false,
  });
}
