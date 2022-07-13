import { directUser, fetchMemberToken } from "@member/libraries/auth";
import { log } from "@general/libraries/helper";
import { useEffect } from "react";
import Button from "@mui/material/Button";
// ZO48aetq1MSSvSX8Y5-BIe2ZUMcHX42bYlMjRps-TUg
export default function Home() {
  const fetch = () => {
    fetchMemberToken("uFCC1PbAbDoJADTQpoSxqdIpbo8rrdRi_x9YtDtILMY").then(
      (res) => log("token", res)
    );
    // directUser()
  };
  return (
    <div>
      <Button color="secondary" variant="contained" onClick={() => fetch()}>
        redirect
      </Button>
    </div>
  );
}
