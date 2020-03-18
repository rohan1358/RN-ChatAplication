/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDdX17Bdz6hxzFTmesYdgyt32AlfuyMWLo',
  authDomain: 'week6-316c7.firebaseapp.com',
  databaseURL: 'https://week6-316c7.firebaseio.com',
  projectId: 'week6-316c7',
  storageBucket: 'week6-316c7.appspot.com',
  messagingSenderId: '275786145071',
  appId: '1:275786145071:web:8d5935cde6039b4eb795da',
  measurementId: 'G-P9GEEP5BYH',
};

firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
