import { configureStore, combineReducers } from "@reduxjs/toolkit";
import currency from "./slices/currency";

const rootReducer = combineReducers({
  currency,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatch = AppStoreType["dispatch"];

export default setupStore;
