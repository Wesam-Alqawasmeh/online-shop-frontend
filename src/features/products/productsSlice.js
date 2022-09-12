import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../assets/api";
import cookies from "react-cookies";

const initialState = {
  items: [],
  categories: [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ],
};

export const getProducts = createAsyncThunk("products/get", async () => {
  const response = await api.get("/products");
  return response.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    build.addCase(getProducts.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action.error);
    });
  },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
