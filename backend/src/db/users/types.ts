export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  addresses?: Address[];
}

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalUsers: number;
};

export interface UserAdder {
  id: number;
  user_id: string;
  key: string;
  value: string;
}

export interface Address {
  id: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}