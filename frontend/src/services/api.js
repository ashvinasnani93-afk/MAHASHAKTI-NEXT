import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const marketAPI = {
  getDashboard: () => api.get('/api/market/dashboard'),
  getStocks: (category) => api.get(`/api/market/stocks?category=${category}`),
  getMovers: (minChange, maxChange) => api.get(`/api/market/movers?minChange=${minChange}&maxChange=${maxChange}`),
  getSymbolDetail: (symbol) => api.get(`/api/market/symbol/${symbol}`),
  getCommodities: () => api.get('/api/market/commodities'),
  search: (query) => api.get(`/api/market/search?q=${query}`),
};

export const signalsAPI = {
  getSignals: (symbol) => api.get(`/api/signals${symbol ? `?symbol=${symbol}` : ''}`),
};

export const scannerAPI = {
  getAlerts: () => api.get('/api/scanner/alerts'),
};

export default api;
