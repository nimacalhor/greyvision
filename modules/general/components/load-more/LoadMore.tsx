import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export interface LoadMoreProps {
  loadMoreHandler: () => Promise<void>;
  error: string | null;
  pending: boolean;
}

function LoadMore({ loadMoreHandler, pending, error }: LoadMoreProps) {
  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: 250 }}
      >
        {!pending && !error && (
          <Button variant="contained" onClick={loadMoreHandler} size="large">
            load more
          </Button>
        )}
        {pending && <CircularProgress />}
        {error && (
          <Button size="large" disabled>
            {error}
          </Button>
        )}
      </Stack>
    </>
  );
}

export default LoadMore;
