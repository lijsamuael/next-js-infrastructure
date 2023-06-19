import User from "@/src/interfaces/userInterface";
import axios, { AxiosResponse } from "axios";
import userss from "../../models/users.json";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  users: User[] | null;
}

async function fetchUsers(): Promise<User[]> {
  const response: AxiosResponse<any, any> = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data as User[];
}

// Define the initial state using that type
const initialState: UserState = {
  users: userss,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => {},
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

async function initializeState(): Promise<UserState> {
  const users: User[] = await fetchUsers();
  return { users };
}
let users: UserState;

async function setup(): Promise<void> {
  users = await initializeState();
  console.log(users.users); // Here you can use the updated state object
}

setup();
