import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  loading: false,
};

export const fetchUserByLoginDetails = createAsyncThunk(
  "users/fetchUserByLoginDetails",
  async ({ email, password }) => {
    try {
      const response = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json().catch(() => null); // Catch JSON parsing errors

      if (response.ok) {
        toast.success("Successfully logged in", {
          duration: 4000,
        });
        console.log(data);
        return data?.data;
      } else {
        toast.error(data?.message || "An error occurred");
        return null;
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "users/checkAuthStatus",
  async () => {
    try {
      const response = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/v1/auth/check`,
        {
          credentials: "include",
        }
      );
      const data = await response.json().catch(() => null); // Catch JSON parsing errors
      return data?.user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const response = await fetch(
      `${process.env.VITE_BACKEND_URL}/api/v1/auth/logout`,
      {
        credentials: "include",
      }
    );
    const data = await response.json().catch(() => null); // Catch JSON parsing errors
    if (response.ok) {
      toast.success("Logged out successfully 😥");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserByLoginDetails.fulfilled, (state, action) => {
      state.user = action?.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserByLoginDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserByLoginDetails.rejected, (state, action) => {
      console.log(action);
      state.user = null;
      state.loading = false;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.user = action?.payload;
      state.loading = false;
    });
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuthStatus.rejected, (state) => {
      state.user = null;
      state.loading = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.loading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
