import { apiSlice } from "@/store/api/apiSlice";

export const readedTutorialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReadedTutorial: builder.query({
      query: () => `/request-tutorials/is-read?isRead=true&page=1`,
      keepUnusedDataFor: 5,
      providesTags: ["ReadedTutorial"],
    }),
  }),
});

export const { useGetReadedTutorialQuery } = readedTutorialApiSlice;
