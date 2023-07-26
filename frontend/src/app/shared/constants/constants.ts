import { Category } from '../models/categoryModel';
import { Location } from '../models/locationModel';

export const COOKIE_KEY = 'loggedIn';
export const URL = {
  baseUrl: 'http://localhost:9000',
};

export const shops: any[] = [
  {
    id: '1',
    name: 'Shop 1',
    category: 'Category 1',
    location: 'Location 1',
    imageUrl: 'path/to/image1.jpg',
  },
  {
    id: '2',
    name: 'Shop 2',
    category: 'Category 2',
    location: 'Location 2',
    imageUrl: 'path/to/image2.jpg',
  },
  // Repeat the structure for the remaining 8 shops
  {
    id: '3',
    name: 'Shop 3',
    category: 'Category 3',
    location: 'Location 3',
    imageUrl: 'path/to/image3.jpg',
  },
  {
    id: '4',
    name: 'Shop 4',
    category: 'Category 4',
    location: 'Location 4',
    imageUrl: 'path/to/image4.jpg',
  },
  {
    id: '5',
    name: 'Shop 5',
    category: 'Category 5',
    location: 'Location 5',
    imageUrl: 'path/to/image5.jpg',
  },
  {
    id: '6',
    name: 'Shop 6',
    category: 'Category 6',
    location: 'Location 6',
    imageUrl: 'path/to/image6.jpg',
  },
  {
    id: '7',
    name: 'Shop 7',
    category: 'Category 7',
    location: 'Location 7',
    imageUrl: 'path/to/image7.jpg',
  },
  {
    id: '8',
    name: 'Shop 8',
    category: 'Category 8',
    location: 'Location 8',
    imageUrl: 'path/to/image8.jpg',
  },
  {
    id: '9',
    name: 'Shop 9',
    category: 'Category 9',
    location: 'Location 9',
    imageUrl: 'path/to/image9.jpg',
  },
  {
    id: '10',
    name: 'Shop 10',
    category: 'Category 10',
    location: 'Location 10',
    imageUrl: 'path/to/image10.jpg',
  },
];

export const categories: Category[] = [
  { value: 'Food', label: 'Food' },
  { value: 'Clothes', label: 'Clothes' },
  { value: 'Shoes', label: 'Shoes' },
  { value: 'Camera', label: 'Camera' },
  { value: 'Phones', label: 'Phones' },
  { value: 'Gromming', label: 'Gromming' },
  { value: 'Sports', label: 'Sports' },
];

export const locations: Location[] = [
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Hyderabad', label: 'Hyderabad' },
];
