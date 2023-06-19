import { Shop } from './shopModel';
export interface Seller {
  success: boolean;
  token: 'string';
  shop: Shop;
}
