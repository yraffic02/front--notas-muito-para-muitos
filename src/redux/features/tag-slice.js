import { api } from '@/lib/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  value: {
    id: 0,
    titulo: "",
    Ntoas: []
  },
  status: 'idle',
  error: null
}

export const getTag = createAsyncThunk('nota/getNota', async (tag, thunkAPI) => {
  try {
    const response = await api.get(`/tags/${tag}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  }
});

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTag.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTag.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
        state.error = null;
      })
      .addCase(getTag.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const {} = tagSlice.actions;
export default tagSlice.reducer;
