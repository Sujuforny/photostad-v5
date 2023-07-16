
import { BASE_URL } from "@/lib/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState= {
    roles: [],
    status: 'idle',
    error: null
}
export const fetchRoles = createAsyncThunk('roles/fetchRoles',async()=>{
    const res = await fetch(`${BASE_URL}/roles`)
    const data = await res.json()
    return data
}
)
const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(fetchRoles.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchRoles.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.roles = state.roles.concat(action.payload.data.list)
        })
        .addCase(fetchRoles.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

// export action ; we have no action that's why hehe
export const { } = roleSlice.actions
//export reducer
export default roleSlice.reducer
// export selector
export const selectAllRoles = state => state.roles?.roles
export const selectRoleById = (state,roleId) => state.roles.roles.find(role => role.id === roleId)
export const selectRoleStatus = state => state.roles.status
export const selectRoleError = state => state.roles.error

