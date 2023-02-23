import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "./authAPI";

const user = JSON.parse(sessionStorage.getItem("jwt_iblog_user"));
const saved_posts = JSON.parse(sessionStorage.getItem("saved_posts"));

const initialState = {
  user: user || null,
  saved_posts: saved_posts || [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  isSaving: false,
  isSaved: false,
  isErrorInSave: false,
  message: "",
};

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authAPI.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authAPI.register(user);
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

// ADD TO SAVED
export const addToSaved = createAsyncThunk(
  "auth/add_to_saved",
  async (data, thunkAPI) => {
    try {
      return await authAPI.addToSaved(data);
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

// REMOVE FROM SAVED
export const removeToSaved = createAsyncThunk(
  "auth/remove_from_saved",
  async (data, thunkAPI) => {
    try {
      return await authAPI.removeToSaved(data);
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

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  return await authAPI.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isSaving = false;
      state.isSaved = false;
      state.isErrorInSave = false;
      state.isError = false;
      state.message = "";
    },
    updateSaved: (state, action) => {
      let saved_posts = state.user.saved_posts;
      let post_id = action.payload;

      if (!saved_posts.includes(post_id)) {
        saved_posts.push(post_id);
      } else {
        saved_posts.splice(saved_posts.indexOf(post_id), 1);
      }

      state.user = { ...state.user, saved_posts: saved_posts };
      sessionStorage.setItem("jwt_iblog_user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.saved_posts = action.payload.saved_posts;
        state.message = "Login Successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Account created";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.saved_posts = [];
      })
      .addCase(addToSaved.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(addToSaved.fulfilled, (state, action) => {
        state.isSaving = false;
        state.saved_posts = action.payload;
      })
      .addCase(addToSaved.rejected, (state, action) => {
        state.isSaving = false;
        state.isErrorInSave = true;
        state.message = action.payload;
      })
      .addCase(removeToSaved.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(removeToSaved.fulfilled, (state, action) => {
        state.isSaving = false;
        state.saved_posts = action.payload;
      })
      .addCase(removeToSaved.rejected, (state, action) => {
        state.isSaving = false;
        state.isErrorInSave = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset, updateSaved } = authSlice.actions;

export default authSlice.reducer;
