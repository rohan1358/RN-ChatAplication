import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {Thumbnail} from 'native-base';
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
import * as firebase from 'firebase';
import Logo from '../image/chat.png';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false,
    };
  }
  Login(username, password) {
    if (username && password === null) {
      alert('email & password tidak boleh kosong');
    } else {
      try {
        this.setState({error: '', loading: true});
        var dataUser = firebase.database().ref('users');
        dataUser.once('value', valueDB => {
          valueDB.forEach(res => {
            var data = res.toJSON();

            if (data.username === username && data.password === password) {
              AsyncStorage.setItem('dataUser', JSON.stringify(data));
              this.props.navigation.navigate('Home');
              return;
            } else {
              console.warn('Gagal Login');
            }
          });
        });
        // firebase
        //   .auth()
        //   .signInWithEmailAndPassword(email, password)
        //   .then(res => {
        //     console.warn(res);
        //     this.setState({error: '', loading: false});
        //     this.props.navigation.navigate('Home');
        //     console.log('masuk');
        //   });
      } catch {
        console.log('email & password false');
      }
    }

    // this.props.navigation.navigate('Home');
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
          <Thumbnail square large source={Logo} />
          <Text style={styles.txtLogin}>Let's Chat</Text>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.inp}
            placeholder="username"
            onChangeText={username => this.setState({username})}
          />
          <TextInput
            style={styles.inp}
            placeholder="password"
            onChangeText={password => this.setState({password})}
          />
          <View style={styles.btn} style={{marginTop: 50}}>
            <Button
              title="Login"
              onPress={() =>
                this.Login(this.state.username, this.state.password)
              }
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Or</Text>
          </View>
          <View style={styles.btn}>
            <Button
              title="Register"
              onPress={() => this.props.navigation.navigate('Register')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtLogin: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerLogin: {
    alignItems: 'center',
    paddingTop: 60,
  },
  inp: {
    height: 30,
    flexDirection: 'row',
    marginTop: 30,
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
