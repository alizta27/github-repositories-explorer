export const API_PATH = {
  SEARCH: "/search/users",
  USER: {
    DETAIL: (account_id: number) => `/user/${account_id}`,
    REPOS: (username: string) => `/users/${username}/repos`,
  },
};
