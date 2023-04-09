import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.actions";
import { getLocalStorage } from "../../settings/localstorage/localStorage";

//get LocalStore
// const apiSession = getLocalStorage(API_SESSION);
const getisAuth = getLocalStorage('status');
const initialState = {
  authAdmin: getLocalStorage("isAuth") || null,
  status: getisAuth  ? true : false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setIsAuth: (state : any, { payload }) => {
      state.authAdmin = payload;
    },
    setIsStatus: (state : any, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer } = userSlice;
