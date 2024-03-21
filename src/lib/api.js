const axios = require('axios');

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  timeout: 10000,
  headers: {
    "content-Type": "application/json",
  },
});