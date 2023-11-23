import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/user/user.slice";
import fetcher from "@/lib/utils/fetcher";
// const persistedState =
//   JSON.parse(localStorage.getItem("expense_user") as string) ||
//   (await getUser());

const persistedState = await getUser();

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: persistedState,
  },
});

async function getUser() {
  const response = await fetcher.get("/auth/user");
  if (response.status === 200) {
    return response.data?.data;
  }
  return {};
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
