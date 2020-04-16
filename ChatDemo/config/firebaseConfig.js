import * as firebase from 'firebase';

var config = {
    apiKey:"AIzaSyDms25wQpLvCrhSfmeLuWsHUTMf28zUo9Y",
    authDomain:"cloudfunctiondemo-d2104.firebaseapp.com",
    databaseURL:"https://cloudfunctiondemo-d2104.firebaseio.com",
    projectId:"cloudfunctiondemo-d2104",
    storageBucket:"cloudfunctiondemo-d2104.appspot.com",
    messagingSenderId:"999415221672"
};

const fire = firebase.initializeApp(config);
export default fire;
