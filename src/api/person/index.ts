import { apiAxios } from 'api/api';

export const getPerson = (id: string) => {
  return apiAxios('people/' + id);
};
