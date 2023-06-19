export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserResponse {
  success: boolean;
  token: string;
  user: User;
}
