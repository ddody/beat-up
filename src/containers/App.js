import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import {
  SET_NOTE_INDEX,
  ON_NOTE_CHANGE,
  SET_BEAT_BPM,
  ON_BEAT_INIT,
  ON_BEAT_STATE,
  ADD_BEAT_LIST,
  ON_CHANGE_BEAT_LINE,
  ON_BEAT_LIST_SHOW,
  ON_SELECT_BEAT_LINE
} from '../constants/actionTypes'

const beatupStateToProps = (state) => {
  return {
    bpm: state.bpm,
    nowNoteIndex: state.nowNoteIndex,
    noteNum: state.noteNum,
    isPlay: state.isPlay, // play, pause, stop
    initBeat: state.initBeat,
    initEvents: state.initEvents,
    beat: state.beat,
    beatList: state.beatList,
    isBeatListShow: state.isBeatListShow
  };
};

const beatupDispatchProps = (dispatch) => {
  return {
    setNoteIndex(noteIdx) {
      dispatch({ type: SET_NOTE_INDEX, noteIdx });
    },
    onNoteChange(beat) {
      dispatch({ type: ON_NOTE_CHANGE, beat });
    },
    setBeatBpm(bpm) {
      dispatch({ type: SET_BEAT_BPM, bpm });
    },
    onBeatInit() {
      dispatch({ type: ON_BEAT_INIT });
    },
    onBeatState(state) {
      dispatch({ type: ON_BEAT_STATE, state });
    },
    addBeatList(beat) {
      dispatch({ type: ADD_BEAT_LIST, beat });
    },
    onChangeBeatLine(beat) {
      dispatch({ type: ON_CHANGE_BEAT_LINE, beat });
    },
    onBeatListShow(state) {
      dispatch({ type: ON_BEAT_LIST_SHOW, state });
    },
  };
};

export default connect(beatupStateToProps, beatupDispatchProps)(AppComponent);
