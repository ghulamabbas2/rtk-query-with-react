import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import productReducer from "./features/productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
