import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { initialMusicState, MusicState } from './initialStore';

export const musicSlice = createSlice({
  name: 'music',
  initialState: initialMusicState,
  reducers: {
    setMusic: (state, action: PayloadAction<MusicState['music']>) => {
      state.music = action.payload;
      window.sessionStorage.setItem('music', JSON.stringify(state.music));
    },

    clearMusic: state => {
      state.music.map(row => {
        return row.notes.fill(false);
      });
      window.sessionStorage.setItem('music', JSON.stringify(state.music));
    },

    togglePlaying: state => {
      state.playing = !state.playing;
    },
    toggleMusicCell: (state, action: PayloadAction<{ pos: [number, number]; force?: boolean }>) => {
      const { pos, force } = action.payload;
      state.music[pos[0]].notes[pos[1]] = force ?? !state.music[pos[0]].notes[pos[1]];
      window.sessionStorage.setItem('music', JSON.stringify(state.music));
    },
    toggleInstShowing: (state, action: PayloadAction<string>) => {
      if (
        state.music.filter(row => row.instName !== action.payload).every(row => row.show === false)
      ) {
        return;
      }
      state.music.map(row => {
        if (row.instName === action.payload) {
          row.show = !row.show;
        }
      });
      window.sessionStorage.setItem('music', JSON.stringify(state.music));
    },
    changeBeat: (state, action: PayloadAction<number>) => {
      state.beat = action.payload;
      window.sessionStorage.setItem('beat', action.payload.toString());
    },
    changeBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
      window.sessionStorage.setItem('bpm', action.payload.toString());
    }
  }
});

export const {
  setMusic,
  clearMusic,
  changeBeat,
  changeBpm,
  toggleInstShowing,
  toggleMusicCell,
  togglePlaying
} = musicSlice.actions;

export const selectBeat = (state: RootState): number => state.music.beat;
export const selectBpm = (state: RootState): number => state.music.bpm;
export const selectMusic = (state: RootState): MusicState['music'] => state.music.music;
export const selectPlaying = (state: RootState): boolean => state.music.playing;

const musicReducer = musicSlice.reducer;
export default musicReducer;
