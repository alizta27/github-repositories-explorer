import { Avatar } from "@mui/material";

interface UserCardAvatarProps {
  url: string;
  alt: string;
}

export const UserCardAvatar: React.FC<UserCardAvatarProps> = ({ url, alt }) => {
  return (
    <Avatar
      variant="rounded"
      src={url}
      alt={alt}
      sx={{
        width: 80,
        height: 80,
      }}
    />
  );
};
