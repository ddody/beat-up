import { connect } from 'react-redux';
import NotePanelComponent from '../components/NotePanelComponent';
import {
  ON_NOTE_CHANGE,
  ON_BEAT_LIST_SHOW,
  ON_SELECT_BEAT_LINE,

} from '../constants/actionTypes'

const beatupStateToProps = (state) => {
  return {
    nowNoteIndex: state.nowNoteIndex,
    beat: state.beat,
    isBeatListShow: state.isBeatListShow,
    nowSelectedBeatLine: state.nowSelectedBeatLine
  }
}

const beatupDispatchProps = (dispatch) => {
  return {
    onNoteChange(beat) {
      dispatch({ type: ON_NOTE_CHANGE, beat });
    },
    onBeatListShow(state) {
      dispatch({ type: ON_BEAT_LIST_SHOW, state });
    },
    onSelectBeatLine(beat) {
      console.log(beat);
      dispatch({ type: ON_SELECT_BEAT_LINE, beat });
    }
  }
}

export default connect(beatupStateToProps, beatupDispatchProps)(NotePanelComponent);