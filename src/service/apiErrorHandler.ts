import { TSFixMe } from "@/types";

export interface ApiErrorObj {
  error: TSFixMe;
  message: string;
  code: number | undefined;
}

export const apiErrorHandler = (error: ApiErrorObj) => {
  const { code, message } = error;

  let key = "";
  if (!code) {
    if (message.includes("rate limit")) {
      key = "403";
    } else {
      key = "500";
    }
  } else {
    key = code.toString();
  }

  return key;
};
