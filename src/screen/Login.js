import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
} from 'native-base';
import firebase from 'firebase';

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
    try {
      this.setState({error: '', loading: true});
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({error: '', loading: false});
          this.props.navigation.navigate('MyTabs');
          console.log('masuk');
        });
    } catch {
      console.log('email & password false');
    }
  }

  SIgnUp(email, password) {
    try {
      if (this.state.email.length < 2) {
        alert('email kurangl');
        return;
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Container>
        <Content>
          <Label style={{fontSize: 30, textAlign: 'center', marginTop: 20}}>
            Welcome Back
          </Label>
          <Form style={{marginTop: 20, marginBottom: 20}}>
            <Item>
              <Input
                onChangeText={email => this.setState({email})}
                placeholder="Username"
                autoCapitalize="none"
              />
            </Item>
            <Item last>
              <Input
                onChangeText={password => this.setState({password})}
                placeholder="Password"
              />
            </Item>
          </Form>
          <Button
            style={styles.btn}
            onPress={() => this.Login(this.state.email, this.state.password)}>
            <Text style={styles.txtbtn}>Login</Text>
          </Button>
          <Button
            style={styles.btn}
            onPress={() => this.SIgnUp(this.state.email, this.state.password)}>
            <Text style={styles.txtbtn}>Register</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
  },
  txtbtn: {
    color: 'white',
  },
});
