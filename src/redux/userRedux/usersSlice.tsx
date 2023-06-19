import User from "@/src/interfaces/userInterface";
import axios, { AxiosResponse } from "axios";
import userss from "../../models/users.json";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchUsers } from "@/src/utils/encription";

interface UserState {
  users: User[] | null;
}

const initialState: UserState = {
  users: []
};


export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users  =  action.payload
    },
    clearUser: () => {},
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
