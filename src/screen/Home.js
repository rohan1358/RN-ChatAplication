import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Right, Thumbnail} from 'native-base';
import firebase from '../firebase/firebase';
import {Container, Content, List, ListItem} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class Home extends Component {
  LogoutHandle() {
    this.props.navigation.navigate('Login');
  }
  chatScreen() {
    this.props.navigation.navigate('Chat');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styless.header}>
          <View style={{position: 'relative'}}>
            <TouchableOpacity onPress={this.props.navigation.navigate('Add')}>
              <Thumbnail
                style={{width: 30, height: 30, marginTop: 5, marginLeft: 5}}
                source={require('../../assets/image/addFriends.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: 'white', left: 180}}>
            <Button onPress={() => this.LogoutHandle()}>
              <Text>Logout</Text>
            </Button>
          </View>
        </View>
        <Container style={styless.content}>
          <Content>
            <List>
              <ListItem>
                <TouchableOpacity onPress={() => this.chatScreen()}>
                  <Text>Name</Text>
                </TouchableOpacity>
              </ListItem>
              <ListItem>
                <Text>Nathaniel</Text>
              </ListItem>
              <ListItem>
                <Text>Dejan Lovren</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
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
