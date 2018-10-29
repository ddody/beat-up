import { connect } from 'react-redux';
import SoundListComponent from '../components/SoundListComponent';
import firebase from '../services/firebase';
import {
  ADD_BEAT_SOUND_FILE,
  ADD_SOUND_LIST,
  IS_SOUND_UPLOAD_AND_LODING,
  ON_CHANGE_BEAT_LINE,
} from '../constants/actionTypes';

const storage = firebase.storage();
const database = firebase.database();
const soundListStateToProps = (state) => {
  return {
    beat: state.beat,
    isBeatListShow: state.isBeatListShow,
    soundList: state.soundList,
  };
}

const soundListDispatchProps = (dispatch) => {
  return {
    onChangeBeatLine(beat) {
      dispatch({ type: ON_CHANGE_BEAT_LINE, beat });
    },
    addBeatSoundFile(file, keys) {
      dispatch({ type: ADD_BEAT_SOUND_FILE, file });
      dispatch({ type: IS_SOUND_UPLOAD_AND_LODING, state: true });
      const beatFileRef = storage.refFromURL(`gs://beat-up-b9ef1.appspot.com/upload/${file.name}`);

      beatFileRef.put(file)
        .then((result) => {
          return result
        }).then((result) => {
          beatFileRef.getDownloadURL()
            .then((result) => {
              database.ref(`upload/${file.name.split('.')[0]}`).set({
                beatName: file.name.split('.')[0],
                beatUrl: result
              })
                .then((result) => {
                  database.ref(`upload/${file.name.split('.')[0]}`).on('value', (snapshot) => {
                    const addSoundFile = snapshot.val();
                    dispatch({ type: ADD_SOUND_LIST, addSoundFile });
                    keys.add(file.name.split('.')[0], addSoundFile.beatUrl, () => {
                      dispatch({ type: IS_SOUND_UPLOAD_AND_LODING, state: false });
                    });
                  });
                })
                .catch(err => {
                  console.log(err);
                  alert('File upload Error');
                });
            })
            .catch(err => {
              console.log(err);
              alert('File upload Error');
            });
        })
        .catch(err => {
          console.log(err);
          alert('File upload Error');
        });
    }
  }
}

export default connect(soundListStateToProps, soundListDispatchProps)(SoundListComponent);
