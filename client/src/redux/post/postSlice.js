import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postAPI from "./postAPI";

const initialState = {
  posts: [],
  isPosting: false,
  isPosted: false,
  isErrorInPosting: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// PUBLISH POST
export const publish = createAsyncThunk(
  "post/publish",
  async (data, thunkAPI) => {
    try {
      return await postAPI.publish(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GETTING POST
export const getPost = createAsyncThunk("post/get", async (_, thunkAPI) => {
  try {
    return await postAPI.getPost();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isPosting = false;
      state.isPosted = false;
      state.isErrorInPosting = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publish.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(publish.fulfilled, (state) => {
        state.isPosting = false;
        state.isPosted = true;
        state.message = "Published Successfully";
      })
      .addCase(publish.rejected, (state, action) => {
        state.isPosting = false;
        state.isErrorInPosting = true;
        state.message = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = postSlice.actions;

export default postSlice.reducer;
