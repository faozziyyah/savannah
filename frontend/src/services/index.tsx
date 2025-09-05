//import { QueryCache, QueryClient } from '@tanstack/react-query';
//import axios, { AxiosError } from 'axios';

export const baseURL = 'http://localhost:3001';

export const fetchAllUsersWithPagination = async (options: {
    pageIndex: number;
    pageSize: number;
    currentPage: number;
}) => {

    const response = await fetch(`${baseURL}/users?pageNumber=${options.currentPage}&pageSize=${options.pageSize}`, {

    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
};

//http://localhost:3001/posts?userId=ee10b0e8346a4a0d990668fd1155fbc2
//http://localhost:3001/users
//http://localhost:3001/users/count
//http://localhost:3001/users/ee10b0e8346a4a0d990668fd1155fbc2/adders
//get: http://localhost:3001/users/ee10b0e8346a4a0d990668fd1155fbc2/adders
//delete: http://localhost:3001/posts/a92683a2abde49b98a08114022924e23
//post: http://localhost:3001/posts