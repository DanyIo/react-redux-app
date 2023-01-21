import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";

const initialData = {
  login: [],
  status: "idle",
};

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (values) => {
    try {
      const response = await axios.post(API_BASE_URL + "login", values);
      return response.data.token;
    } catch (error) {
      return error.response.data;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: initialData,
  reducers: {
    resetLoginStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.login = action.payload;
        console.log(action.payload);
        action.payload.error === undefined
          ? (state.login = action.payload)
          : (state.login = action.payload.error);
        action.payload.error === undefined
          ? (state.status = "succeeded")
          : (state.status = "error");
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        console.log("failed");
        state.error = action.error.message;
      });
  },
});

export const { resetLoginStatus } = loginSlice.actions;

export default loginSlice.reducer;
