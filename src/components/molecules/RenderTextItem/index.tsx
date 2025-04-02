import { useMemo } from "react";

import { GitHubUserDetail } from "@/interfaces";

import { TextItem } from "@/components/atoms/TextItem";

import { useUserDetail } from "@/service";

interface RenderTextItemProps {
  account_id: number;
  keyDataToRender: keyof GitHubUserDetail;
  textPrefix: string;
}

export const RenderTextItem: React.FC<RenderTextItemProps> = ({
  account_id,
  keyDataToRender,
  textPrefix,
}) => {
  const {
    data: userDetail,
    isLoading: loadingUserDetail,
  }: { data: GitHubUserDetail | undefined; isLoading: boolean | undefined } =
    useUserDetail(account_id);

  const textValue = useMemo(() => {
    if (userDetail && keyDataToRender) {
      return userDetail[keyDataToRender];
    }
    return undefined;
  }, [userDetail, keyDataToRender]);

  return (
    <TextItem
      text={textValue}
      prefix={textPrefix}
      loading={loadingUserDetail}
    />
  );
};
