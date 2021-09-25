import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { initialMusicState, MusicState } from './initialStore';

export const musicSlice = createSlice({
  name: 'music',
  initialState: initialMusicState,
  reducers: {
    togglePlaying: state => {
      state.playing = !state.playing;
    },
    toggleMusicCell: (state, action: PayloadAction<[number, number]>) => {
      state.music[action.payload[0]].notes[action.payload[1]] =
        !state.music[action.payload[0]].notes[action.payload[1]];
    },
    toggleInstShowing: (state, action: PayloadAction<string>) => {
      state.music = state.music.map(row => {
        if (row.instName === action.payload) {
          row.show = !row.show;
        }
        return row;
      });
    },
    changeBeat: (state, action: PayloadAction<number>) => {
      state.beat = action.payload;
    },
    changeBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    }
  }
});

export const { changeBeat, changeBpm, toggleInstShowing, toggleMusicCell, togglePlaying } =
  musicSlice.actions;

export const selectBeat = (state: RootState): number => state.music.beat;
export const selectBpm = (state: RootState): number => state.music.bpm;
export const selectMusic = (state: RootState): MusicState['music'] => state.music.music;
export const selectPlaying = (state: RootState): boolean => state.music.playing;

const musicReducer = musicSlice.reducer;
export default musicReducer;
