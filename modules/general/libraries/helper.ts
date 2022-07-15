import { PhotoOrientation } from "@main/modules/photo/libraries/photo-types";
import { PHOTO_QUERIES } from "./constants";

const addClientId = (url: string) =>
  url +
  `${!url.endsWith("&") || !url.endsWith("?") ? "&" : ""}client_id=${
    process.env.unsplash_access_key
  }`;

const addSecretKey = (url: string) =>
  url +
  `${!url.endsWith("&") || !url.endsWith("?") ? "&" : ""}client_secret=${
    process.env.unsplash_secret_key
  }`;

function log(title: string, ...args: any[]) {
  console.log(title + "__________");
  args.forEach((arg) => console.log(arg));
}

const getUrlParam = function (
  item: string | string[] | undefined | number | PhotoOrientation | boolean,
  title: string
): string {
  if (!item) return "";
  if (Array.isArray(item))
    return `${title}=${item.map((s) => s.trim()).join(",")}&`;
  return `${title}=${item.toString().trim()}&`;
};

const getSingleQuery = (query: string | string[]): string => {
  if (Array.isArray(query)) return query.join(",");
  return query;
};

const getRandomPhotoQuery = () =>
  PHOTO_QUERIES[Math.floor(Math.random() * PHOTO_QUERIES.length)];

export {
  getRandomPhotoQuery,
  getSingleQuery,
  addSecretKey,
  addClientId,
  getUrlParam,
  log,
};
