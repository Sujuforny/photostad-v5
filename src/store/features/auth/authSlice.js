import { removeRefreshToken, secureRefreshToken } from "@/lib/cryptography";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      secureRefreshToken(action.payload.refreshToken);
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
      state.accessToken = null;
      removeRefreshToken();
      console.log("logout");
    },
 
  },
});

export const { setCredentials, logout, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state?.auth.user;
export const selectCurrentAccessToken = (state) => state?.auth.accessToken;
export const selectCurrentUserData = (state) => state?.auth.user.data;