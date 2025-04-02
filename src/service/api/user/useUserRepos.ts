import { API_METHOD } from "@/types";

import { useAppQuery } from "@/hooks";

import { API_PATH } from "../../apiPath";
import { service } from "../../apiService";

import { userQueryKeys } from "./userQueryKeys";

export function useUserRepos(username: string) {
  return useAppQuery({
    queryKey: [userQueryKeys.repos(username)],
    queryFn: () =>
      service(API_PATH.USER.REPOS(username), {
        method: API_METHOD.GET,
      }),
    enabled: Boolean(username),
    retry: false,
  });
}
