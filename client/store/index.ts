import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
