import axios from 'axios';

export const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection';

export const metClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
