import { apiSlice } from "@/store/api/apiSlice";
export const ImageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllImages: builder.query({
          query: (page,limit) => `images?page=${page}&limit=${limit}`,
          invalidatesTags: ['Images'],
        }),
        getImageById: builder.query({
          query: (id) => `images/${id}`,
        }),
        removeImageById: builder.mutation({
          query: (id) => ({
            url: `images/${id}`,
            method: "DELETE",
        }),
        }),
        updateImageById: builder.mutation({
            query: (id,credentials) => ({
            url: `images/${id}`,
            method: "PUT",
            body:{...credentials}
         }),
        }),
        addImageByName: builder.mutation({
            query: (credentials) => ({
            url: `images`,
            method: "POST",
            body:{...credentials}
         }),
        }),
    }),
  });
export const { 
  useGetAllImagesQuery ,
  useGetImageByIdQuery,
  useRemoveImageByIdMutation,
  useUpdateImageByIdMutation,
  useAddImageByNameMutation ,
} = ImageApiSlice;