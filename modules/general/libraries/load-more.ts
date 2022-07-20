import { fetchCollectionList } from "@collection/store/api/collection-api";
import { COLLECTION_PER_PAGE, PHOTOS_PER_PAGE } from "./constants";
import { fetchPhotoList } from "@photo/store/api/photo-api";
import { fetchUserList } from "@user/store/api/user-api";
import { useState } from "react";

// types ______________________________
import type { Photo, PhotoListCriteria } from "@photo/libraries/photo-types";
import type { User, UserListCriteria } from "@user/libraries/user-types";
import type {
  Collection,
  CollectionListCriteria,
} from "@collection/libraries/collection-types";


const useLoadMore = function <T = Photo | User | Collection, U = any>(
  init: T[] | null,
  criteria: U,
  fetchF: (arg: { [any: string]: any } & U) => Promise<any>
) {
  const [list, setList] = useState<T[]>(init ? [...init] : []);
  const [page, setPage] = useState(2);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMoreHandler = async function () {
    setPending(true);
    try {
      const entity = await fetchF({ ...criteria, page });

      if (entity.results) {
        setPage((prevPage) => prevPage + 1);
        setList((prevList) => [
          ...prevList,
          ...(entity.results as T[]),
        ]);
      } else setError("something went wrong");
    } catch (error: any) {
      setError(error.message);
    }
    setPending(false);
  };

  return {
    loadMoreHandler,
    pending,
    list,
    error,
  };
};

export default useLoadMore;
