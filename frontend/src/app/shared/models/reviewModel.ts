// import { ReviewsItem } from './reviewsModel';

export interface ReviewModel {
  success: boolean;
  reviews: ReviewItems[];
  pageIndex: number;
  pages: number;
  count: number;
}

export interface ReviewItems {
  _id: string;
  review: string;
  shop: string;
  user: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
