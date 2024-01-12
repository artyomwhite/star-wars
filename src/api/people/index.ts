import { apiAxios } from '../api';

export const getPeople = (page?: number, search?: string) => {
  console.log('req url', `people${page ? '?page=' + page : ''}${search ? '?search=' + search : ''}`);
  return apiAxios(`people${page ? '?page=' + page : ''}${search ? '?search=' + search : ''}`);
};
