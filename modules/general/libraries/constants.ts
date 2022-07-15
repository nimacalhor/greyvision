import { PhotoListSorting } from "@photo/libraries/photo-types";

const SITE_NAME = "greyvision";
const PHOTOS_PER_PAGE = 20;
const PHOTOS_ORDER_BY = PhotoListSorting.popular;
const PHOTO_QUERIES = Object.freeze([
  "space",
  "art",
  "dust",
  "black and white",
  "cinema",
  "nature",
]);
export { SITE_NAME, PHOTOS_PER_PAGE, PHOTOS_ORDER_BY, PHOTO_QUERIES };
