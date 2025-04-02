import { Stack } from "@mui/material";

import { GitHubUserOnSearchResult } from "@/interfaces";

import { RenderTextItem } from "@/components/molecules";

import styles from "./styles.module.scss";

interface UserCardDetailListProps {
  item: GitHubUserOnSearchResult;
}

export const UserCardDetailList: React.FC<UserCardDetailListProps> = ({
  item,
}) => {
  return (
    <Stack spacing={0.5}>
      <p className={styles.username}>{item.login}</p>
      <RenderTextItem
        account_id={item.id}
        keyDataToRender="public_repos"
        textPrefix="Public Repos"
      />
      <RenderTextItem
        account_id={item.id}
        keyDataToRender="followers"
        textPrefix="Followers"
      />
      <RenderTextItem
        account_id={item.id}
        keyDataToRender="following"
        textPrefix="Following"
      />
    </Stack>
  );
};
