import { UpdateUserCriteria } from "./../../libraries/member-types";
import { User, UserProfileEntity } from "./../../../user/libraries/user-types";
import { UserListEntity } from "@main/modules/user/libraries/user-types";
import { API_BASE_PATH } from "@general/libraries/api-urls";
import axios from "axios";
import {
  addClientId,
  getUrlParam,
  log,
} from "@main/modules/general/libraries/helper";

const fetchCurrentUser = async function (token: string): Promise<User> {
  try {
    const res = await axios.get<User>(API_BASE_PATH + "/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data) return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
  return Promise.reject();
};
const updateCurrentUser = async function (
  criteria: UpdateUserCriteria,
  token: string
): Promise<User> {
  const {
    bio,
    email,
    first_name,
    instagram_username,
    last_name,
    location,
    username,
  } = criteria;
  const url = addClientId(
    API_BASE_PATH +
      `me?${getUrlParam(bio, "bio")}${getUrlParam(email, "email")}${getUrlParam(
        first_name,
        "first_name"
      )}${getUrlParam(instagram_username, "instagram_username")}${getUrlParam(
        last_name,
        "last_name"
      )}${getUrlParam(location, "location")}${getUrlParam(
        username,
        "username"
      )}`
  );
  log("url in updateCurrentUser", url, token);
  try {
    const res = await axios.put<any>(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data) return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
  return Promise.reject();
};

export { fetchCurrentUser, updateCurrentUser };
