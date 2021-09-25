import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './musicSlice';
import viewReducer from './viewSlice';

export const store = configureStore({
  reducer: {
    music: musicReducer,
    view: viewReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
