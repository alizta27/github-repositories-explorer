import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { useDataFetching } from "./useDataFetching";

export const useAppQuery = <TData>(queryOpt: UseQueryOptions<TData>) => {
  const queryResult = useQuery(queryOpt);

  useDataFetching(queryResult);

  return queryResult;
};
