import {
  IconButton,
  InputBase,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/search";
import { useState } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(0, 2),
    marginTop: 20,
  },
}));

const Search = () => {
  const classes = useStyles();
  const router = useRouter();
  const [search, setSearch] = useState();

  const handleSubmitSearch = () => {
    if (search) {
      router.push({
        pathname: `/search/${search}`,
      });
    }
  };

  if (typeof document !== "undefined") {
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSubmitSearch();
      }
    });
  }

  return (
    <Paper className={classes.searchBox}>
      <InputBase
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Ex.: Iphone 12 com garantia"
        fullWidth
      />
      <IconButton onClick={handleSubmitSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
