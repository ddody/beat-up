import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDZ_UQAjiS_iD-1z13eUc-EFzJWkX2iEo8",
  authDomain: "we-beat.firebaseapp.com",
  databaseURL: "https://we-beat.firebaseio.com",
  projectId: "we-beat",
  storageBucket: "we-beat.appspot.com",
  messagingSenderId: "11320516149"
};
firebase.initializeApp(config);

export default firebase;
