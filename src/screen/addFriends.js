import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
} from 'react-native';
// import {Container, Header, Content, Form, Item, Input} from 'native-base';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
// import firebase from 'firebase';
import * as firebase from 'firebase';
import User from '../../User';
export default class addFriends extends Component {
  constructor() {
    super();
    this.state = {
      names: '',
      Pin: '',
      // image: '',
    };
  }
  writeUserData = async () => {
    if (this.state.Pin.length < 6) {
      console.log('pin tidak boleh kurang dari 6 digit');
    } else if (this.state.Pin.length > 6) {
      console.log('pin tidak boleh lebih dari 6 gidit');
    } else {
      console.log(this.state.Pin);
      const names = this.state.names;
      const Pin = this.state.Pin;
      await AsyncStorage.setItem('userPhone', this.state.Pin);
      User.phone = this.state.Pin;
      firebase
        .database()
        .ref('users/' + User.phone)
        .set({
          username: names,
          Pin: Pin,
          // profile_picture: imageUrl,
        })
        .then(this.props.navigation.navigate('Home'));
    }
  };
  render() {
    return (
      <ScrollView>
        <View>
          <View style={styless.cncl}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Add Friends</Text>
          </View>
          <View style={{flex: 3}}>
            <View>
              <TextInput
                style={styless.inp}
                placeholder="names"
                onChangeText={names => this.setState({names})}
              />
              <TextInput
                style={styless.inp}
                placeholder="Pin"
                onChangeText={Pin => this.setState({Pin})}
              />
              {/* <TextInput style={styless.inp}></TextInput> */}
            </View>
            <View style={styless.btnAdd}>
              <Button title="Add" onPress={() => this.writeUserData()}></Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styless = StyleSheet.create({
  cncl: {
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  inp: {
    marginTop: 10,
    marginHorizontal: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    height: 30,
    paddingTop: 0,
  },
  btnAdd: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});
