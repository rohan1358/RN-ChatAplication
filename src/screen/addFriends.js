import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Container, Header, Content, Form, Item, Input} from 'native-base';
// import firebase from 'firebase';
export default class addFriends extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      pin: '',
    };
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="name" />
            </Item>
            <Item last>
              <Input keyboardType="number-pad" placeholder="pin" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
