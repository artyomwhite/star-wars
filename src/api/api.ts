import axios from 'axios';

export const apiAxios = axios.create({
  headers: {
    'content-type': 'application/json',
  },
});

apiAxios.interceptors.request.use(async config => {
  const url = 'https://swapi.dev/api/';

  if (url) {
    config.baseURL = url;
  }

  return config;
});
