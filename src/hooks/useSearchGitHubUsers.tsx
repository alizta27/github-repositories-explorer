import { useCallback, useEffect, useMemo, useState } from "react";

import { QueryRefetchType } from "@/types";
import { GitHubSearchResponse, GitHubUserOnSearchResult } from "@/interfaces";

import { useStore } from "@/store";

import { useSearchUser } from "@/service";

export const useSearchGitHubUsers = () => {
  const [listOfUsers, setListOfUsers] = useState<GitHubUserOnSearchResult[]>(
    []
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { search_params, search_setParams, search_resetState } = useStore(
    (state) => state
  );

  const {
    data: listOfUsersResponse,
    isLoading: isLoadingListOfUsers,
    refetch: fetchListOfUsers,
  }: {
    data: GitHubSearchResponse | undefined;
    isLoading: boolean;
    refetch: QueryRefetchType<GitHubSearchResponse>;
  } = useSearchUser(search_params);

  useEffect(() => {
    if (listOfUsersResponse) {
      if (search_params.page === 1) {
        setListOfUsers(listOfUsersResponse.items);
      } else {
        setListOfUsers((prevUsers) => [
          ...prevUsers,
          ...listOfUsersResponse.items,
        ]);
      }
    }
  }, [listOfUsersResponse, search_params.page]);

  useEffect(() => {
    if (!isLoadingListOfUsers) {
      setIsLoadingMore(false);
    }
  }, [isLoadingListOfUsers]);

  const isHaveNext = useMemo(() => {
    return listOfUsersResponse
      ? listOfUsers.length < listOfUsersResponse.total_count
      : false;
  }, [listOfUsersResponse, listOfUsers]);

  const loadMore = useCallback(() => {
    if (isHaveNext) {
      setIsLoadingMore(true);
      search_setParams((search_params.page || 1) + 1, "page");
    }
  }, [setIsLoadingMore, search_setParams, isHaveNext, search_params.page]);

  const newSearch = useCallback(
    (query: string) => {
      {
        if (search_params.q === query) return;
        search_resetState();
        search_setParams(query, "q");
        search_setParams(1, "page");
        setListOfUsers([]);
      }
    },
    [search_setParams, search_params, setListOfUsers, search_resetState]
  );

  return {
    listOfUsers,
    isLoadingListOfUsers,
    isLoadingMore,
    fetchListOfUsers,
    setSearchParams: search_setParams,
    isHaveNext,
    loadMore,
    resetListOfUsers: search_resetState,
    totalResultData: listOfUsersResponse?.total_count || 0,
    newSearch,
  };
};
