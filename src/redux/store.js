import { configureStore } from '@reduxjs/toolkit';
import notaReducer from './features/nota-slice';
import notasReducer from './features/notas-slice'
import tagReducer from './features/tag-slice'
import tagsReducer from './features/tags-slice'

export const store = configureStore({
    reducer: {
        notaReducer,
        notasReducer,
        tagReducer,
        tagsReducer
    }
});

export const RootState = typeof store.getState;

export const AppDispatch = typeof store.dispatch
