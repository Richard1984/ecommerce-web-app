import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/api";
import IUser from "../shared/models/IUser";

export interface AuthenticationState {
  user?: IUser | null;
  logoutSuccess?: boolean;
}

const initialState: AuthenticationState = {
  user: null,
  logoutSuccess: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        const token = action.payload.headers.authorization.split("Bearer ")[1];
        localStorage.setItem("access_token", token);
        state.user = action.payload.data.data;
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        const token = action.payload.headers.authorization.split("Bearer ")[1];
        localStorage.setItem("access_token", token);
        state.user = action.payload.data.data;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.user = null;
        localStorage.removeItem("access_token");
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.logoutSuccess = true;
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

export const loginWithFacebook = createAsyncThunk(
  "authentication/login_with_facebook",
  async (accessToken: string, thunkAPI) => {
    const requestUrl = `facebook`;
    const result = await api.post<{ data: IUser }>(requestUrl, {
      facebook_access_token: accessToken,
    });
    return result;
  }
);

export const getAccount = createAsyncThunk(
  "authentication/get_account",
  async () => api.get<{ data: IUser }>("account")
);

export const logout = createAsyncThunk("authentication/logout", async () => {
  const response = await api.delete<{ data: IUser; message: string }>(
    "users/sign_out"
  );
  localStorage.removeItem("access_token");
  return response;
});

// Action creators are generated for each case reducer function
export const { reset } = authenticationSlice.actions;

export default authenticationSlice.reducer;
