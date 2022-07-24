import { updateCurrentUser } from "@main/modules/member/store/api/member-api";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { useState } from "react";

import type { UpdateUserCriteria } from "@member/libraries/member-types";
import { log } from "@main/modules/general/libraries/helper";

type FormInputs = UpdateUserCriteria;

function UpdateForm({
  token,
  onClose,
}: {
  token: string;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>();
  const formSubmitHandler: SubmitHandler<FormInputs> = async function (
    data: FormInputs
  ) {
    setPending(true);
    log("data in formSubmitHandler", data);
    try {
      const res = await updateCurrentUser({ ...data }, token);
      if (res.username) {
        if (onClose) onClose();
        router.push("/member");
      } else setUpdateError("something went wrong");
    } catch (error: any) {
      setUpdateError("something went wrong");
      log("error in updateCurrentUser", error);
    }
    setPending(false);
  };
  return (
    <Box onSubmit={handleSubmit(formSubmitHandler)} component={"form"}>
      <Typography>first name :</Typography>
      <Controller
        name="first_name"
        control={control}
        rules={{
          minLength: 4,
          maxLength: 10,
        }}
        render={({ field }) => (
          <TextField
            id="updateFirstName"
            fullWidth
            variant="outlined"
            label="first name"
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
            {...{ field }}
            // value={field.value}
            // onChange={field.onChange}
          />
        )}
      />
      <br />
      <br />
      <Typography>last name :</Typography>
      <Controller
        name="last_name"
        control={control}
        rules={{
          minLength: 4,
          maxLength: 10,
        }}
        render={({ field }) => (
          <TextField
            id="updateLastName"
            fullWidth
            variant="outlined"
            label="last name"
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
            {...{ field }}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <br />
      <br />
      <Typography>username :</Typography>
      <Controller
        name="username"
        control={control}
        rules={{
          minLength: 4,
          maxLength: 10,
        }}
        render={({ field }) => (
          <TextField
            id="updateUserName"
            fullWidth
            variant="outlined"
            label="username"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...{ field }}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <br />
      <br />
      <Typography>email :</Typography>
      <Controller
        name="email"
        control={control}
        rules={{
          minLength: 4,
          maxLength: 10,
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        }}
        render={({ field }) => (
          <TextField
            type={"email"}
            id="updateEmail"
            fullWidth
            variant="outlined"
            label="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...{ field }}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <br />
      <br />
      <Typography>bio :</Typography>
      <Controller
        name="bio"
        control={control}
        rules={{
          minLength: 20,
          maxLength: 50,
        }}
        render={({ field }) => (
          <TextField
            id="updateBio"
            fullWidth
            variant="outlined"
            label="bio"
            multiline
            minRows={5}
            error={!!errors.bio}
            helperText={errors.bio?.message}
            {...{ field }}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <br />
      <br />
      <Button
        type="submit"
        variant="contained"
        disabled={pending || !!updateError}
      >
        {pending ? "loading..." : updateError ? updateError : "submit"}
      </Button>
    </Box>
  );
}

export default UpdateForm;
