import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commnet.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter(c => c._id !== action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequestFiled, commentCreated, commentDeleted } = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateRequestFiled = createAction("comments/commentCreateRequestFiled");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveRequestFiled = createAction("comment/commentRemoveRequestFiled");

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const { content } = await commentService.createComment(payload);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentCreateRequestFiled());
  }
};

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    const { content } = await commentService.removeComment(id);
    if (content === null) {
      dispatch(commentDeleted(id));
    }
  } catch (error) {
    dispatch(commentRemoveRequestFiled());
  }
};

export const getComments = () => state => state.comments.entities;

export const getCommentsLoadingStatus = () => state => state.comments.isLoading;

export default commentsReducer;
