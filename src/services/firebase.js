import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDYXN1aQs0HJ64BG43euVe19At6EW3m2D4",
  authDomain: "beat-up-b9ef1.firebaseapp.com",
  databaseURL: "https://beat-up-b9ef1.firebaseio.com",
  projectId: "beat-up-b9ef1",
  storageBucket: "beat-up-b9ef1.appspot.com",
  messagingSenderId: "556168814610"
};
firebase.initializeApp(config);

export default firebase;
