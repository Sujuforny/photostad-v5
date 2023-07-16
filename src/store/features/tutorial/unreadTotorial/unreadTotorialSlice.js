import { BASE_URL } from "@/lib/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    unreadRequest:[],
    status: 'idle',//loading, succeeded, failed
    error: null,
    total: 0

}
export const fetchUnreadReq = createAsyncThunk('unreadRequest/fetchUnreadReq',async()=>{
    try{
        const res = await axios.get(`${BASE_URL}/request-tutorials/is-read?isRead=false&page=1`)
        return res.data
    }
    catch(err){

        console.log(err)
    }
})

const unreadReqSlice= createSlice({
    name: 'runreadRequest',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(fetchUnreadReq.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchUnreadReq.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.unreadRequest= action.payload.data.list
            state.total = action.payload.data.total
        })
        .addCase(fetchUnreadReq.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})
// export action ; we have no action that's why hehe
export const { } = unreadReqSlice.actions
//export reducer
export default unreadReqSlice.reducer
// export selector
export const selectUnreadReq = state => state.unreadRequest.unreadRequest
export const selectTotalUnread = state => state.unreadRequest.total