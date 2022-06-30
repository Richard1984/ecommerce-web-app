import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/api";
import ICategory from "../shared/models/ICategory";

export interface CategoriesState {
  entities?: ICategory[];
}

const initialState: CategoriesState = {
  entities: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.entities = action.payload.data.data;
    });
  },
  reducers: {
    reset: (state) => {
      state.entities = [];
    },
  },
});

export const getCategories = createAsyncThunk(
  "categories/get_categories",
  async () => api.get<{ data: ICategory[] }>("categories")
);

// Action creators are generated for each case reducer function
export const { reset } = categoriesSlice.actions;

export default categoriesSlice.reducer;
