import { createAction, createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false
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
    },
    authRequestSuccess: (state, actions) => {
      state.auth = { ...actions.payload, isLoggedIn: true };
    },
    authRequestFailed: (state, actions) => {
      state.error = actions.payload;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceved, usersRequestFiled, authRequestSuccess, authRequestFailed } = actions;

const authRequested = createAction("users/authRequested");

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register({ email, password });
    localStorageService.setToken(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

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
