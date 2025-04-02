import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, Input, Link, Stack } from "@mui/material";

import { GITHUB_PAT_LINK } from "@/constants";

import { useStore } from "@/store";

import styles from "./styles.module.scss";

export const RateLimitToastComponent = () => {
  const { t } = useTranslation();
  const [showKey, setShowKey] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const { global_setApiKey } = useStore((state) => state);

  const inputIcon = useMemo(() => {
    if (showKey) {
      return <VisibilityIcon />;
    }
    return <VisibilityOffIcon />;
  }, [showKey]);

  const toggleShowApiKey = useCallback(() => {
    setShowKey((prevState) => !prevState);
  }, [setShowKey]);

  const handleSubmitKey = useCallback(() => {
    global_setApiKey(value);
    toast.dismiss();
  }, [value, global_setApiKey]);

  return (
    <Stack spacing={2}>
      <p className={styles.desc}>{t("RATE_LIMIT_NOTIF.NOTIF_DESC")}</p>
      <Link
        href={GITHUB_PAT_LINK}
        target="_blank"
        fontSize={14}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        {t("RATE_LIMIT_NOTIF.NOTIF_DESC_EXTRA")}
      </Link>
      <Stack spacing={1}>
        <label className={styles.label}>
          {t("RATE_LIMIT_NOTIF.INPUT_LABEL")}
        </label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={showKey ? "text" : "password"}
          renderSuffix={() => (
            <IconButton onClick={toggleShowApiKey}>{inputIcon}</IconButton>
          )}
          className={styles.apiKeyInput}
        />
        <Button onClick={handleSubmitKey}>{t("BUTTON.SUBMIT_KEY")}</Button>
      </Stack>
    </Stack>
  );
};
