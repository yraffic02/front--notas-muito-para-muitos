import { api } from '@/lib/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  value: {
    id: 0,
    titulo: "",
    conteudo: "",
    Tags: []
  },
  status: 'idle',
  error: null
}

export const getNota = createAsyncThunk('nota/getNota', async (notaId, thunkAPI) => {
  try {
    const response = await api.get(`/notas/${notaId.id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  }
});

export const notaSlice = createSlice({
  name: 'nota',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNota.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNota.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
        state.error = null;
      })
      .addCase(getNota.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const {} = notaSlice.actions;
export default notaSlice.reducer;
