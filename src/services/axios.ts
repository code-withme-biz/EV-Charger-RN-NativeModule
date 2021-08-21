import axios from 'axios';
import { headers } from '../contants';

const instance = axios.create({
  baseURL: 'https://apis.openapi.sk.com/tmap/',
  timeout: 10000,
  headers: headers,
});

export default instance;
