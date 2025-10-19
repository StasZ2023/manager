import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "./productsSlice";

const API = {
  products: "https://fakestoreapi.com/products",
  categories: "https://fakestoreapi.com/products/categories",
};

export const fetchProducts = createAsyncThunk<Product[]>("products/fetch", async () => {
  const res = await fetch(API.products);
  return await res.json();
});

export const fetchCategories = createAsyncThunk<string[]>("categories/fetch", async () => {
  const res = await fetch(API.categories);
  return await res.json();
});
