import { Swiper, SwiperSlide } from "swiper/react";
import UserSmCard from "../user-sm-card";
import { Navigation } from "swiper";
import Box from "@mui/material/Box";

// types ______________________________
import type { DeviceType } from "@general/libraries/device-type";
import type { User } from "@user/libraries/user-types";

function UserSmSlide({
  userList,
  deviceType,
}: {
  userList: User[];
  deviceType: DeviceType;
}) {
  return (
    <Box sx={{ my: 3, px: 2 }}>
      <Swiper
        slidesPerView={deviceType.isScreen ? 5 : deviceType.isTablet ? 7 : 4}
        spaceBetween={0}
        modules={[Navigation]}
        className="userSwiper"
      >
        {userList.map((user) => (
          <SwiperSlide key={user.id}>
            <UserSmCard deviceType={deviceType} user={user} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default UserSmSlide;
