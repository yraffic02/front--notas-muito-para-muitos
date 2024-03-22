import { configureStore } from '@reduxjs/toolkit';
import notaReducer from './features/nota-slice';

export const store = configureStore({
    reducer: {
        notaReducer
    }
});

export const RootState = typeof store.getState;

export const AppDispatch = typeof store.dispatch
