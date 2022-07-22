import { PhotoListSorting } from "@photo/libraries/photo-types";

const SITE_NAME = "greyvision";
const PHOTOS_PER_PAGE = 20;
const PHOTOS_ORDER_BY = PhotoListSorting.popular;
const REVALIDATION_TIME = 60 * 20;
const COLLECTION_PER_PAGE = 15;
const USER_PER_PAGE = 15;

export {
  COLLECTION_PER_PAGE,
  REVALIDATION_TIME,
  PHOTOS_PER_PAGE,
  PHOTOS_ORDER_BY,
  USER_PER_PAGE,
  SITE_NAME,
};
