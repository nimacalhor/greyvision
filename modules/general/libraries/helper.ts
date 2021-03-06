import { PhotoOrientation } from "@main/modules/photo/libraries/photo-types";
import { GetStaticPropsContext } from "next";

const addClientId = (url: string) =>
  url +
  `${url.endsWith("&") || url.endsWith("?") ? "" : "&"}client_id=${
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

const trimText = (input: string, length: number) => {
  if (input)
    return input.length > length ? `${input.substring(0, length)}...` : input;
  return "";
};

const download = (path: string, filename: string) => {
  const anchor = document.createElement("a");
  anchor.href = path;
  anchor.download = filename;
  anchor.target = "_blank";

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
};

const getParamId = ({ params }: GetStaticPropsContext, key: string) => {
  let result = "";
  if (params) {
    const id = params[key];
    if (id) {
      if (Array.isArray(id)) result = id[0];
      else result = id;
    }
  }
  return result;
};

const setCookie = (name: string, value: string, days?: number) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export {
  getSingleQuery,
  addSecretKey,
  addClientId,
  getUrlParam,
  getParamId,
  setCookie,
  trimText,
  download,
  log,
};
