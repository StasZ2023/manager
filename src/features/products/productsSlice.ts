import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts, fetchCategories } from "./productsThunks";

export type Rating = { rate: number; count?: number };
export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: Rating;
};

type ProductsState = {
  list: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  list: [],
  categories: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      const newProduct = { ...action.payload, id: Date.now() };
      state.list.unshift(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.list = state.list.map((p) => (p.id === action.payload.id ? action.payload : p));
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      })
      .addCase(fetchProducts.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || "Ошибка загрузки";
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
