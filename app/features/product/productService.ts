import axios from "axios";
import { axiosConfig } from "../config";
import { API_URL } from "../../config/env";
import { UpdateProductProps } from "./productSlice";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: "There is issue with the network" });
    }
  }
);

// ADD PRODUCT
export const addProductService = async (data: any) => {
  return await api.post<any>("products/add", data, axiosConfig());
};

// FETCH PRODUCTS
export const fetchProductsService = async (userId: string) => {
  return await api.get<any>("products?userId=" + userId);
};

// UPDATE PRODUCT
export const updateProductService = async (data: UpdateProductProps) => {
  console.log(data.id);
  return await api.put<any>(
    "products/update?id=" + data.id,
    data.product,
    axiosConfig()
  );
};

// DELETE PRODUCT
export const deleteProductService = async (id: string) => {
  return await api.delete<any>("products/delete?id=" + id);
};
