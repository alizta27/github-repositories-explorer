import { toast, ToastOptions } from "react-toastify";

import { RateLimitToastComponent } from "../RateLimitToastComponent";

export const showSuccessNotification = (
  message: string,
  id: string | number,
  opt: ToastOptions = {},
) => {
  if (toast.isActive(id)) return;

  const options = {
    toastId: id,
    theme: "dark",
    position: "top-center",
    pauseOnFocusLoss: false,
    closeOnClick: true,
    autoClose: 2000,
    ...opt,
  } as const;
  return toast.success(message, options);
};

export const showErrorNotification = (
  message: string,
  id: string | number,
  opt: ToastOptions = {},
) => {
  if (toast.isActive(id)) return;

  const options = {
    toastId: id,
    theme: "dark",
    position: "top-center",
    pauseOnFocusLoss: false,
    closeOnClick: true,
    autoClose: 2000,
    ...opt,
  } as const;
  return toast.error(message, options);
};

export const showRateLimitNotification = (
  id: string | number,
  opt: ToastOptions = {},
) => {
  if (toast.isActive(id)) return;

  const options = {
    toastId: id,
    position: "top-center",
    closeOnClick: false,
    autoClose: false,
    hideProgressBar: true,
    ...opt,
  } as const;

  return toast(<RateLimitToastComponent />, options);
};
