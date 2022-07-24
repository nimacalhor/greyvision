import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import UpdateForm from "../update-form";
import Box from "@mui/material/Box";

import type { DialogProps } from "@mui/material/Dialog";
import type { User } from "../../libraries/user-types";

function UpdateDialog({
  user,
  token,
  ...dialogProps
}: DialogProps & { user: User; token: string }) {
  return (
    <Dialog
      open={dialogProps.open}
      onClose={dialogProps.onClose}
      {...{ dialogProps }}
      maxWidth="md"
      fullWidth
    >
      <Box sx={{ p: 5 }}>
        <Typography variant="h4" gutterBottom>
          update {user.first_name} {user.last_name} profile
        </Typography>
        <UpdateForm token={token} onClose={dialogProps.onClose as () => void} />
      </Box>
    </Dialog>
  );
}

export default UpdateDialog;
