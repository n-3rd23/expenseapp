import userReducer from "@/redux/user/user.slice";
import { configureStore } from "@reduxjs/toolkit";
const persistedState =
  JSON.parse(localStorage.getItem("expense_user") as string) || {};

// const persistedState = await getUser();

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: persistedState,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
