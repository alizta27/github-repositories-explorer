import React from "react";
import { Grid, Skeleton } from "@mui/material";

import { TSFixMe } from "@/types";

import styles from "./styles.module.scss";

interface TextItemProps {
  text: TSFixMe;
  prefix: string;
  loading: boolean | undefined;
}

export const TextItem: React.FC<TextItemProps> = ({
  text,
  prefix,
  loading,
}) => {
  return !loading ? (
    <Grid container spacing={1}>
      <Grid>
        <p className={styles.prefix}>{prefix}:</p>
      </Grid>
      <Grid size="grow">
        <p className={styles.text}>{text ? text : "-"}</p>
      </Grid>
    </Grid>
  ) : (
    <Skeleton />
  );
};
