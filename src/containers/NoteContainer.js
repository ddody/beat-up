import { connect } from 'react-redux';
import NotePanelComponent from '../components/NotePanelComponent';
import {
  NoteChange,
  beatListShow,
  beatLineSelect,
} from '../actions'

const beatupStateToProps = (state) => {
  return {
    nowNoteIndex: state.nowNoteIndex,
    beat: state.beat,
    isBeatListShow: state.isBeatListShow,
    nowSelectedBeatLine: state.nowSelectedBeatLine,
    soundList: state.soundList
  }
}

const beatupDispatchProps = (dispatch) => {
  return {
    onNoteChange(beat) {
      dispatch(NoteChange(beat));
    },
    onBeatListShow(state) {
      dispatch(beatListShow(state));
    },
    onSelectBeatLine(beat) {
      dispatch(beatLineSelect(beat));
    },
  }
}

export default connect(beatupStateToProps, beatupDispatchProps)(NotePanelComponent);