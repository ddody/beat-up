import { connect } from 'react-redux';
import AppComponent from '../components/MainComponent';
import firebase from '../services/firebase';
import {
  noteIndexSet,
  noteChange,
  beatBpmSet,
  beatInitialized,
  beatStateSet,
  beatListShow,
  soundListAdd,
  beatLineSelect,
  beatLineAdd,
  beatLineRemove,
  beatUrlSave,
  beatUrlSaveAndShow,
  soundUploadAndLoad
} from '../actions';

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
    saveUrlShow: state.saveUrlShow,
    router: state.router
  };
};

const beatupDispatchProps = (dispatch, ownProps) => {
  return {
    setNoteIndex(noteIdx) {
      dispatch(noteIndexSet(noteIdx));
    },
    onNoteChange(beat) {
      dispatch(noteChange(beat));
    },
    setBeatBpm(bpm) {
      dispatch(beatBpmSet(bpm));
    },
    onBeatInit() {
      dispatch(beatInitialized());
    },
    onBeatState(state) {
      dispatch(beatStateSet(state));
    },
    onBeatListShow(state) {
      dispatch(beatListShow(state));
    },
    addSoundList(sound) {
      dispatch(soundListAdd(sound));
    },
    onSelectBeatLine(beat) {
      dispatch(beatLineSelect(beat));
    },
    addBeatLine() {
      dispatch(beatLineAdd());
    },
    removeBeatLine() {
      dispatch(beatLineRemove());
    },
    onBeatSave(beat, bpm) {
      let beatCopy = beat.slice();
      beatCopy = beatCopy.filter((beat, index) => {
        if (Object.keys(beat)[0].indexOf('noname') < 0) {
          return beat;
        } else {
          return false;
        }
      });

      const sheetKey = database.ref(`beatSheet`).push().getKey();
      database.ref(`beatSheet/${sheetKey}`).set({
        beatCopy,
        bpm,
      })
        .then(() => {
          dispatch(beatUrlSave(sheetKey));
          dispatch(beatUrlSaveAndShow(true));
        })
        .catch((err) => {
          console.log(err);
          alert('Beat save failed');
        });
    },
    onBeatSaveShow(state) {
      dispatch(beatUrlSaveAndShow(state));
    },
    onBeatLoad(beatKey, soundList, keys, bpm) {
      console.log(beatKey);
      const addKeysPromiseArr = [];
      if (beatKey !== "/") {
        dispatch(soundUploadAndLoad(true));
        database.ref(`beatSheet${beatKey}`).on('value', (snapshot) => {
          bpm.value = snapshot.val().bpm;
          dispatch(noteChange(snapshot.val().beatCopy));
          dispatch(beatBpmSet(snapshot.val().bpm));
          const addSoundFile = snapshot.val().beatCopy.filter(beat => {
            if (Object.keys(soundList).indexOf(Object.keys(beat)[0]) < 0) {
              return beat;
            } else {
              return false;
            }
          });
          const addSoundFilePromiseArr = [];
          for (let i = 0; i < addSoundFile.length; i++) {
            addSoundFilePromiseArr[i] = new Promise((resolve, reject) => {
              database.ref(`upload/${Object.keys(addSoundFile[i])}`).on('value', (snapshot) => {
                const addSoundFile = snapshot.val();
                resolve(addSoundFile);
                dispatch(soundListAdd(addSoundFile));
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
                  dispatch(soundUploadAndLoad(false));
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
