const API_BASE_PATH = "https://api.unsplash.com/";
// photo __________
const API_PHOTO_PATH = API_BASE_PATH + "photos";
const API_RANDOM_PHOTO_PATH = API_BASE_PATH + "photos/random";
const API_SEARCH_PHOTO = API_BASE_PATH + "search/photos";
// collection __________
const API_COLLECTION_PATH = API_BASE_PATH + "collections";
const API_SEARCH_COLLECTION_PATH = API_BASE_PATH + "search/collections";
// user __________
const API_USER_PATH = API_BASE_PATH + "users";
const API_SEARCH_USER_PATH = API_BASE_PATH + "search/users";
// member
const DIRECT_URL = "https://unsplash.com/oauth/authorize";
const REDIRECT_URL = "urn:ietf:wg:oauth:2.0:oob";
const AUTH_URL = "https://unsplash.com/oauth/token";

export {
  API_SEARCH_COLLECTION_PATH,
  API_RANDOM_PHOTO_PATH,
  API_SEARCH_USER_PATH,
  API_COLLECTION_PATH,
  API_SEARCH_PHOTO,
  API_PHOTO_PATH,
  API_BASE_PATH,
  API_USER_PATH,
  REDIRECT_URL,
  DIRECT_URL,
  AUTH_URL,
};
