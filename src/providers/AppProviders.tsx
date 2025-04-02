import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { useStore } from "@/store";
import { ReactQueryProvider } from "./ReactQueryProvider";

import { i18n } from "@/i18n";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  // handle global loading here
  // const { global_isLoading: isLoading } = useStore((state) => state);

  return (
    <ReactQueryProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <I18nextProvider i18n={i18n}>
          {children}
          <ToastContainer />
        </I18nextProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
