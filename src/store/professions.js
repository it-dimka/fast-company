import { createSlice } from "@reduxjs/toolkit";
import { isOutdated } from "../utils/isOutdated";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequestFiled } = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  if (!isOutdated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.fetchAll();
      dispatch(professionsReceved(content));
    } catch (error) {
      dispatch(professionsRequestFiled(error.message));
    }
  }
};

export const getProfessions = () => state => state.professions.entities;

export const getProfessionsLoadingStatus = () => state => state.professions.isLoading;

export const getProfessionById = (id) => state => state.professions.entities.find(q => q._id === id);

export default professionsReducer;
