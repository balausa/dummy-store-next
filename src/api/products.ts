import axiosInstance from './axiosInstance';
import { ProductsResponse } from '@/types/product';

export const getProducts = async (limit: number = 12): Promise<ProductsResponse> => {
  const response = await axiosInstance.get<ProductsResponse>(`/products?limit=${limit}`);
  return response.data;
};
