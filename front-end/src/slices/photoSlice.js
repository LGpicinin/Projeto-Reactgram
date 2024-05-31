import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    loading: false,
    error: false,
    success: false,
    message: null,
}

export const createPhoto = createAsyncThunk("photos/create", async(photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.createPhoto(photo, token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
})

export const getUserPhotos = createAsyncThunk("photos/user", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.getUserPhotos(id, token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
})

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPhoto.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(createPhoto.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.message = "Publicação criada com sucesso com sucesso"
            state.photo = action.payload
            state.photos.unshift(state.photo)
        }).addCase(createPhoto.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
            state.photo = {}
        }).addCase(getUserPhotos.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(getUserPhotos.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.photos = action.payload
        }).addCase(getUserPhotos.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
            state.photos = []
        })
    }
})

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer;