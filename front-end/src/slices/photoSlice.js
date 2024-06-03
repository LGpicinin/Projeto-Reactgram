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

export const deletePhoto = createAsyncThunk("photos/delete", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.deletePhoto(id, token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
})

export const editPhoto = createAsyncThunk("photos/edit", async(photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.editPhoto(photoData.id, {title: photoData.title },token)

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
            state.message = "Publicação criada com sucesso"
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
        }).addCase(deletePhoto.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(deletePhoto.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.message = action.payload.message
            state.photos = state.photos.filter((photo) => {
                if(action.payload.id != photo._id){
                    return photo
                }
            })
        }).addCase(deletePhoto.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        }).addCase(editPhoto.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(editPhoto.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.message = action.payload.message
            state.photos.map((photo) => {
                if(action.payload.photo._id != photo._id){
                    return photo
                }
                else{
                    photo.title = action.payload.photo.title
                    return photo
                }
            })
        }).addCase(editPhoto.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
            state.photo = {}
        })
    }
})

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer;