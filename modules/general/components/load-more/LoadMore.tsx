import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


function LoadMore({
  onLoadMoreHandler,
  pending,
  error,
}: {
  onLoadMoreHandler: (_: any) => any;
  error: string | null;
  pending: boolean;
}) {
  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: 250 }}
      >
        {!pending && !error && (
          <Button variant="contained" onClick={onLoadMoreHandler} size="large">
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
