import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCd0lat7a0yADCmv2FqBImJHMeJ_ru64-M',
  authDomain: 'react-novi-netflix.firebaseapp.com',
  databaseURL: 'https://react-novi-netflix.firebaseio.com',
  projectId: 'react-novi-netflix',
  storageBucket: 'react-novi-netflix.appspot.com',
  messagingSenderId: '491988304597',
  appId: '1:491988304597:web:e3235ec0468d247c0fd85c',
  measurementId: 'G-WXWBZJFD77',
};

firebase.initializeApp(config);
export default firebase;
