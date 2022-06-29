import { createAction, createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { getRandomInt } from "../utils/randomInt";
import history from "../utils/history";

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
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true };
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceved, usersRequestFiled, authRequestSuccess, authRequestFailed, userCreated } = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register({ email, password });
    localStorageService.setToken(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    dispatch(createUser({
      _id: data.localId,
      email,
      rate: getRandomInt(1, 5),
      completedMeetings: getRandomInt(1, 500),
      image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
      ...rest
    }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await usersService.create(payload);
      dispatch(userCreated(content));
      history.push("/users");
    } catch (error) {
      dispatch(createUserFailed());
    }
  };
}

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
