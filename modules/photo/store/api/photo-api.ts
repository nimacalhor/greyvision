import { log } from "@general/libraries/helper";
import axios from "axios";
import {
  getPhotoDownloadLink,
  getRandomPhotoPath,
  getPhotoLikeLink,
  getPhotoListPath,
  getPhotoPath,
} from "./helper";
import {
  PhotoDownloadCriteria,
  PhotoDownloadEntity,
  RandomPhotoCriteria,
  PhotoListCriteria,
  PhotoLikeCriteria,
  RandomPhotoEntity,
  PhotoListEntity,
  PhotoLikeEntity,
  PhotoCriteria,
  PhotoEntity,
} from "@photo/libraries/photo-types";

// get photo list by criteria ______________________________
const fetchPhotoList = async function (
  criteria: PhotoListCriteria
): Promise<PhotoListEntity> {
  const url = getPhotoListPath(criteria);
  log("url in fetchPhotoList", url)
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

// get one photo by ID ______________________________
const fetchPhoto = async function (
  criteria: PhotoCriteria
): Promise<PhotoEntity> {
  const url = getPhotoPath(criteria);
  log("url in fetchPhoto", url)
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        photo: response.data,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

// get random photo by criteria ______________________________
const fetchRandomPhoto = async function (
  criteria: RandomPhotoCriteria
): Promise<RandomPhotoEntity> {
  const url = getRandomPhotoPath(criteria);
  log("url in fetchRandomPhoto", url)
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

// fetch photo download by id ______________________________
const fetchPhotoDownloadLink = async function (
  criteria: PhotoDownloadCriteria
): Promise<PhotoDownloadEntity> {
  const url = getPhotoDownloadLink(criteria);
  log("url in fetchPhotoDownloadLink", url)
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

// fetch photo download by id ______________________________
const likePhoto = async function (
  criteria: PhotoLikeCriteria
): Promise<PhotoLikeEntity> {
  const url = getPhotoLikeLink(criteria);
  log("url in likePhoto", url)
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        photo: response.data,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

export {
  fetchPhotoDownloadLink,
  fetchRandomPhoto,
  fetchPhotoList,
  fetchPhoto,
  likePhoto,
};
