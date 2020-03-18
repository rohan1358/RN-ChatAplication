import React, {Component, Children} from 'react';
import {Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import User from '../../User';
import {Left, Body, List, ListItem, Thumbnail} from 'native-base';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      dbRef: firebase.database().ref('users'),
    };
  }

  // state = {
  //   users: [],
  //   dbref: firebase.database().ref('users'),
  // };
  componentDidMount() {
    this.state.dbRef.on('child_added', val => {
      let person = val.val();
      person.Pin = val.key;
      if (person.Pin === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  randerRow = ({item}) => {
    return (
      <List key={item.id}>
        <ListItem avatar>
          <Body>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Chat', item)}>
              <Text>{item.username}</Text>
            </TouchableOpacity>
          </Body>
        </ListItem>
      </List>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.05,
            backgroundColor: 'lightblue',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{right: 115}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Add')}>
              <Text>Add Friends</Text>
            </TouchableOpacity>
          </View>
          <View style={{left: 110}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.users}
            renderItem={this.randerRow}
            keyExtractor={item => item.phone}
          />
        </View>
      </View>
    );
  }
}
const styles = {
  item: {
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  },
};
