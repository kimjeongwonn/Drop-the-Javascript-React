import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, store } from '.';
import { initialViewState } from './initialStore';

export const viewSlice = createSlice({
  name: 'view',
  initialState: initialViewState,
  reducers: {
    setView: (
      state,
      action: PayloadAction<{ height: number; width: number; currentBeat: number }>
    ) => {
      state.viewHeight = action.payload.height;
      state.viewWidth = action.payload.width;
      state.isMobile = action.payload.width < 768;
      state.pageUnit = action.payload.width < 768 ? 8 : 16;
      state.totalPage = Math.ceil(action.payload.currentBeat / state.pageUnit);
    },
    setPage: (state, action: PayloadAction<number>) => {
      if (action.payload < 1) {
        state.currentPage = 1;
        return;
      }
      if (action.payload > state.totalPage) {
        state.currentPage = state.totalPage;
        return;
      }
      state.currentPage = action.payload;
    }
  }
});

export const { setPage, setView } = viewSlice.actions;

export const selectViewWidth = (state: RootState): number => state.view.viewWidth;
export const selectViewHeight = (state: RootState): number => state.view.viewHeight;
export const selectIsMobile = (state: RootState): boolean => state.view.isMobile;
export const selectPageUnit = (state: RootState): number => state.view.pageUnit;
export const selectTotalPage = (state: RootState): number => state.view.totalPage;
export const selectCurrentPage = (state: RootState): number => state.view.currentPage;

const viewReducer = viewSlice.reducer;
export default viewReducer;
