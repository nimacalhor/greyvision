import { log } from "@general/libraries/helper";
import { useEffect } from "react";
import {
  fetchCollection,
  fetchCollectionList,
  fetchCollectionPhotoList,
  fetchRelatedCollectionList,
} from "@collection/store/api/collection-api";
// "c"
export default function Home() {
  useEffect(() => {
    fetchRelatedCollectionList({
      id: "DbAJ4uwOVeE",
    }).then((res) => log("res in fetchRelatedCollectionList", res));
  }, []);
  return <div>hello</div>;
}
