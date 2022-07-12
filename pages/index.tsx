import { log } from "@general/libraries/helper";
import { useEffect } from "react";
import {
  fetchUserCollectionList,
  fetchUserLikedPhotoList,
  fetchUserList,
  fetchUserPhotoList,
  fetchUserProfile,
  fetchUserProfileLink,
} from "@user/store/api/user-api";
// ""spWxYJr6uG4"
export default function Home() {
  useEffect(() => {
    fetchUserCollectionList({
      username: "mike_marchi",
    }).then((res) => log("res in fetchUserCollectionList", res));
  }, []);
  return <div>hello</div>;
}
