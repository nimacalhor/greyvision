import {
  addClientId,
  getUrlParam,
} from "@main/modules/general/libraries/helper";
import {
  API_RANDOM_PHOTO_PATH,
  API_SEARCH_PHOTO,
  API_PHOTO_PATH,
} from "@general/libraries/api-paths";
import {
  PhotoDownloadCriteria,
  RandomPhotoCriteria,
  PhotoListCriteria,
  PhotoLikeCriteria,
  PhotoOrientation,
  PhotoCriteria,
} from "@photo/libraries/photo-types";

// photo list
const getPhotoListPath = (criteria: PhotoListCriteria) => {
  const { collections, color, order_by, orientation, page, per_page, query } =
    criteria;
  return addClientId(
    `${API_SEARCH_PHOTO}?${getUrlParam(
      collections,
      "collections"
    )}${getUrlParam(color, "color")}${getUrlParam(
      order_by,
      "order_by"
    )}${getUrlParam(orientation, "orientation")}${getUrlParam(
      page,
      "page"
    )}${getUrlParam(per_page, "per_page")}${getUrlParam(query, "query")}`
  );
};

// single photo
const getPhotoPath = (criteria: PhotoCriteria) =>
  addClientId(`${API_PHOTO_PATH}/${criteria.id}?`);

// random photo
const getRandomPhotoPath = (criteria: RandomPhotoCriteria) => {
  const { collections, count, orientation, query, username } = criteria;
  return addClientId(
    `${API_RANDOM_PHOTO_PATH}?${getUrlParam(
      collections,
      "collection"
    )}${getUrlParam(count, "count")}${
      (orientation as String, "orientation")
    }${getUrlParam(query, "query")}${getUrlParam(username, "username")}`
  );
};

// download photo
const getPhotoDownloadLink = (criteria: PhotoDownloadCriteria) =>
  addClientId(`${criteria.download_location}`);

// like photo
const getPhotoLikeLink = (criteria: PhotoLikeCriteria) =>
  addClientId(`${API_PHOTO_PATH}/${criteria.id}/like`);

export {
  getPhotoDownloadLink,
  getRandomPhotoPath,
  getPhotoListPath,
  getPhotoLikeLink,
  getPhotoPath,
};
