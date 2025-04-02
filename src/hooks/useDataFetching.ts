import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { TSFixMe } from "@/types";

import { useStore } from "@/store";

import { showErrorNotification, showRateLimitNotification } from "@/components";

import { apiErrorHandler } from "@/service";

interface UseDataFetchingParams {
  isPending?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: TSFixMe;
}

export const useDataFetching = ({
  isLoading,
  isError,
  error,
}: UseDataFetchingParams) => {
  const { t } = useTranslation();
  const { global_setIsLoading } = useStore((store) => store);

  useEffect(() => {
    global_setIsLoading(Boolean(isLoading));
  }, [isLoading, global_setIsLoading]);

  useEffect(() => {
    if (isError && error) {
      const parseErrorObj = JSON.parse(error.message);

      // can create helpers to handle error
      const txKey = apiErrorHandler(parseErrorObj);
      if (txKey === "403") {
        showRateLimitNotification(txKey);
      } else {
        showErrorNotification(t(`ERROR.${txKey}`), txKey);
      }
    }
  }, [isError, error, t]);
};
