import {
  SET_NOTE_INDEX,
  ON_NOTE_CHANGE,
  SET_BEAT_BPM,
  ON_BEAT_INIT,
  ON_BEAT_STATE,
  ADD_BEAT_LIST,
  ON_BEAT_LIST_SHOW,
  ON_SELECT_BEAT_LINE,
  ON_CHANGE_BEAT_LINE
} from '../constants/actionTypes'

const initialState = {
  bpm: 80,
  nowNoteIndex: null,
  noteNum: 32,
  isPlay: 'stop',
  initBeat: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  initEvents: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  beat: {
    kick: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    bass: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    oh: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ch: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    snare: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  },
  beatList: [],
  isBeatListShow: false,
  nowSelectedBeatLine: null
};

function beatupReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_NOTE_INDEX:
      return Object.assign({}, state, {
        nowNoteIndex: action.noteIdx
      });
    case ON_NOTE_CHANGE:
      return Object.assign({}, state, {
        ...state,
        beat: action.beat
      });
    case SET_BEAT_BPM:
      return Object.assign({}, state, {
        bpm: action.bpm
      });
    case ON_BEAT_INIT:
      let beatCopy = { ...state.beat };
      for (let beat in beatCopy) {
        beatCopy[beat] = state.initBeat.slice();
      }
      return Object.assign({}, state, {
        beat: beatCopy,
        nowNoteIndex: null
      });
    case ON_BEAT_STATE:
      return Object.assign({}, state, {
        isPlay: action.state
      });
    case ADD_BEAT_LIST:
      return Object.assign({}, state, {
        beatList: action.beat
      });
    case ON_BEAT_LIST_SHOW:
      return Object.assign({}, state, {
        isBeatListShow: action.state
      });
    case ON_SELECT_BEAT_LINE:
      return Object.assign({}, state, {
        nowSelectedBeatLine: action.beat
      });
    case ON_CHANGE_BEAT_LINE:
      let beatChangeCopy = { ...state.beat };
      delete (beatChangeCopy[state.nowSelectedBeatLine]);
      beatChangeCopy[action.beat] = state.initBeat.slice();
      return Object.assign({}, state, {
        beat: beatChangeCopy,
        nowSelectedBeatLine: action.beat
      });
    default:
      return Object.assign({}, state);
  }
}

export default beatupReducer;
