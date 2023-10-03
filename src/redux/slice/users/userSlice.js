import axios from "axios";
import baseURL from "./../../../utils/baseUrl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: window.sessionStorage.getItem("userInfo")
      ? JSON.parse(window.sessionStorage.getItem("userInfo"))
      : {},
  },
};
export const registerUserAction = createAsyncThunk(
  "user/add",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { email, password, fullname } = payload;
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${baseURL}/users/register`,
        {
          email,
          password,
          fullname,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUserAction = createAsyncThunk(
  "user/log",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { email, password, fullname } = payload;
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${baseURL}/users/login`,
        {
          email,
          password,
        },
        config
      );
      window.sessionStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//logout
export const logOutUserAction = createAsyncThunk("user/out", () => {
  sessionStorage.clear();
  return null;
});
export const getUserProfile = createAsyncThunk(
  "user/profile",async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const {data} =await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  // register
  extraReducers: builder => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
    //logout
    builder.addCase(logOutUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });
    //profile
    builder.addCase(getUserProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.profile = "";
    });
  },
});
const userReducer = userSlice.reducer;
export default userReducer;
