import { PhotoOrientation } from "../../photo/libraries/photo-types";
import { Photo } from "./../../photo/libraries/photo-types";
import { Token } from "../../member/libraries/member-types";
import { User } from "./../../user/libraries/user-types";

// Collection ________________________________________________________________________________
export interface Collection {
  id: string;
  title: string;
  description: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  curated: boolean;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: Tag[];
  links: Links3;
  user: User;
  cover_photo: CoverPhoto2;
  preview_photos: PreviewPhoto[];
}
interface Tag {
  type: string;
  title: string;
  source?: Source;
}
interface Source {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: CoverPhoto;
}
interface Ancestry {
  type: Type;
  category?: Category;
  subcategory?: Subcategory;
}
interface Type {
  slug: string;
  pretty_slug: string;
}
interface Category {
  slug: string;
  pretty_slug: string;
}
interface Subcategory {
  slug: string;
  pretty_slug: string;
}
interface CoverPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at?: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: string;
  alt_description?: string;
  urls: Urls;
  links: Links;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any;
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
interface TopicSubmissions {
  wallpapers?: Wallpapers;
  nature?: Nature;
  "arts-culture"?: ArtsCulture;
  experimental?: Experimental;
  spirituality?: Spirituality;
  "textures-patterns"?: TexturesPatterns;
  architecture?: Architecture;
  "color-of-water"?: ColorOfWater;
}
interface Wallpapers {
  status: string;
  approved_on: string;
}
interface Nature {
  status: string;
  approved_on: string;
}
interface ArtsCulture {
  status: string;
  approved_on: string;
}
interface Experimental {
  status: string;
  approved_on: string;
}
interface Spirituality {
  status: string;
  approved_on: string;
}
interface TexturesPatterns {
  status: string;
  approved_on: string;
}
interface Architecture {
  status: string;
  approved_on: string;
}
interface ColorOfWater {
  status: string;
  approved_on: string;
}
interface Links3 {
  self: string;
  html: string;
  photos: string;
  related: string;
}
interface CoverPhoto2 {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: any;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: Urls2;
  links: Links5;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any;
  topic_submissions: TopicSubmissions2;
  user: User;
}
interface Urls2 {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
interface Links5 {
  self: string;
  html: string;
  download: string;
  download_location: string;
}
interface TopicSubmissions2 {}
interface PreviewPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  blur_hash: string;
  urls: Urls3;
}
interface Urls3 {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

// Collection criteria ________________________________________________________________________________
export interface CollectionCriteria {
  id: string;
}
export interface CollectionEntity {
  criteria: CollectionCriteria;
  collection: Collection;
}

export interface CollectionPhotoListCriteria extends CollectionCriteria {
  page?: number;
  per_page?: number;
  orientation?: PhotoOrientation;
}
export interface CollectionPhotoListEntity {
  criteria: CollectionPhotoListCriteria;
  results: Photo[];
}

export interface RelatedCollectionCriteria {
  id: string;
}
export interface RelatedCollectionEntity {
  criteria: CollectionCriteria;
  results: Collection[];
}

export interface CreateCollectionCriteria {
  title: string;
  token: Token;
  is_private?: boolean;
  description?: string;
}
export interface CreateCollectionEntity {
  criteria: CreateCollectionCriteria;
  collection: Collection;
}

export interface UpdateCollectionCriteria extends CreateCollectionCriteria {
  id: string;
}
export interface UpdateCollectionEntity extends CreateCollectionEntity {}

export interface DeleteCollectionCriteria extends CollectionCriteria {}
export interface DeleteCollectionEntity {
  criteria: DeleteCollectionCriteria;
}

export interface AddPhotoToCollectionCriteria {
  collection_id: string;
  photo_id: string;
}
export interface AddPhotoToCollectionEntity {
  criteria: AddPhotoToCollectionCriteria;
  photo: Photo;
}

export interface DeletePhotoFromCollectionCriteria
  extends AddPhotoToCollectionCriteria {}
export interface DeletePhotoFromCollectionEntity
  extends AddPhotoToCollectionEntity {}

export interface CollectionListCriteria {
  query: string;
  page?: number;
  per_page?: number;
}
export interface CollectionListEntity {
  total: number;
  total_pages: number;
  results: Collection[];
  criteria: CollectionListCriteria;
}

// others ______________________________
export interface collectionCardProps extends Collection {
  photoList: [Photo, Photo];
}
