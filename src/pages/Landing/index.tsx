import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

import { landingIlu } from "@/assets/images";
import { ROUTES } from "@/path";

import { useStore } from "@/store";

import { InputSearch } from "@/components";

import styles from "./styles.module.scss";

export const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { search_setParams } = useStore((state) => state);

  const handleSearch = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);

  return (
    <main>
      <section className={styles.heroSection}>
        <Stack
          gap={10}
          justifyContent="center"
          width="100%"
          alignItems="center"
          sx={{
            padding: {
              xs: "0px 16px",
              sm: "0px 32px",
              md: "0px 64px",
              lg: "0px 150px",
            },
          }}
        >
          <h1 className={styles.heroText}>{t("LANDING.TITLE")}</h1>
          <Stack
            gap={5}
            alignItems="center"
            sx={{
              width: {
                xs: "100%",
                sm: "75%",
                md: "50%",
                lg: "50%",
              },
            }}
            width="50%"
          >
            <InputSearch
              onChange={(val: string) => search_setParams(val, "q")}
              handleSearch={handleSearch}
            />
            <img src={landingIlu} className={styles.landingIlu} />
          </Stack>
        </Stack>
      </section>
    </main>
  );
};
