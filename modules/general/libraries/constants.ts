import { PhotoListSorting } from "@photo/libraries/photo-types";

const SITE_NAME = "greyvision";
const PHOTOS_PER_PAGE = 20;
const PHOTOS_ORDER_BY = PhotoListSorting.popular;
const REVALIDATION_TIME = 60 * 20;

export { SITE_NAME, PHOTOS_PER_PAGE, PHOTOS_ORDER_BY, REVALIDATION_TIME };
