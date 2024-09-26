import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthAPI } from "./services/AuthAPI";
import { UserAPI } from "./services/UserAPI";
import { CommentsAPI } from "./services/CommentsAPI";

export const store = configureStore({
  reducer: {
    [CommentsAPI.reducerPath]: CommentsAPI.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [UserAPI.reducerPath]: UserAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      AuthAPI.middleware,
      UserAPI.middleware,
      CommentsAPI.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
