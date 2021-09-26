import { instInfo, InstNameUnion } from '../Data/instData';

/* Music */

interface MusicRow {
  instName: InstNameUnion;
  notes: boolean[];
  show: boolean;
}

export interface MusicState {
  music: MusicRow[];
  bpm: number;
  playing: boolean;
  beat: number;
}

const INITIAL_BEAT = +window.sessionStorage.getItem('beat') ?? 16;
const INITIAL_BPM = +window.sessionStorage.getItem('bpm') ?? 150;
const MAX_BPM = 500;
const MIN_BPM = 50;
const MAX_BEAT = 64;
const MIN_BEAT = 2;
const INITIAL_INST_COUNT = 5;

export const MUSIC_CONSTANCE = {
  INITIAL_BEAT,
  INITIAL_BPM,
  MAX_BPM,
  MIN_BPM,
  MAX_BEAT,
  MIN_BEAT,
  INITIAL_INST_COUNT: INITIAL_INST_COUNT
};

export const initialMusicState: MusicState = {
  music:
    JSON.parse(window.sessionStorage.getItem('music')) ??
    Object.keys(instInfo).map((instName: InstNameUnion, idx) => ({
      instName,
      notes: Array(MAX_BEAT).fill(false),
      show: idx < INITIAL_INST_COUNT
    })),
  bpm: INITIAL_BPM,
  playing: false,
  beat: INITIAL_BEAT
};

/* View */

export interface ViewState {
  viewWidth: number;
  viewHeight: number;
  isMobile: boolean;
  pageUnit: number;
  totalPage: number;
  currentPage: number;
}

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const IS_MOBILE = WINDOW_WIDTH < 768;

export const initialViewState: ViewState = {
  viewWidth: WINDOW_WIDTH,
  viewHeight: WINDOW_HEIGHT,
  isMobile: IS_MOBILE,
  pageUnit: IS_MOBILE ? 8 : 16,
  totalPage: Math.ceil(initialMusicState.beat / (IS_MOBILE ? 8 : 16)),
  currentPage: 1
};
