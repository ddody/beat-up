// import sounds from '../source/NoteSource';
import {
  SET_NOTE_INDEX,
  ON_NOTE_CHANGE,
  SET_BEAT_BPM,
  ON_BEAT_INIT,
  ON_BEAT_STATE,
  ON_BEAT_LIST_SHOW,
  ON_SELECT_BEAT_LINE,
  ON_CHANGE_BEAT_LINE,
  ADD_BEAT_SOUND_FILE,
  ADD_SOUND_LIST,
  IS_SOUND_UPLOAD_AND_LODING,
  ADD_BEAT_LINE,
  REMOVE_BEAT_LINE,
  ON_BEAT_SAVE_URL,
  ON_BEAT_SAVE_URL_SHOW,
} from '../constants/actionTypes';
import { defaultSound } from '../source/defaultSound';

const emptyNote = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];
const initEvents = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

const initialState = {
  bpm: 80,
  nowNoteIndex: null,
  noteNum: 32,
  isPlay: 'stop',
  initBeat: emptyNote.slice(),
  initEvents: initEvents.slice(),
  beat: [
    { kick: emptyNote.slice() },
    { bass: emptyNote.slice() },
    { oh: emptyNote.slice() },
    { ch: emptyNote.slice() },
    { Ac_HatCl: emptyNote.slice() },
    { Ac_HatOp2: emptyNote.slice() },
    { Ac_KckCym: emptyNote.slice() },
    { Ac_Kick1: emptyNote.slice() },
    { Ac_Kick2: emptyNote.slice() },
    { Ac_Kick3: emptyNote.slice() },
    { Ac_KiknRide: emptyNote.slice() },
    { Ac_MidTom: emptyNote.slice() },
    { Ac_Snare1: emptyNote.slice() },
    { Ac_Snare3: emptyNote.slice() },
    { Ac_Snare4: emptyNote.slice() }
  ],
  isBeatListShow: false,
  nowSelectedBeatLine: null,
  nowSelectedUploadFile: null,
  soundList: defaultSound,
  isSoundUploadAndLoding: false,
  saveUrl: null,
  saveUrlShow: false
};

function beatupReducer(state = initialState, action) {
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
      let beatCopy = state.beat.slice();
      beatCopy = beatCopy.map((beat, index) => {
        return (
          {
            [Object.keys(beat)[0]]: state.initBeat.slice()
          }
        );
      });
      return Object.assign({}, state, {
        beat: beatCopy,
        nowNoteIndex: null
      });
    case ON_BEAT_STATE:
      return Object.assign({}, state, {
        isPlay: action.state
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
      let beatChangeCopy = state.beat.slice();
      beatChangeCopy = beatChangeCopy.filter((beat, index) => !beat[state.nowSelectedBeatLine]);
      beatChangeCopy.push({ [action.beat]: state.initBeat.slice() });
      return Object.assign({}, state, {
        beat: beatChangeCopy,
        nowSelectedBeatLine: action.beat
      });
    case ADD_BEAT_SOUND_FILE:
      return Object.assign({}, state, {
        nowSelectedUploadFile: action.file
      });
    case ADD_SOUND_LIST:
      let soundListCopy = {
        ...state.soundList,
        [action.addSoundFile.beatName]: action.addSoundFile.beatUrl
      };
      return Object.assign({}, state, {
        soundList: soundListCopy
      });
    case IS_SOUND_UPLOAD_AND_LODING:
      return Object.assign({}, state, {
        isSoundUploadAndLoding: action.state
      });
    case ADD_BEAT_LINE:
      let addBeat = state.beat.slice();
      addBeat.push({
        [`noname${Object.keys(addBeat).length}`]: state.initBeat.slice()
      })
      return Object.assign({}, state, {
        ...state,
        beat: addBeat
      });
    case REMOVE_BEAT_LINE:
      let _beatChangeCopy = state.beat.slice();
      _beatChangeCopy = _beatChangeCopy.filter((beat, index) => !beat[state.nowSelectedBeatLine]);
      return Object.assign({}, state, {
        beat: _beatChangeCopy,
        nowSelectedBeatLine: null
      });
    case ON_BEAT_SAVE_URL:
      return Object.assign({}, state, {
        saveUrl: action.saveUrl
      });
    case ON_BEAT_SAVE_URL_SHOW:
      return Object.assign({}, state, {
        saveUrlShow: action.state
      });
    default:
      return Object.assign({}, state);
  }
}

export default beatupReducer;
