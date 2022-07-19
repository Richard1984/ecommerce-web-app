import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/api";
import IUser from "../shared/models/IUser";

export interface AuthenticationState {
  user?: IUser | null;
  logoutSuccess?: boolean;
  isAuthenticated?: boolean;
  sessionHasBeenFetched?: boolean;
}

const initialState: AuthenticationState = {
  user: null,
  logoutSuccess: false,
  isAuthenticated: false,
  sessionHasBeenFetched: false,
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
        state.isAuthenticated = true;
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        const token = action.payload.headers.authorization.split("Bearer ")[1];
        localStorage.setItem("access_token", token);
        state.user = action.payload.data.data;
        state.isAuthenticated = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const token = action.payload.headers.authorization.split("Bearer ")[1];
        localStorage.setItem("access_token", token);
        state.user = action.payload.data.data;
        state.isAuthenticated = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        state.sessionHasBeenFetched = true;
        state.isAuthenticated = true;
      })
      .addCase(getAccount.pending, (state, action) => {
        state.sessionHasBeenFetched = false;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.user = null;
        localStorage.removeItem("access_token");
        state.isAuthenticated = false;
        state.sessionHasBeenFetched = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.logoutSuccess = true;
        state.isAuthenticated = false;
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

export const signup = createAsyncThunk(
  "authentication/signup",
  async (
    user: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    const requestUrl = `users/signup`;
    const result = await api.post<{ data: IUser; message: string }>(
      requestUrl,
      {
        user,
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
