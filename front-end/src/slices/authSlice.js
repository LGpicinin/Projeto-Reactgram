import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    loading: false,
    error: false,
    success: false,
}


//register
export const register = createAsyncThunk("auth/register", async(user, thunkAPI) => {
    const data = await authService.register(user)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

//logout
export const logout = createAsyncThunk("auth/logout", () => {
    authService.logout()
})

//login
export const login = createAsyncThunk("auth/login", async(user, thunkAPI) => {
    const data = await authService.login(user)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

//get user
export const getUser = async(id) => {
    const user = await authService.getUser(id)

    if(user.errors){
        return user.errors[0]
    }

    return user
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.error = false
            state.loading = false
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        }).addCase(register.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
            state.user = null
        }).addCase(logout.fulfilled, (state) => {
            state.loading = false
            state.success = true 
            state.error = null
            state.user = null
        }).addCase(login.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        }).addCase(login.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer