import { PhotoOrientation } from "@main/modules/photo/libraries/photo-types";

const addClientId = (url: string) =>
  url +
  `${!url.endsWith("&") || !url.endsWith("?") ? "&" : ""}client_id=${
    process.env.unsplash_access_key
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

export { addClientId, log, getUrlParam };
