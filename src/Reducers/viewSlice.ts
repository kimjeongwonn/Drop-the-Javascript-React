import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, store } from '.';
import { initialViewState } from './initialStore';

const { getState } = store;

export const viewSlice = createSlice({
  name: 'view',
  initialState: initialViewState,
  reducers: {
    setView: (state, action: PayloadAction<{ height: number; width: number }>) => {
      state.viewHeight = action.payload.height;
      state.viewWidth = action.payload.width;
      state.isMobile = action.payload.width < 768;
      state.pageUnit = action.payload.width < 768 ? 8 : 16;
      state.totalPage = Math.ceil(getState().music.beat / state.pageUnit);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  }
});

export const { setPage, setView } = viewSlice.actions;

export const viewWidthSelector = (state: RootState): number => state.view.viewWidth;
export const isMobileSelector = (state: RootState): boolean => state.view.isMobile;
export const pageUnitSelector = (state: RootState): number => state.view.pageUnit;
export const totalPageSelector = (state: RootState): number => state.view.viewWidth;
export const currentPageSelector = (state: RootState): number => state.view.currentPage;

const viewReducer = viewSlice.reducer;
export default viewReducer;
