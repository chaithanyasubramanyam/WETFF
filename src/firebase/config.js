import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCDWRW1bw1WsDHWuhvHceFX_PCgOx6iKs4",
    authDomain: "pwadeploy-b3fb7.firebaseapp.com",
    databaseURL: "https://pwadeploy-b3fb7.firebaseio.com",
    projectId: "pwadeploy-b3fb7",
    storageBucket: "pwadeploy-b3fb7.appspot.com",
    messagingSenderId: "536120513857",
    appId: "1:536120513857:web:28f80fc71f0710537a3dc0",
    measurementId: "G-GPEH37DBM2"
  };

firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true});

export default firebase;