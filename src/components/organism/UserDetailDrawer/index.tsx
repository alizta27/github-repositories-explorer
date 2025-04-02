import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import DeviceHubOutlinedIcon from "@mui/icons-material/DeviceHubOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Card,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Skeleton,
  Stack,
} from "@mui/material";

import { QueryRefetchType } from "@/types";
import { GithubRepository } from "@/interfaces/gitHubRepo";

import styles from "./styles.module.scss";

import { useUserRepos } from "@/service";

interface UserDetailDrawerProps {
  open: boolean;
  setOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
  username: string | null;
  userDetailContent: ReactNode;
}

export const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({
  open,
  setOpen,
  username,
  userDetailContent,
}) => {
  const { t } = useTranslation();

  const {
    data: userRepos,
    refetch: fetchUserRepos,
    isLoading: isLoadingRepos,
  }: {
    isLoading: boolean;
    data: GithubRepository[] | undefined;
    refetch: QueryRefetchType<GithubRepository[]>;
  } = useUserRepos(username ?? "");

  useEffect(() => {
    if (username) {
      fetchUserRepos();
    }
  }, [username, fetchUserRepos]);

  return (
    <Drawer
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "100%",
              sm: "50%",
              md: "35%",
              lg: "25%",
            },
          },
        },
      }}
      anchor="right"
      open={open}
      onClose={setOpen}
      title="ok boss"
    >
      <Stack
        className={styles.headerContainer}
        position="fixed"
        bgcolor="#121212"
        top={0}
        width="100%"
        zIndex={1000}
      >
        <Stack
          pr={1.5}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={setOpen}>
            <CloseIcon />
          </IconButton>

          <p className={styles.drawerTitle}>{t("DETAIL.TITLE")}</p>
        </Stack>
        <Divider />
      </Stack>
      <Stack p={1.5} spacing={3} pt={8}>
        <Card>{userDetailContent ? userDetailContent : null}</Card>
        <Divider>
          <p className={styles.dividerText}>REPOSITORIES</p>
        </Divider>
        <Stack spacing={1.5}>
          {isLoadingRepos ? (
            Array(5)
              .fill(null)
              .map((_, idx) => (
                <Skeleton key={idx.toString()} variant="rounded" height={100} />
              ))
          ) : userRepos?.length ? (
            userRepos?.map((item) => (
              <Card>
                <Stack spacing={1} p={1}>
                  <Stack spacing={0.5}>
                    <p className={styles.repoTitle}>{item.name}</p>
                    <p className={styles.repoInfo}>
                      {item.description ? item.description : "-"}
                    </p>
                  </Stack>
                  <Divider />

                  <Stack direction="row" spacing={0.5}>
                    <Chip
                      icon={
                        <DeviceHubOutlinedIcon
                          sx={{
                            width: 14,
                            height: 14,
                          }}
                        />
                      }
                      size="small"
                      variant="outlined"
                      label={`Forks ${item?.forks_count}`}
                    />
                    <Chip
                      icon={
                        <StarOutlinedIcon
                          sx={{
                            width: 14,
                            height: 14,
                          }}
                        />
                      }
                      size="small"
                      variant="outlined"
                      label={`Stars ${item?.stargazers_count}`}
                    />
                    <Chip
                      icon={
                        <VisibilityOutlinedIcon
                          sx={{
                            width: 14,
                            height: 14,
                          }}
                        />
                      }
                      size="small"
                      variant="outlined"
                      label={`Watch ${item?.watchers_count}`}
                    />
                  </Stack>
                </Stack>
              </Card>
            ))
          ) : (
            <p>No data found</p>
          )}
        </Stack>
      </Stack>
    </Drawer>
  );
};
