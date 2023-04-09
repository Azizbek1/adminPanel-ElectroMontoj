import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { setLocalStorage } from "../../settings/localstorage/localStorage";



export const login = createAsyncThunk(
  "auth/login",
  async ({ login, password } : any, thunkAPI) => {
    try {
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
