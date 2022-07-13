import { addClientId, getUrlParam } from "@general/libraries/helper";
import {
  API_SEARCH_USER_PATH,
  API_USER_PATH,
} from "@main/modules/general/libraries/api-urls";
import {
  UserCollectionListCriteria,
  UserLikedPhotoListCriteria,
  UserProfileLinkCriteria,
  UserPhotoListCriteria,
  UserProfileCriteria,
  UserListCriteria,
} from "../../libraries/user-types";

// user list
const getUserListPath = (criteria: UserListCriteria) => {
  const { page, per_page, query } = criteria;
  return addClientId(
    API_SEARCH_USER_PATH +
    `?${getUrlParam(query, "query")}${getUrlParam(page, "page")}${getUrlParam(
      per_page,
      "per_page"
    )}`
  );
};

// user profile
const getUserProfilePath = (criteria: UserProfileCriteria) =>
  addClientId(API_USER_PATH + `/${criteria.username}?`);

// user profile link
const getUserProfileLinkPath = (criteria: UserProfileLinkCriteria) =>
  addClientId(API_USER_PATH + `/${criteria.username}/portfolio?`);

// user profile photo list
const getUserPhotoListPath = (criteria: UserPhotoListCriteria) => {
  const { username, order_by, orientation, page, per_page } = criteria;
  return addClientId(
    API_USER_PATH +
    `/${username}/photos?${getUrlParam(order_by, "order_by")}${getUrlParam(
      orientation,
      "orientation"
    )}${getUrlParam(page, "page")}${getUrlParam(per_page, "per_page")}`
  );
};

// user profile liked photo list
const getUserLikedPhotoListPath = (criteria: UserLikedPhotoListCriteria) => {
  const { username, order_by, orientation, page, per_page } = criteria;
  return addClientId(
    API_USER_PATH +
    `/${username}/likes?${getUrlParam(order_by, "order_by")}${getUrlParam(
      orientation,
      "orientation"
    )}${getUrlParam(page, "page")}${getUrlParam(per_page, "per_page")}`
  );
};

// user collection list
const getUserCollectionListPath = (criteria: UserCollectionListCriteria) => {
  const { username, page, per_page } = criteria;
  return addClientId(
    API_USER_PATH +
    `/${username}/collections?${getUrlParam(page, "page")}${getUrlParam(
      per_page,
      "per_page"
    )}`
  );
};

export {
  getUserCollectionListPath,
  getUserLikedPhotoListPath,
  getUserProfileLinkPath,
  getUserPhotoListPath,
  getUserProfilePath,
  getUserListPath,
};
