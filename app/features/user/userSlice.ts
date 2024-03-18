import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UserState = {
  userId: null,
  isLoading: false,
  isError: false,
};

// get user id
export const getUserId = createAsyncThunk(
  "getUserId",
  async (_: any, { rejectWithValue }) => {
    try {
      const id = await AsyncStorage.getItem("userId");
      return id;
    } catch (error: any) {
      return rejectWithValue("Error getting user id");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      // Reset the state
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET USER ID
      .addCase(getUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload;
      })
      .addCase(getUserId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
export const { reset } = userSlice.actions;
