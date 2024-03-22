import { api } from '@/lib/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  value:[],
  status: 'idle',
  error: null
}

export const getNotas = createAsyncThunk('nota/getNota', async (thunkAPI) => {
  try {
    const response = await api.get(`/notas`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  }
});

export const getNotasByTagId = createAsyncThunk('nota/getNotaByTagId', async (tagId, thunkAPI) => {
  try {
    const response = await api.get(`/notas?tagId=${tagId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  }
});

export const notasSlice = createSlice({
  name: 'notas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotas.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
        state.error = null;
      })
      .addCase(getNotas.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(getNotasByTagId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotasByTagId.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
        state.error = null;
      })
      .addCase(getNotasByTagId.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const {} = notasSlice.actions;
export default notasSlice.reducer;
