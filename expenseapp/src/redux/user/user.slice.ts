import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  name: string;
  email: string;
  id: string;
};

export interface UserState {
  name: string;
  email: string;
  id: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  id: "",
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log("Payload : ", action.payload);
      state = action.payload;
      localStorage.setItem("expense_user", JSON.stringify(state));
    },
  },
});

export const { setUser } = counterSlice.actions;

export default counterSlice.reducer;
