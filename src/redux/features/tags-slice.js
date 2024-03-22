import { api } from '@/lib/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  value:[],
  status: 'idle',
  error: null
}

export const getTags = createAsyncThunk('nota/getNota', async (thunkAPI) => {
  try {
    const response = await api.get(`/tags`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  }
});

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
        state.error = null;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const {} = tagsSlice.actions;
export default tagsSlice.reducer;
