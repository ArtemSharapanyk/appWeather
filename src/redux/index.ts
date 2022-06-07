import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cities from "./slices/cities";

const rootReducer = combineReducers({
  cities,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getMiddleware) =>
      getMiddleware({
        serializableCheck: false,
      }),
  });

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatch = AppStoreType["dispatch"];

export default setupStore;
