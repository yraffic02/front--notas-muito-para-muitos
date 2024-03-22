import { configureStore } from '@reduxjs/toolkit';
import notaReducer from './features/nota-slice';
import notasReducer from './features/notas-slice'

export const store = configureStore({
    reducer: {
        notaReducer,
        notasReducer
    }
});

export const RootState = typeof store.getState;

export const AppDispatch = typeof store.dispatch
