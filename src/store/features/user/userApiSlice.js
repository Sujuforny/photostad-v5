import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/auth/me`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
    }),
    getAllUsers: builder.query({
      query: () => `/users`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
    }),
    getUserByEmail: builder.query({
      query: ({userEmail}) => `/users/email?email=${userEmail}`,
    }), 
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // invalidatesTags are used for updating cache
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updatePasswordById: builder.mutation({
      query: ({id,data}) => ({
      url: `users/${id}/change-password`,
      method: "PUT",
      body:data
    }),
    
    updateProfile: builder.mutation({
      query: ({uuid,data}) => ({
        url: `users/${uuid}/update-profile-client`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],
    }),
    }),
    updateProfile: builder.mutation({
      query: ({uuid,data}) => ({
        url: `users/${uuid}/update-profile-client`,
        method: "PUT",
        body: data
      }),
    }),
    updateInformationClient: builder.mutation({
      query: ({uuid,data}) => ({
        url: `users/${uuid}/update-information-client`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],
    }),


    
  }),
});

// auto generated hooks for getUser query (GET)
export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetUserByEmailQuery,
  useUpdatePasswordByIdMutation,
  useUpdateProfileMutation,
  useUpdateInformationClientMutation
  
} = userApiSlice;
