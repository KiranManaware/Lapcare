import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    allComplaints: [],
    allComments: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false);
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false),
          (state.allUsers = action.payload);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload);
      })
      .addCase(getAllComplaints.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false);
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false),
          (state.allComplaints = action.payload);
      })
      .addCase(getAllComplaints.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload);
      })
      .addCase(getAllComments.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false);
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false),
          (state.allComments = action.payload);
      })
      .addCase(getAllComments.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload);
      });
  },
});

export default adminSlice.reducer;

// All users
export const getAllUsers = createAsyncThunk("ADMIN/FETCH_USERS", async (_ ,thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return adminService.fetchAllUsers(token);
  } catch (error) {
    const message = error.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

// All Complaints
export const getAllComplaints = createAsyncThunk("ADMIN/FETCH_COMPLAINTS", async (_ ,thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return adminService.fetchAllComplaints(token);
  } catch (error) {
    const message = error.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

// All comments
export const getAllComments = createAsyncThunk("ADMIN/FETCH_COMMENTS", async (_ ,thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return adminService.fetchAllComments(token);
  } catch (error) {
    const message = error.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

// Complaint Update
export const closeComplaint = createAsyncThunk("ADMIN/UPDATE_COMPLAINT", async (_ ,thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return adminService.updateComplaint(token);
  } catch (error) {
    const message = error.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
});
