import { PHOTO_COLORS } from "./constants";
// types ______________________________
import type { Token } from "../../member/libraries/member-types";
import type { User } from "../../user/libraries/user-types";
import type PhotoActionsTypes from "../store/action-types";

// photo entity ________________________________________________________________________________
export interface Photo {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: any;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: any;
  alt_description: any;
  urls: Urls;
  links: Links;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  topic_submissions: TopicSubmissions;
  user: User;
}
interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}
interface TopicSubmissions {}

// photo criteria ________________________________________________________________________________
// photo ______________________________
export interface PhotoCriteria {
  id: string;
}

export interface PhotoEntity {
  criteria: PhotoCriteria;
  photo: Photo;
}

export interface RandomPhotoCriteria {
  query?: string;
  count?: number;
  username?: string;
  collections?: string[];
  orientation?: PhotoOrientation;
}

export interface RandomPhotoEntity {
  criteria: RandomPhotoCriteria;
  results: Photo[];
}

export interface PhotoDownloadCriteria {
  download_location: string;
}

export interface PhotoDownloadEntity {
  criteria: PhotoDownloadCriteria;
  url: string;
}

export interface PhotoLikeCriteria extends PhotoCriteria {
  token: Token;
  like: boolean;
}

export interface PhotoLikeEntity extends PhotoEntity {}

export enum PhotoOrientation {
  landscape = "landscape",
  portrait = "portrait",
  squarish = "squarish",
}

// search ______________________________
export interface PhotoListCriteria {
  page?: number;
  query: string;
  per_page?: number;
  collections?: string[];
  order_by?: PhotoListSorting;
  orientation?: PhotoOrientation;
  color?: keyof typeof PHOTO_COLORS;
}

export interface PhotoListEntity {
  total: number;
  results: Photo[];
  total_pages: number;
  criteria: PhotoListCriteria;
}

export enum PhotoListSorting {
  latest = "latest",
  oldest = "oldest",
  popular = "popular",
}

// store ______________________________
export interface PhotoState {
  error: null | string;
  pending: boolean;
  query: string;
  list: Photo[];
}
export interface GetPhotosAction {
  type: PhotoActionsTypes.GET_PHOTOS;
  payload: {
    criteria: PhotoListCriteria;
  };
}
export interface AddPhotosAction {
  type: PhotoActionsTypes.ADD_PHOTOS;
  payload: {
    criteria: PhotoListCriteria;
  };
}
export interface PutPhotosAction {
  type: PhotoActionsTypes.PUT_PHOTOS;
  payload: {
    list: Photo[];
  };
}
export interface PushPhotosAction {
  type: PhotoActionsTypes.PUSH_PHOTOS;
  payload: {
    list: Photo[];
  };
}
export interface PutPendingPhotosAction {
  type: PhotoActionsTypes.PUT_PENDING_PHOTOS;
  payload: {
    pending: boolean;
  };
}
export interface PutErrorPhotosAction {
  type: PhotoActionsTypes.PUT_ERROR_PHOTOS;
  payload: {
    error: null | string;
  };
}
export interface PutPhotoQueryAction {
  type: PhotoActionsTypes.PUT_PHOTO_QUERY;
  payload: {
    query: string;
  };
}
