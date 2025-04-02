import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";

import styles from "./styles.module.scss";

interface InputSearchProps {
  value?: string;
  onChange: (value: string) => void;
  handleSearch: () => void;
}

export const InputSearch: React.FC<InputSearchProps> = ({
  value,
  onChange,
  handleSearch,
}) => {
  return (
    <div className={styles.searchContainer}>
      <TextField
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <IconButton onClick={() => handleSearch()}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};
