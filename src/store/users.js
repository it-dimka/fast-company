import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users.service";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceved, usersRequestFiled } = actions;

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await usersService.fetchAll();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const getUsersList = () => state => state.users.entities;

export const getUserById = (id) => state => state.users.entities.find(u => u._id === id);

export default usersReducer;
