import { log, setCookie } from "@main/modules/general/libraries/helper";
import { directUser, fetchMemberToken } from "@member/libraries/auth";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import { useState } from "react";

function Auth() {
  const router = useRouter();
  const clickHandler = () => directUser();
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const changeHandler = (e: any) => setValue(e.target.value);
  const submitHandler = async function (e: any) {
    setPending(true);
    e.preventDefault();
    try {
      const res = value ? await fetchMemberToken(value) : null;
      if (!res) return setError("input must not be empty");
      log("res", res);
      setCookie("access_token", res.access_token, 4);
    } catch (error: any) {
      setError("something went wrong");
      setPending(false);
    }
    setPending(false);
    router.push("/member/")
  };
  return (
    <Container onSubmit={submitHandler} sx={{ mt: 4 }} component="form">
      <Typography variant="h5" gutterBottom>
        please enter auth code
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          error={error !== null}
          helperText={error}
          onChange={changeHandler}
          value={value}
          label="auth code"
          variant="outlined"
        />
        <Button
          disabled={pending}
          endIcon={<KeyIcon />}
          color="secondary"
          type="submit"
          variant="contained"
        >
          submit
        </Button>
      </Stack>
      <Typography sx={{ mt: 2 }} variant="body1">
        dont have one ?{" "}
        <Button onClick={clickHandler} color="secondary">
          get auth code
        </Button>
      </Typography>
    </Container>
  );
}

export default Auth;
