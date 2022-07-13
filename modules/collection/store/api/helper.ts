import { getUrlParam, addClientId } from "@general/libraries/helper";
import {
  API_SEARCH_COLLECTION_PATH,
  API_COLLECTION_PATH,
} from "@main/modules/general/libraries/api-urls";
import {
  DeletePhotoFromCollectionCriteria,
  AddPhotoToCollectionCriteria,
  CollectionPhotoListCriteria,
  RelatedCollectionCriteria,
  DeleteCollectionCriteria,
  UpdateCollectionCriteria,
  CreateCollectionCriteria,
  CollectionListCriteria,
  CollectionCriteria,
} from "../../libraries/collection-types";

// collection by id
const getCollectionPath = (criteria: CollectionCriteria) =>
  addClientId(API_COLLECTION_PATH + `/${criteria.id}?`);

// collection photos by id and criteria
const getCollectionPhotoListPath = (criteria: CollectionPhotoListCriteria) => {
  const { id, orientation, page, per_page } = criteria;
  const paramsExists = !!(orientation || page || per_page);
  return addClientId(
    API_COLLECTION_PATH +
    `/${id}/photos?${
      paramsExists
        ? `?${getUrlParam(orientation, "orientation")}${getUrlParam(
            page,
            "page"
          )}${getUrlParam(per_page, "per_page")}`
        : ""
    }`
  );
};

// get related collections
const getRelatedCollectionListPath = (criteria: RelatedCollectionCriteria) =>
  addClientId(API_COLLECTION_PATH + `/${criteria.id}/related?`);

// create collection
const getCreateCollectionPath = (criteria: CreateCollectionCriteria) => {
  const { title, description, is_private } = criteria;
  return addClientId(
    API_COLLECTION_PATH +
      `${getUrlParam(title, "title")}${getUrlParam(
        description,
        "description"
      )}${getUrlParam(is_private, "private")}`
  );
};

// update Collection
const getUpdateCollectionPath = (criteria: UpdateCollectionCriteria) => {
  const { title, description, is_private, id } = criteria;
  return addClientId(
    API_COLLECTION_PATH +
      `${id}?${getUrlParam(title, "title")}${getUrlParam(
        description,
        "description"
      )}${getUrlParam(is_private, "private")}`
  );
};

// delete collection
const getDeleteCollectionPath = (criteria: DeleteCollectionCriteria) =>
  addClientId(API_COLLECTION_PATH + `/${criteria.id}`);

// add photo
const getAddPhotoToCollectionPath = (
  criteria: AddPhotoToCollectionCriteria
) => {
  const { collection_id, photo_id } = criteria;
  return addClientId(
    API_COLLECTION_PATH +
      `/${collection_id}/add?${getUrlParam(
        collection_id,
        "collection_id"
      )}${getUrlParam(photo_id, "photo_id")}`
  );
};

// delete photo
const getDeletePhotoFromCollectionPath = (
  criteria: DeletePhotoFromCollectionCriteria
) => {
  const { collection_id, photo_id } = criteria;
  return addClientId(
    API_COLLECTION_PATH +
      `/${collection_id}/remove?${getUrlParam(
        collection_id,
        "collection_id"
      )}${getUrlParam(photo_id, "photo_id")}`
  );
};

// get list
const getCollectionListPath = (criteria: CollectionListCriteria) => {
  const { page, per_page, query } = criteria;
  return addClientId(
    API_SEARCH_COLLECTION_PATH +
      `?${getUrlParam(query, "query")}${getUrlParam(
        per_page,
        "per_page"
      )}${getUrlParam(page, "page")}`
  );
};

export {
  getRelatedCollectionListPath,
  getAddPhotoToCollectionPath,
  getCollectionPhotoListPath,
  getUpdateCollectionPath,
  getCreateCollectionPath,
  getDeleteCollectionPath,
  getCollectionListPath,
  getCollectionPath,
};
