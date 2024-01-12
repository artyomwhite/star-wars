import { apiAxios } from 'api/api';

export const getPlanet = (id?: string) => {
  if (id) {
    return apiAxios('planets/' + id);
  }

  return { data: null };
};
