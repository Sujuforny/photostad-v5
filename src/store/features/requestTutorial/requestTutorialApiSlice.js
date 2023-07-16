import { apiSlice } from "@/store/api/apiSlice";

export const requestTutorialApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getAllRequestTutorials: builder.query({
            query: () => `request-tutorials`,
            invalidatesTags: ['RequestTutorial'],
        }),
        addRequestTutorials: builder.mutation({
                query: (credentials) => ({
                url: "request-tutorials/user-request",
                method: "POST",
                body:{ ...credentials }
            }),
        }),
        getRequestTutorialById: builder.query({
            query: (id) => `request-tutorials/${id}`,
        }),
        updateRequestTutorialById: builder.mutation({
            query: (id,credentials) => ({
                url: `request-tutorials/${id}`,
                method: "POST",
                body:{ ...credentials }
            })
        }),
        getAllUnread: builder.query({
            query : () => "request-tutorials/is-read"
        }),
        removeRequestTutorialById: builder.mutation({
            query: (credentials) => ({
                url: `request-tutorials/${id}`,
                method: "DELETE",
                body:{ ...credentials }
            })
        }),




    }),
});
export const {
    useGetAllRequestTutorialsQuery,
    useAddRequestTutorialsMutation,
    useGetRequestTutorialByIdQuery,
    useUpdateRequestTutorialByIdMutation,
    useGetAllUnreadQuery,
    useRemoveRequestTutorialByIdMutation
}= requestTutorialApiSlice;