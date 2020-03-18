import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
// import {
//   Container,
//   Content,
//   Form,
//   Item,
//   Input,
//   Button,
//   Label,
// } from 'native-base';
// import firebase from 'firebase';

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
// firebase.initializeApp(firebaseConfig);

// Initialize Firebase
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  }
  Login(email, password) {
    // try {
    //   this.setState({error: '', loading: true});
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then(() => {
    //       this.setState({error: '', loading: false});
    //       this.props.navigation.navigate('MyTabs');
    //       console.log('masuk');
    //     });
    // } catch {
    //   console.log('email & password false');
    // }
    this.props.navigation.navigate('Home');
  }

  SIgnUp(email, password) {
    // try {
    //   if (this.state.email.length < 2) {
    //     alert('email kurangl');
    //     return;
    //   } else {
    //     firebase.auth().createUserWithEmailAndPassword(email, password);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  render() {
    return (
      <View>
        <View style={styles.headerLogin}>
          <Text style={styles.txtLogin}>Chatting App</Text>
        </View>
        <View style={styles.content}>
          <TextInput style={styles.inp} placeholder="username" />
          <TextInput style={styles.inp} placeholder="password" />
          <View style={styles.btn}>
            <Button title="Login" onPress={() => this.Login()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtLogin: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerLogin: {
    alignItems: 'center',
    paddingTop: 30,
  },
  inp: {
    height: 30,
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    color: 'blue',
    paddingBottom: 2,
    paddingTop: 0,
    padding: 10,
  },
  content: {
    marginHorizontal: 30,
  },
  btn: {
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  txtbtn: {
    color: 'white',
  },
});
