import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials, setCurrentUser } from "../features/auth/authSlice";
import { getDecryptedRefreshToken } from "@/lib/cryptography";

// create base query with authentication

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    headers.set("content-type", "application/json");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
// custom base query with re-authentication when token expires
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 500) {
    const refreshToken = await getDecryptedRefreshToken();
    console.log("resfreshToken in apiSlice", refreshToken);
    if (refreshToken) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          }
        );
        const resultResponse = await response.json();
        console.log("response", resultResponse);

        if (resultResponse.code === 200) {
          api.dispatch(setCredentials(resultResponse.data));

          // set user data
          // const userResponse = await fetch(
          //   "https://mbanking.istad.co/api/v1/auth/me",
          //   {
          //     method: "GET",
          //     headers: {
          //       "Content-Type": "application/json",
          //       authorization: `Bearer ${resultResponse.data.accessToken}`,
          //     },
          //   }
          // );
          // const userResult = await userResponse.json();
          // console.log("userResult", userResult);
          // api.dispatch(setCurrentUser(userResult));

          result = await baseQuery(args, api, extraOptions);
        } else if (resultResponse.code === 401) {
          api.dispatch(logout());
          alert("Your session has expired. Please login again(x).");
        }
      } catch (error) {
        console.error("Failed to refresh access token", error);
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
  
  return result;
};
// create api slice with custom base query
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"], // tagTypes are used for cache invalidation
  endpoints: (builder) => ({}),
});
