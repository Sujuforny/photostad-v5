// this the extended slice for auth
import { apiSlice } from "@/store/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // build.mutation is used for POST, PUT, DELETE
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials }
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials }
      })
    }),
    verify: builder.mutation({
      query: (email) => ({
        url: `/auth/verify?email=${email}`,
        method: "POST",
      })
    }),
    checkVerify: builder.mutation({
      query: ( credentials ) => ({
        url: `/auth/check-verify`,
        method: "POST",
        body: { ...credentials }
      })
    }),
    getAdmin: builder.query({
     query: () => `/auth/dashboard/me`,
    }),
    verifyForgotPassword: builder.mutation({
      query: (email) => ({
        url: `auth/verify-forgot-password?email=${email}`,
        method: "POST",
      })
    }),
    resetPassword: builder.mutation({
      query: ( credentials ) => ({
        url: `auth/reset-password`,
        method: "POST",
        body: { ...credentials }

      })
    }),
    checkVerifyForgotPassword: builder.mutation({
      query: ( credentials ) => ({
        url: `auth/check-verify-forgot-password`,
        method: "POST",
        body: { ...credentials }

      })
    }),
    registerWithGoogle: builder.mutation({
      query: ( credentials ) => ({
        url: `auth/register-with-google`,
        method: "POST",
        body: { ...credentials }

      })
    }),



  }),
});
// auto generated hooks for login mutation
// auth/check-verify auth/dashboard/me
export const { 
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useCheckVerifyMutation,
  useGetAdminQuery,
  useVerifyForgotPasswordMutation,
  useResetPasswordMutation,
  useCheckVerifyForgotPasswordMutation,
  useRegisterWithGoogleMutation
 } = authApiSlice;
