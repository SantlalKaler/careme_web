import axios from 'axios';
export const api = axios.create({ baseURL: 'http://localhost:3001' });

export const searchCustomers = async (params: Record<string,string>) => {
  const res = await api.get('/customers', { params });
  return res.data;
};
