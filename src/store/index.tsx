import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./RootReduser";

const store = configureStore({
  devTools: true,
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
