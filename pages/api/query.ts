import { REVALIDATION_TIME } from "@general/libraries/constants";

// import type { NextApiHandler } from "next";

const PHOTO_QUERIES = Object.freeze([
  "space",
  "art",
  "dust",
  "black and white",
  "cinema",
  "nature",
]);

const getRandomPhotoQuery = () =>
  PHOTO_QUERIES[Math.floor(Math.random() * PHOTO_QUERIES.length)];

let query = getRandomPhotoQuery();

setInterval(() => {
  query = getRandomPhotoQuery();
}, REVALIDATION_TIME * 100);

const getQuery = () => query;

// const handler: NextApiHandler = function (req, res) {
//   if (req.method === "GET") res.json({ query });
// };

export { getQuery };
// export default handler;
