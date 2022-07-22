import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import stl from "./SearchForm.module.css";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function SearchForm() {
  const { palette } = useTheme();
  return (
    <Box
      component="form"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      className={stl.root}
      height={300}
    >
      <Container>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" size="large" color="secondary">
            <Search />
          </Button>
          <TextField
            sx={{ bgcolor: palette.background.default }}
            id="searchInput"
            variant="outlined"
            color="secondary"
            fullWidth
            label="search photos"
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default SearchForm;
