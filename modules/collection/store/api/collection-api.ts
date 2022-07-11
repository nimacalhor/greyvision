import { log } from "@general/libraries/helper";
import axios from "axios";
import {
  getRelatedCollectionListPath,
  getAddPhotoToCollectionPath,
  getCollectionPhotoListPath,
  getCreateCollectionPath,
  getUpdateCollectionPath,
  getDeleteCollectionPath,
  getCollectionListPath,
  getCollectionPath,
} from "./helper";
import {
  DeletePhotoFromCollectionCriteria,
  DeletePhotoFromCollectionEntity,
  AddPhotoToCollectionCriteria,
  CollectionPhotoListCriteria,
  AddPhotoToCollectionEntity,
  CollectionPhotoListEntity,
  RelatedCollectionCriteria,
  DeleteCollectionCriteria,
  CreateCollectionCriteria,
  UpdateCollectionCriteria,
  RelatedCollectionEntity,
  UpdateCollectionEntity,
  CreateCollectionEntity,
  DeleteCollectionEntity,
  CollectionListCriteria,
  CollectionListEntity,
  CollectionCriteria,
  CollectionEntity,
} from "../../libraries/collection-types";

// get collection list by criteria
const fetchCollectionList = async function (
  criteria: CollectionListCriteria
): Promise<CollectionListEntity> {
  const url = getCollectionListPath(criteria);
  log("url in fetchCollectionList", url);
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        results: response.data.results,
        total: response.data.total,
        total_pages: response.data.total_pages,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

// get collection by id ______________________________
const fetchCollection = async function (
  criteria: CollectionCriteria
): Promise<CollectionEntity> {
  const url = getCollectionPath(criteria);
  log("url in fetchCollection", url);
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        collection: response.data,
        criteria,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

// get collection photos ______________________________
const fetchCollectionPhotoList = async function (
  criteria: CollectionPhotoListCriteria
): Promise<CollectionPhotoListEntity> {
  const url = getCollectionPhotoListPath(criteria);
  log("url in fetchCollectionPhotoList", url);
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        results: response.data,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

// get collection photos ______________________________
const fetchRelatedCollectionList = async function (
  criteria: RelatedCollectionCriteria
): Promise<RelatedCollectionEntity> {
  const url = getRelatedCollectionListPath(criteria);
  log("url in fetchRelatedCollectionList", url);
  try {
    const response = await axios.get(url);
    if (response.data)
      return {
        criteria,
        results: response.data,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

// create collection by criteria ______________________________
// INFO needs TOKEN
const createCollection = async function (
  criteria: CreateCollectionCriteria
): Promise<CreateCollectionEntity> {
  // TODO
  // send token
  const url = getCreateCollectionPath(criteria);
  log("url in CreateCollectionCriteria", url);
  try {
    const response = await axios.post(url);
    if (response.data)
      return {
        criteria,
        collection: response.data,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

// update existing Collection ______________________________
// INFO needs TOKEN
const updateCollection = async function (
  criteria: UpdateCollectionCriteria
): Promise<UpdateCollectionEntity> {
  // TODO
  // send token
  const url = getUpdateCollectionPath(criteria);
  log("url in UpdateCollectionCriteria", url);
  try {
    const response = await axios.put(url);
    if (response.data)
      return {
        criteria,
        collection: response.data,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

// delete existing Collection  ______________________________
// INFO needs TOKEN
const deleteCollection = async function (
  criteria: DeleteCollectionCriteria
): Promise<DeleteCollectionEntity> {
  // TODO
  // send token
  const url = getDeleteCollectionPath(criteria);
  log("url in DeleteCollectionCriteria", url);
  try {
    const response = await axios.delete(url);
    if (response.data)
      return {
        criteria,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

// add photo to Collection  ______________________________
// INFO needs TOKEN
const addPhotoToCollection = async function (
  criteria: AddPhotoToCollectionCriteria
): Promise<AddPhotoToCollectionEntity> {
  // TODO
  // send token
  const url = getAddPhotoToCollectionPath(criteria);
  log("url in AddPhotoToCollectionCriteria", url);
  try {
    const response = await axios.post(url);
    if (response.data)
      return {
        criteria,
        photo: response.data,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

// delete photo from Collection  ______________________________
// INFO needs TOKEN
const deletePhotoFromCollection = async function (
  criteria: DeletePhotoFromCollectionCriteria
): Promise<DeletePhotoFromCollectionEntity> {
  // TODO
  // send token
  const url = getAddPhotoToCollectionPath(criteria);
  log("url in DeletePhotoFromCollectionCriteria", url);
  try {
    const response = await axios.delete(url);
    if (response.data)
      return {
        criteria,
        photo: response.data,
      };
  } catch (error) {
    return Promise.reject();
  }
  return Promise.reject();
};

export {
  fetchRelatedCollectionList,
  deletePhotoFromCollection,
  fetchCollectionPhotoList,
  addPhotoToCollection,
  fetchCollectionList,
  createCollection,
  updateCollection,
  deleteCollection,
  fetchCollection,
};
