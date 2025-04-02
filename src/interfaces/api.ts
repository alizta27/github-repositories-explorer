import { API_METHOD, TSFixMe } from "@/types";

export interface GenerateFetchInit {
  method?: string;
  body?: Record<string, TSFixMe>;
  authToken?: string;
}

export interface FetchOptions {
  method: API_METHOD;
  body?: TSFixMe;
  params?: Record<string, TSFixMe>;
}
