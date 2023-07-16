import { BASE_URL } from "@/lib/baseUrl" 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState={
    requestTutorials: [],
    status: 'idle',//loading, succeeded, failed
    error: null,
    total: 0    
}
export const fetchRequestTutorial = createAsyncThunk('requestTutorials/fetchRequestTutorial',async()=>{
    const res = await axios.get(`${BASE_URL}/request-tutorials`)
    const data = await res.data
    return data

})
export const fetchUnreadRequestTutorial = createAsyncThunk('requestTutorials/fetchUnreadRequestTutorial',async()=>{
    const res = await axios.get(`${BASE_URL}/request-tutorials/is-read?isRead=true&page=1`)
    const data = await res.data
    return data
}
)

export const deleteRequestTUtorial = createAsyncThunk("requestTutorials/deleteRequestTutorial",async(id)=>{
    const res = await axios.delete(`${BASE_URL}/request-tutorials/${id}`)
    const data = await res.data
    return data
})

export const fetchReadedRequestTutorial = createAsyncThunk('requestTutorials/fetchReadedRequestTutorial',async()=>{
    const res = await axios.get(`${BASE_URL}/request-tutorials/is-read?isRead=true&page=1`)
    const data = await res.data
    return data
}
)

  

export const requestTutorialSlice = createSlice({
    name: 'requestTutorials',
    initialState,
    reducers: {}, // no need action i have extraReducers hahaha
    extraReducers(builder){
        builder
        .addCase(fetchRequestTutorial.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchRequestTutorial.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.requestTutorials = action.payload.data.list
            state.total = action.payload.data.total
        })
        .addCase(fetchRequestTutorial.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(deleteRequestTUtorial.pending,(state,action)=>{
            state.status = 'loading'
        }
        )
        .addCase(deleteRequestTUtorial.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.requestTutorials = state.requestTutorials.filter(item=>item.id!==action.payload.data.id)
            state.total = state.total - 1
        }
        )
        .addCase(deleteRequestTUtorial.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        }
        )
        .addCase(fetchUnreadRequestTutorial.pending,(state,action)=>{
            state.status = 'loading'
        }
        )
        .addCase(fetchUnreadRequestTutorial.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.requestTutorials = action.payload.data.list
            state.total = action.payload.data.total
        }
        )
        .addCase(fetchUnreadRequestTutorial.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        }
        )
      

    }
})


// export action ; we have no action that's why hehe
export const { } = requestTutorialSlice.actions
//export reducer
export default requestTutorialSlice.reducer
// export selector
export const selectAllRequestTutorial = state => state.requestTutorials.requestTutorials
export const selectRequestTutorialStatus = state => state.requestTutorials.status
export const selectRequestTutorialTotal = state => state.requestTutorials.total

// readed request tutorial selector
export const selectReadedRequestTutorial = state => state.requestTutorials.requestTutorials.filter(item=>item.isRead===true)

// export delete
// export const deleteTutorial



