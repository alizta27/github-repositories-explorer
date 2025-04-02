export interface GlobalState {
  isLoading: boolean;
  apiKey: string;
  setIsLoading: (value: boolean) => void;
  setApiKey: (key: string) => void;
}

export interface SearchStateParams {
  page: number;
  per_page: number;
  q: string;
}

export interface SearchState {
  params: SearchStateParams;
  setParams: (
    value: string | number | undefined,
    key: keyof SearchStateParams,
  ) => void;
  resetState: () => void;
}
