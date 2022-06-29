import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/api";
import IUser from "../shared/models/IUser";

export interface AuthenticationState {
  user?: IUser | null;
}

const initialState: AuthenticationState = {
  user: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        const token = action.payload.headers.authorization.split("Bearer ")[1];
        localStorage.setItem("access_token", token);
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
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
    const result = await api.post<{ data: IUser; message: string }>(
      requestUrl,
      {
        user: login,
      }
    );
    return result;
  }
);

export const getAccount = createAsyncThunk(
  "authentication/get_account",
  async () => {
    try {
      return api.get<{ data: IUser }>("account");
    } catch (e) {
      localStorage.removeItem("access_token");
      throw e;
    }
  }
);

// Action creators are generated for each case reducer function
export const { reset } = authenticationSlice.actions;

export default authenticationSlice.reducer;
