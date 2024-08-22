import { createSlice, nanoid, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "https://jsonplaceholder.typicode.com/users"

const initialState = {
  users: [],  // Initialize as an empty array
  status: 'idle', // idle || loading || succeeded || failed
  error: null
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USER_URL);
    return response.data; // This should return an array of users
  } catch (error) {
    throw error; // Ensure errors are handled properly
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload; // Set the users array directly
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const getUsersAll = state => state.users.users;
export const getUsersStatus = state => state.users.status;
export const getUsersError = state => state.users.error;

export default userSlice.reducer;
