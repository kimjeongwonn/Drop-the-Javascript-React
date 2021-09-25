import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instInfo, InstName } from '../Data/instData';

const INITIAL_BEAT = 16;
const INITIAL_BPM = 150;
const MAX_BPM = 500;
const MIN_BPM = 50;
const MAX_BEAT = 64;
const MIN_BEAT = 2;
const INITAIL_INST_COUNT = 5;

interface MusicRow {
  instName: InstName;
  notes: boolean[];
  show: boolean;
}

interface MusicState {
  music: MusicRow[];
  bpm: number;
  playing: boolean;
  beat: number;
}

const initialState: MusicState = {
  music: Object.keys(instInfo).map((instName, idx) => ({
    instName,
    notes: Array(MAX_BEAT).fill(false),
    show: idx < INITAIL_INST_COUNT
  })),
  bpm: INITIAL_BPM,
  playing: false,
  beat: INITIAL_BEAT
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
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

export const selectBeat = (state: MusicState): number => state.beat;
export const selectBpm = (state: MusicState): number => state.bpm;
export const selectMusic = (state: MusicState): MusicRow[] => state.music;
export const selectPlaying = (state: MusicState): boolean => state.playing;

export default musicSlice.reducer;
