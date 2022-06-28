import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/api";
import User from "../shared/models/User";

export interface AuthenticationState {
  user?: User | null;
}

const initialState: AuthenticationState = {
  user: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
  },
  reducers: {
    reset: (state) => {
      state.user = null;
    },
  },
});

export const authenticateUser = createAsyncThunk(
  "authentication/authenticate_user",
  async (login: { email: string; password: string }, thunkAPI) => {
    const requestUrl = `users/login`;
    const result = await api.post<User>(requestUrl, { user: login });
    return result;
  }
);

// Action creators are generated for each case reducer function
export const { reset } = authenticationSlice.actions;

export default authenticationSlice.reducer;
