import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetched: null,
};

export const productSlice = createSlice({
  initialState,
  name: "productSlice",
  reducers: {
    setIsFetched: (state, action) => {
      state.isFetched = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setIsFetched } = productSlice.actions;
