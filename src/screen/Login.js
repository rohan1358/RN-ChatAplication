import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
} from 'native-base';
import firebase from '../firebase/firebase';
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }
  Login(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.props.navigation.navigate('Home'))
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <Container>
        <Content>
          <Label style={{fontSize: 30, textAlign: 'center', marginTop: 20}}>
            Welcome Back
          </Label>
          <Form style={{marginTop: 20}}>
            <Item>
              <Input
                onChangeText={username => this.setState({username})}
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
            style={{borderRadius: 50, marginTop: 30, textAlign: 'center'}}
            onPress={() => this.Login()}>
            <Text style={{textAlign: 'center'}}>Primary</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
