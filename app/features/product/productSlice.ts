import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductService,
  deleteProductService,
  fetchProductsService,
  updateProductService,
} from "./productService";
import { ProductProps } from "../../screens/HomeScreen";

interface ProductState {
  products: ProductProps[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  message: string;
}

export interface UpdateProductProps {
  id: string;
  product: FormData;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  isError: false,
  error: "",
  message: "",
};

// Add product
export const addProduct = createAsyncThunk(
  "add",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await addProductService(data);
      if (response.data) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// fetch products
export const fetchProducts = createAsyncThunk(
  "fetch",
  async (userId: any, { rejectWithValue }) => {
    try {
      const response = await fetchProductsService(userId);
      if (response.data) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// update product
export const updateProduct = createAsyncThunk(
  "update",
  async (data: UpdateProductProps, { rejectWithValue }) => {
    try {
      const response = await updateProductService(data);
      if (response.data) {
        return response.data;
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteProductService(id);
      if (response.data) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      // Reset the state
      state.isLoading = false;
      state.isError = false;
      state.error = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.products.unshift(action.payload.body);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isError = true;
      })

      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.products = action.payload.body;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })

      // UPDATE PRODUCT
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.products.unshift(action.payload.body);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
export const { reset } = productSlice.actions;
