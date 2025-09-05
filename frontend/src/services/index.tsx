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