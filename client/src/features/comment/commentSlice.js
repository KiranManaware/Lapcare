import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "./commentService";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false);
      })
      .addCase(getComments.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false),
          (state.comments = action.payload);
      })
      .addCase(getComments.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload);
      })
      .addCase(raiseComment.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false);
      })
      .addCase(raiseComment.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false),
          (state.comments = [action.payload, ...state.comments]);
      })
      .addCase(raiseComment.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload);
      });
  },
});

export default commentSlice.reducer;

// get all Comments
export const getComments = createAsyncThunk(
  "FETCH/COMMENTS",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await commentService.fetchComments(id, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all Comments
export const raiseComment = createAsyncThunk(
  "ADD/COMMENTS",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await commentService.addComment(formData, token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
