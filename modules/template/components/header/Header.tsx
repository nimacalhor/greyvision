import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useHeaderTitle from "../../libraries/header-title";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
// type ______________________________
import type { Theme } from "@mui/material";

function Header({ theme }: { theme: Theme }) {
  const { title, goBackCallback } = useHeaderTitle();
  return (
    <>
      <AppBar
        sx={{
          boxShadow: {
            xs: 1,
            md: "none",
          },
        }}
      >
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={2}>
            {!!goBackCallback && (
              <IconButton onClick={goBackCallback}>
                <ArrowBackIcon sx={{ fontSize: theme.typography.h4 }} />
              </IconButton>
            )}
            <Typography variant="h4">{title}</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </>
  );
}

export default Header;
