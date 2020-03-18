// import React from 'react';
// import {ActivityIndicator, StatusBar, View} from 'react-native';

import * as firebase from 'firebase';

// import User from '../../User';

// export default class AuthLoadingScreen extends React.Component {
//   constructor(props) {
//     super(props);
// this._bootstrapAsync();
// }

// UNSAFE_componentWillMount() {
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDdX17Bdz6hxzFTmesYdgyt32AlfuyMWLo',
//   authDomain: 'week6-316c7.firebaseapp.com',
//   databaseURL: 'https://week6-316c7.firebaseio.com',
//   projectId: 'week6-316c7',
//   storageBucket: 'week6-316c7.appspot.com',
//   messagingSenderId: '275786145071',
//   appId: '1:275786145071:web:8d5935cde6039b4eb795da',
//   measurementId: 'G-P9GEEP5BYH',
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// }

// Fetch the token from storage then navigate to our appropriate place
// _bootstrapAsync = async () => {
// User.phone = await AsyncStorage.getItem('userPhone');

// This will switch to the App screen or Auth screen and this loading
// screen will be unmounted and thrown away.
// this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
// };

// Render any loading content that you like here
//   render() {
//     return (
//       <View>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }
