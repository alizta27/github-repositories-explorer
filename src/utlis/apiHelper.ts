import { GenerateFetchInit } from "@/interfaces";

import config from "@/config";

export const generateUrl = (urlPath: string) => {
  return config.baseUrl + urlPath;
};

export const generateFetchInit = ({
  method,
  body,
  authToken,
}: GenerateFetchInit) => {
  const fetchInit: RequestInit = {
    method,
    headers: {
      Accept: "application/vnd.github+json",
    },
  };

  if (body) {
    fetchInit.body = JSON.stringify(body);
  }

  if (authToken) {
    (fetchInit.headers as Record<string, string>).Authorization = authToken;
  }

  return fetchInit;
};
