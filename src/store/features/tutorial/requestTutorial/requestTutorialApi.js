import { apiSlice } from "@/store/api/apiSlice";

export const requestTutorialApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getRequestTutorial: builder.query({
            query: ()=> `/request-tutorials/is-read?isRead=false&page=1`,
            keepUnusedDataFor: 5,
            providesTags: ['RequestTutorial']
        
        }),
        deleteRequestTutorial: builder.mutation({
            query: (id)=>({
                url: `/request-tutorials/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['RequestTutorial']
        }),
        updateIsRead: builder.mutation({
            query: (id)=>({
                url: `/request-tutorials/${id}/is-read`,
                method: 'PUT'
            }),
            invalidatesTags: ['RequestTutorial']
        })
    })
})
export const { useGetRequestTutorialQuery ,useDeleteRequestTutorialMutation, useUpdateIsReadMutation } = requestTutorialApiSlice