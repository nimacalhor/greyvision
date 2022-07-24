import { LoadMoreProps } from "@main/modules/general/components/load-more/LoadMore";
import LoadMore from "@general/components/load-more";
import Container from "@mui/material/Container";
import UserMdCard from "../user-md-card";
import Grid from "@mui/material/Grid";

import type { DeviceType } from "@main/modules/general/libraries/device-type";
import type { Photo } from "@main/modules/photo/libraries/photo-types";
import type { User } from "../../libraries/user-types";

function UserGrid({
  userList,
  deviceType,
  loadMoreProps,
}: {
  userList: User[];
  deviceType: DeviceType;
  loadMoreProps?: LoadMoreProps;
}) {
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container>
        {userList.map((user) => (
          <Grid key={user.id} xs={12} md={6} lg={4} xl={3}>
            <UserMdCard user={user} deviceType={deviceType} />
          </Grid>
        ))}
      </Grid>
      {loadMoreProps && (
        <LoadMore
          error={loadMoreProps.error}
          loadMoreHandler={loadMoreProps.loadMoreHandler}
          pending={loadMoreProps.pending}
        />
      )}
    </Container>
  );
}

export default UserGrid;
