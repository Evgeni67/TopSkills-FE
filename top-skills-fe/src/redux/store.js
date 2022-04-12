import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loginReducer from "./slices/loginSlice.js";

const persistConfig = {
  key: "root",
  storage,
};
const persistedLoginReducer = persistReducer(persistConfig, loginReducer);

export const store = configureStore({
  reducer: {
    login: persistedLoginReducer,
  },
});

export const persistor = persistStore(store);
