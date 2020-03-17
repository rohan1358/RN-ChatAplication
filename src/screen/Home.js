import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Right} from 'native-base';
import firebase from '../firebase/firebase'
export default class Home extends Component {
  LogoutHandle() {
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styless.header}>
          <View style={{position: 'relative'}}>
            <Button>
              <Text>Cancel</Text>
            </Button>
          </View>
          <View style={{backgroundColor: 'white', left: 180}}>
            <Button onPress={() => this.LogoutHandle()}>
              <Text>Logout</Text>
            </Button>
          </View>
        </View>
        <View style={styless.content}>
          <Text>Content</Text>
        </View>
      </View>
    );
  }
}

const styless = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  content: {
    flex: 16,
    backgroundColor: 'blue',
  },
});
