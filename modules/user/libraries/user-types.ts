import { Collection } from "./../../collection/libraries/collection-types";
import { Photo } from "./../../photo/libraries/photo-types";
import {
  PhotoListSorting,
  PhotoOrientation,
} from "../../photo/libraries/photo-types";

// User ________________________________________________________________________________
export interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username?: string;
  twitter_username?: string;
  portfolio_url: any;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  followed_by_user: boolean;
  followers_count: number;
  following_count: number;
  downloads: number;
  social: Social;
  profile_image: ProfileImage;
  badge: Badge;
  links: Links;
}
interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
}
interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}
interface Badge {
  title: string;
  primary: boolean;
  slug: string;
  link: string;
}
interface Links {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}

// criteria ________________________________________________________________________________
export interface UserProfileCriteria {
  username: string;
}
export interface UserProfileEntity {
  criteria: UserProfileCriteria;
  user: User;
}

export interface UserProfileLinkCriteria extends UserProfileCriteria {}
export interface UserProfileLinkEntity {
  criteria: UserProfileLinkCriteria;
  url: string;
}

export interface UserPhotoListCriteria extends UserProfileCriteria {
  page?: number;
  per_page?: number;
  order_by?: PhotoListSorting;
  orientation?: PhotoOrientation;
}
export interface UserPhotoListEntity {
  criteria: UserPhotoListCriteria;
  results: Photo[];
}

export interface UserLikedPhotoListCriteria extends UserPhotoListCriteria {}
export interface UserLikedPhotoListEntity extends UserPhotoListEntity {}

export interface UserCollectionListCriteria extends UserProfileCriteria {
  page?: number;
  per_page?: number;
}
export interface UserCollectionListEntity {
  criteria: UserCollectionListCriteria;
  results: Collection[];
}

export interface UserListCriteria {
  query: string;
  page?: number;
  per_page?: number;
}
export interface UserListEntity {
  total: number;
  total_pages: number;
  results: User[];
  criteria: UserListCriteria;
}
