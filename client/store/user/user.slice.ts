import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout, me, register } from "./user.action";

export interface IState {
  user: any;
  error: any;
  loading: boolean;
}

const initialState: IState = {
  user: {},
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.user = action.payload.user;
      state.loading = false;
      state.error = "";
    },
    [login.pending.type]: (state) => {
      state.loading = true;
    },
    [login.rejected.type]: (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = action;
    },

    [register.fulfilled.type]: (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.user = action.payload.user;
      state.loading = false;
      state.error = "";
    },
    [register.pending.type]: (state) => {
      state.loading = true;
    },
    [register.rejected.type]: (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = action;
    },

    [logout.fulfilled.type]: (state) => {
      localStorage.removeItem("token");
      state.user = {};
    },
    [logout.pending.type]: (state) => {
      state.loading = true;
    },
    [logout.rejected.type]: (state, action) => {},

    [me.fulfilled.type]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    },
    [me.pending.type]: (state) => {
      state.loading = true;
    },
    [me.rejected.type]: (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = "not authorized";
    },

    [checkAuth.fulfilled.type]: (state, action) => {
      console.log(action.payload);

      state.loading = false;
      state.error = "";
    },
    [checkAuth.pending.type]: (state) => {
      state.loading = true;
    },
    [checkAuth.rejected.type]: (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = "not authorized";
    },
  },
});
export default userSlice.reducer;
