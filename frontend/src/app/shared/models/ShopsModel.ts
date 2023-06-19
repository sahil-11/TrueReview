import { Shop } from './shopModel';

export interface Shops {
  success: boolean;
  shops: Shop[];
  pageIndex: number;
  pages: number;
  count: number;
  setUniqueLocation: string[];
}
