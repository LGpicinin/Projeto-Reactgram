import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    loading: false,
    error: false,
    success: false,
    message: null,
}

export const profile = createAsyncThunk("user/profile", async(user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.profile(user, token)

    return data
})

export const updateProfile = createAsyncThunk("user/update", async(user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.updateProfile(user, token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const getUserById = createAsyncThunk("user/:id", async(id, thunkAPI) => {
    const data = await userService.getUserById(id)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(profile.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(profile.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        }).addCase(updateProfile.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.message = "Usuário atualizado com sucesso"
            state.user = action.payload
        }).addCase(updateProfile.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
            state.user = null
        }).addCase(getUserById.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        }).addCase(getUserById.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
            state.user = null
        })
    }
})

export const {resetUserMessage} = userSlice.actions;
export default userSlice.reducer;