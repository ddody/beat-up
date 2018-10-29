import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import firebase from '../services/firebase';
import {
  SET_NOTE_INDEX,
  ON_NOTE_CHANGE,
  SET_BEAT_BPM,
  ON_BEAT_INIT,
  ON_BEAT_STATE,
  ON_BEAT_LIST_SHOW,
  ADD_SOUND_LIST,
  ON_SELECT_BEAT_LINE,
  ADD_BEAT_LINE,
  REMOVE_BEAT_LINE,
  ON_BEAT_SAVE_URL,
  ON_BEAT_SAVE_URL_SHOW,
  IS_SOUND_UPLOAD_AND_LODING
} from '../constants/actionTypes';

const database = firebase.database();

const beatupStateToProps = (state) => {
  return {
    bpm: state.bpm,
    nowNoteIndex: state.nowNoteIndex,
    noteNum: state.noteNum,
    isPlay: state.isPlay,
    initBeat: state.initBeat,
    initEvents: state.initEvents,
    beat: state.beat,
    isBeatListShow: state.isBeatListShow,
    nowSelectedUploadFile: state.nowSelectedUploadFile,
    soundList: state.soundList,
    isSoundUploadAndLoding: state.isSoundUploadAndLoding,
    saveUrl: state.saveUrl,
    saveUrlShow: state.saveUrlShow
  };
};

const beatupDispatchProps = (dispatch, ownProps) => {
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
    onBeatListShow(state) {
      dispatch({ type: ON_BEAT_LIST_SHOW, state });
    },
    addSoundList(sound) {
      dispatch({ type: ADD_SOUND_LIST, sound });
    },
    onSelectBeatLine(beat) {
      dispatch({ type: ON_SELECT_BEAT_LINE, beat });
    },
    addBeatLine() {
      dispatch({ type: ADD_BEAT_LINE });
    },
    removeBeatLine() {
      dispatch({ type: REMOVE_BEAT_LINE });
    },
    onBeatSave(beat, bpm) {
      let beatCopy = { ...beat };
      const beatCopyKeys = Object.keys(beatCopy);
      for (let i = 0; i < beatCopyKeys.length; i++) {
        if (beatCopyKeys[i].indexOf('noname') > -1) {
          delete beatCopy[beatCopyKeys[i]];
        }
      }
      const sheetKey = database.ref(`beatSheet`).push().getKey();
      database.ref(`beatSheet/${sheetKey}`).set({
        beatCopy,
        bpm,
      })
        .then(() => {
          dispatch({ type: ON_BEAT_SAVE_URL, saveUrl: sheetKey });
          dispatch({ type: ON_BEAT_SAVE_URL_SHOW, state: true });
        })
        .catch((err) => {
          console.log(err);
          alert('Beat save failed');
        });
    },
    onBeatSaveShow(state) {
      dispatch({ type: ON_BEAT_SAVE_URL_SHOW, state });
    },
    onBeatLoad(beatKey, soundList, keys, bpm) {
      const addKeysPromiseArr = [];
      if (beatKey !== "/") {
        dispatch({ type: IS_SOUND_UPLOAD_AND_LODING, state: true });
        database.ref(`beatSheet${beatKey}`).on('value', (snapshot) => {
          bpm.value = snapshot.val().bpm;
          dispatch({ type: ON_NOTE_CHANGE, beat: snapshot.val().beatCopy });
          dispatch({ type: SET_BEAT_BPM, bpm: snapshot.val().bpm });
          const addSoundFile = Object.keys(snapshot.val().beatCopy).filter(beat => {
            if (Object.keys(soundList).indexOf(beat) < 0) {
              return beat;
            }
          });
          const addSoundFilePromiseArr = [];
          for (let i = 0; i < addSoundFile.length; i++) {
            addSoundFilePromiseArr[i] = new Promise((resolve, reject) => {
              database.ref(`upload/${addSoundFile[i]}`).on('value', (snapshot) => {
                const addSoundFile = snapshot.val();
                resolve(addSoundFile);
                dispatch({ type: ADD_SOUND_LIST, addSoundFile });
              });
            });
          }

          Promise.all(addSoundFilePromiseArr)
            .then((result) => {
              for (let i = 0; i < result.length; i++) {
                addKeysPromiseArr[i] = new Promise((resolve, reject) => {
                  keys.add(result[i].beatName, result[i].beatUrl, () => {
                    resolve(i);
                  });
                });
              }

              Promise.all(addKeysPromiseArr)
                .then((result) => {
                  dispatch({ type: IS_SOUND_UPLOAD_AND_LODING, state: false });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            })
        });
      }
    }
  };
};

export default connect(beatupStateToProps, beatupDispatchProps)(AppComponent);
