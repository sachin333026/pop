import firebase from 'firebase/app'
// import * as firebase from 'firebase/app';
import 'firebase/auth'

var firebaseConfig = {
  // apiKey: "AIzaSyBarfHhld4FMBf0t5Snb68yUmBVZIBHUGQ",
  // authDomain: "otp-demo-fbf5e.firebaseapp.com",
  // projectId: "otp-demo-fbf5e",
  // storageBucket: "otp-demo-fbf5e.appspot.com",
  // messagingSenderId: "1096152643725",
  // appId: "1:1096152643725:web:728e8bb4b78b17cc408ac4"


  apiKey: "AIzaSyCqCJXQq0MuIpb3UG00wPNP5bBHZCTgnAA",
  authDomain: "thecolorgames.firebaseapp.com",
  projectId: "thecolorgames",
  storageBucket: "thecolorgames.appspot.com",
  messagingSenderId: "304043442528",
  appId: "1:304043442528:web:1af5b03561dab9361f5e05",
  measurementId: "G-00QMX721B8"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase