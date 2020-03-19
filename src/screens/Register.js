import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
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
import User from '../../User';
// import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      phone: '',
      error: '',
      loading: false,
    };
  }
  Login(email, password) {
    if (email && password === null) {
      alert('email & password tidak boleh kosong');
    } else {
      try {
        this.setState({error: '', loading: true});
        var dataUser = firebase.database().ref('users');
        dataUser.once('value', valueDB => {
          valueDB.forEach(res => {
            var data = res.toJSON();

            if (data.email === email && data.password == password) {
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

  submitForm = async () => {
    if (this.state.phone.length < 5) {
      Alert.alert('Error,Phone must > 5');
    } else if (this.state.username.length < 3) {
      Alert.alert('Wrong Name');
    } else {
      // alert(this.state.phone + '\n' + this.state.username);
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase
        .database()
        .ref('users/' + User.phone)
        .set({
          username: this.state.username,
          password: this.state.password,
          pin: this.state.phone,
        });
      this.props.navigation.navigate('Home');
    }
  };
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
          <TextInput
            style={styles.inp}
            placeholder="Pin"
            onChangeText={phone => this.setState({phone})}
          />
          <View style={styles.btn}>
            <Button title="Register" onPress={() => this.submitForm()} />
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
    marginTop: 50,
    justifyContent: 'center',
  },
  txtbtn: {
    color: 'white',
  },
});
