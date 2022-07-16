import { log } from "@general/libraries/helper";
import axios from "axios";
import {
  UserLikedPhotoListCriteria,
  UserCollectionListCriteria,
  UserCollectionListEntity,
  UserLikedPhotoListEntity,
  UserProfileLinkCriteria,
  UserProfileLinkEntity,
  UserPhotoListCriteria,
  UserPhotoListEntity,
  UserProfileCriteria,
  UserProfileEntity,
  UserListCriteria,
  UserListEntity,
} from "../../libraries/user-types";
import {
  getUserCollectionListPath,
  getUserLikedPhotoListPath,
  getUserProfileLinkPath,
  getUserPhotoListPath,
  getUserProfilePath,
  getUserListPath,
} from "./helper";

// get user list ______________________________
const fetchUserList = async function (
  criteria: UserListCriteria
): Promise<UserListEntity> {
  const url = getUserListPath(criteria);
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        results: response.data.results,
        total: response.data.total,
        total_pages: response.data.total_pages,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

// get user Profile ______________________________
const fetchUserProfile = async function (
  criteria: UserProfileCriteria
): Promise<UserProfileEntity> {
  const url = getUserProfilePath(criteria);
  log("url in fetchUserProfile", url)
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        user: response.data,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

// get user Profile link ______________________________
const fetchUserProfileLink = async function (
  criteria: UserProfileLinkCriteria
): Promise<UserProfileLinkEntity> {
  const url = getUserProfileLinkPath(criteria);
  log("url in fetchUserProfileLink", url)
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        url: response.data.url,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

// get user photo list ______________________________
const fetchUserPhotoList = async function (
  criteria: UserPhotoListCriteria
): Promise<UserPhotoListEntity> {
  const url = getUserPhotoListPath(criteria);
  log("url in fetchUserPhotoList", url)
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        results: response.data,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

// get user liked photo list ______________________________
const fetchUserLikedPhotoList = async function (
  criteria: UserLikedPhotoListCriteria
): Promise<UserLikedPhotoListEntity> {
  const url = getUserLikedPhotoListPath(criteria);
  log("url in fetchUserLikedPhotoList", url)
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        results: response.data,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

// get user collection list ______________________________
const fetchUserCollectionList = async function (
  criteria: UserCollectionListCriteria
): Promise<UserCollectionListEntity> {
  const url = getUserCollectionListPath(criteria);
  log("url in fetchUserCollectionList", url)
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        results: response.data,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

export {
  fetchUserCollectionList,
  fetchUserLikedPhotoList,
  fetchUserProfileLink,
  fetchUserPhotoList,
  fetchUserProfile,
  fetchUserList,
};
