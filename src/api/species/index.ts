import { apiAxios } from 'api/api';

export const getSpecies = (id: string) => {
  if (id) {
    return apiAxios('species/' + id);
  }

  return { data: null };
};
