import { FetchOptions } from "@/interfaces";

import { useStore } from "@/store";

import { ApiErrorObj } from "./apiErrorHandler";

import { generateFetchInit, generateUrl } from "@/utlis/apiHelper";

export const service = async (urlPath: string, options: FetchOptions) => {
  let finalUrl = generateUrl(urlPath);
  const authToken = useStore.getState().global_apiKey;

  if (options.params) {
    const queryParams = new URLSearchParams(options.params).toString();
    finalUrl += `?${queryParams}`;
  }

  const fetchInit = generateFetchInit({
    ...options,
    authToken,
  });

  const response = await fetch(finalUrl, fetchInit);

  if (!response.ok) {
    const respJson = await response.json();

    const errorObj = {
      error: respJson.error,
      message: respJson.message,
      code: respJson.status,
    } as ApiErrorObj;

    throw new Error(JSON.stringify(errorObj));
  }

  if (response.status === 204) {
    return;
  }

  return response.json();
};
