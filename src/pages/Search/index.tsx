import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardActionArea,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";

import { landingIlu } from "@/assets/images";

import { useSearchGitHubUsers } from "@/hooks";
import { useStore } from "@/store";

import {
  InputSearch,
  UserCardAvatar,
  UserCardDetailList,
  UserDetailDrawer,
} from "@/components";

import styles from "./styles.module.scss";

export const Search = () => {
  const { t } = useTranslation();
  const initiateSearchValue = useRef(false);
  const [search, setSearch] = useState<string>("");
  const [openDetailsDerawer, setOpenDetailsDerawer] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userDetailCardContent, setUserDetailCardContent] =
    useState<null | ReactNode>(null);

  const { search_params } = useStore((state) => state);

  const {
    fetchListOfUsers,
    listOfUsers,
    totalResultData,
    isLoadingListOfUsers,
    newSearch,
    loadMore,
    isLoadingMore,
  } = useSearchGitHubUsers();

  useEffect(() => {
    if (initiateSearchValue.current) return;

    if (search_params.q && !search) {
      setSearch(search_params.q);
      initiateSearchValue.current = true;
    }
  }, [search, search_params.q]);

  useEffect(() => {
    if (search_params) {
      fetchListOfUsers();
    }
  }, [search_params, fetchListOfUsers]);

  const handleSearch = useCallback(() => {
    newSearch(search);
  }, [newSearch, search]);

  const toggleDetailsDrawer = useCallback(
    (check: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (!check) {
        setSelectedUser(null);
      }

      setOpenDetailsDerawer(check);
    },
    [setSelectedUser, setOpenDetailsDerawer],
  );

  useEffect(() => {
    if (selectedUser) {
      setOpenDetailsDerawer(true);
    }
  }, [selectedUser, toggleDetailsDrawer]);

  const handleUserSelected = useCallback(
    (user: string, content: ReactNode) => {
      setSelectedUser(user);
      setUserDetailCardContent(content);
    },
    [setUserDetailCardContent, setSelectedUser],
  );

  return (
    <section>
      <Stack
        width="100%"
        sx={{
          padding: {
            xs: "16px",
            sm: "32px",
            md: "24px 64px",
            lg: "32px 150px",
          },
        }}
      >
        <Stack spacing={2}>
          <div className={styles.headerContentWrapper}>
            <h1 className={styles.headerText}>{t("SEARCH.TITLE")}</h1>
            <img src={landingIlu} className={styles.landingIlu} />
          </div>
          <InputSearch
            value={search}
            onChange={setSearch}
            handleSearch={handleSearch}
          />
        </Stack>

        <Stack spacing={2} mt={4}>
          {isLoadingListOfUsers && listOfUsers.length === 0 ? (
            Array(5)
              .fill(null)
              .map((_, idx) => (
                <Skeleton key={idx.toString()} variant="rounded" height={100} />
              ))
          ) : (
            <Grid
              container
              spacing={2}
              mt={3}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 2,
              }}
            >
              {listOfUsers?.map((item) => {
                const content = (
                  <Grid p={2} alignItems="center" gap={2} container>
                    <Grid>
                      <UserCardAvatar
                        url={item?.avatar_url}
                        alt={`image-${item?.login}`}
                      />
                    </Grid>
                    <Grid size="grow">
                      <UserCardDetailList item={item} />
                    </Grid>
                  </Grid>
                );

                return (
                  <React.Fragment key={item.id}>
                    <Card>
                      <CardActionArea
                        onClick={() => handleUserSelected(item.login, content)}
                      >
                        {content}
                      </CardActionArea>
                    </Card>
                  </React.Fragment>
                );
              })}

              {isLoadingMore &&
                Array(5)
                  .fill(null)
                  .map((_, idx) => (
                    <Skeleton
                      key={idx.toString()}
                      variant="rounded"
                      height={100}
                    />
                  ))}

              {totalResultData > listOfUsers?.length && !isLoadingMore && (
                <Button onClick={loadMore}>{t("BUTTON.LOAD_MORE")}</Button>
              )}
            </Grid>
          )}
        </Stack>

        <UserDetailDrawer
          setOpen={toggleDetailsDrawer(false)}
          open={openDetailsDerawer}
          username={selectedUser}
          userDetailContent={userDetailCardContent}
        />
      </Stack>
    </section>
  );
};
