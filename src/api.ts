import axios from 'axios';
import type { Customer } from './models/Customer';
export const api = axios.create({ baseURL: 'http://localhost:3001' });


export const getAllCustomers = async (): Promise<Customer[]> => {
  const res = await api.get<Customer[]>("/customers");
  console.log("Fetched customers:", res.data);
  return res.data; 
};


export const getCustomerById = async (id: string): Promise<Customer | null> => {
  const res = await api.get<Customer>(`/customers/${id}`);
  console.log("Fetched customer:", res.data);
  return res.data;
};
