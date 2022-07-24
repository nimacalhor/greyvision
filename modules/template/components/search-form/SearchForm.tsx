import {
  COLLECTION_PER_PAGE,
  PHOTOS_PER_PAGE,
  USER_PER_PAGE,
} from "@main/modules/general/libraries/constants";
import { getPhotos } from "@main/modules/photo/store/actions";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import stl from "./SearchForm.module.css";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { getCollections } from "@main/modules/collection/store/actions";
import { getUsers } from "@main/modules/user/store/actions";
// import TextF

function SearchForm() {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const changeHandler = (e: any) => setQuery(e.target.value);
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      dispatch(
        getPhotos({
          query,
          per_page: PHOTOS_PER_PAGE,
        })
      );
      dispatch(
        getCollections({
          query,
          per_page: COLLECTION_PER_PAGE,
        })
      );
      dispatch(
        getUsers({
          query,
          per_page: USER_PER_PAGE,
        })
      );
    }
  };
  return (
    <Box
      onSubmit={submitHandler}
      component="form"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      className={stl.root}
      height={300}
    >
      <Container>
        <Stack direction="row" spacing={1}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
          >
            <Search />
          </Button>
          <TextField
            sx={{ bgcolor: palette.background.default }}
            id="searchInput"
            variant="outlined"
            color="secondary"
            fullWidth
            label="search photos"
            onChange={changeHandler}
            value={query}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default SearchForm;
