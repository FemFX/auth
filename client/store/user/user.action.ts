import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";
import axios from "axios";

export interface IData {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (obj: IData, thunkAPI) => {
    try {
      const { data } = await $api.post("/user/login", obj);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (obj: IData, thunkAPI) => {
    try {
      const { data } = await $api.post("/user/register", obj);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    await $api.post("/user/logout");
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
export const me = createAsyncThunk("user/me", async (_, thunkAPI) => {
  try {
    const { data } = await $api.get("/user");
    console.log("data", data);

    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:4000/refresh_token", {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
