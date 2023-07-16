import { apiSlice } from "@/store/api/apiSlice";

export const unreadReqApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getUnreadReq: builder.query({
            query: ()=> `/request-tutorials/is-read?isRead=false&page=1`,
            keepUnusedDataFor: 5,
            providesTags: ['UnreadReq']
        }),
        deleteUnreadReq: builder.mutation({
            query: (id)=>({
                url: `/request-tutorials/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['UnreadReq']
        })
    })
})
export const { useGetUnreadReqQuery ,useDeleteUnreadReqMutation} = unreadReqApiSlice