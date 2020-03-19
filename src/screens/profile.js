import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  AsyncStorage,
  TouchableHighlight,
  Modal,
  Alert,
  Button,
} from 'react-native';
import {Thumbnail, Right} from 'native-base';
import firebase from 'firebase';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import User from '../../User';
// import { SafeAreaView } from 'react-navigation';

export default class profile extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    nama: '',
    data: {},
    modalVisible: false,
    description: '',
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    AsyncStorage.getItem('dataUser', (err, result) => {
      console.warn('result', result);
      console.warn('err', err);
      if (result) {
        this.setState({data: JSON.parse(result)});
        // var dataUser = firebase.database().ref('users');
        // console.warn(dataUser);
        // dataUser.once('value', res => {
        //   res.forEach(dataUserLoop => {
        //     if (dataUserLoop.key === result) {
        //       this.setState({nama: dataUserLoop});
        //     }

        //     console.warn(dataUserLoop);
        //     console.warn(result);
        //     console.warn(dataUserLoop.key);

        //     return;
        //   });
        // });
      }
    });
    // dataUser.on('child_added', val => {
    //   console.warn(val);
    // });
    // console.warn(dataUser);
  }

  writeNewPost(description) {
    // A post entry.
    var postData = {
      description: description,
    };

    // Get a key for a new Post.
    var newPostKey = firebase
      .database()
      .ref()
      .child('users')
      .push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/' + this.state.data.pin + '/' + newPostKey] = postData;

    return firebase
      .database()
      .ref()
      .update(updates);
  }
  writeUserData(description) {
    firebase
      .database()
      .ref('users/' + this.state.data.pin)
      .set({
        description: description,
      });
    this.setModalVisible(!this.state.modalVisible);
  }

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
    // console.log('hello');
  };
  render() {
    const {data} = this.state;

    console.warn(data);

    return (
      // <SafeAreaView></SafeAreaView>
      <SafeAreaView>
        <View style={styles.lbl}>
          <Text style={styles.txtlbl}>Profile</Text>
        </View>
        <View style={styles.header}>
          <View style={styles.img}>
            <Thumbnail large source={require('../../assests/person.png')} />
          </View>
        </View>
        <View>
          <View style={styles.name}>
            <View style={styles.tmbname}>
              <Thumbnail small source={require('../../assests/person.png')} />
            </View>
            <View>
              <Text>Name</Text>
              <Text style={styles.txt}>{data.username}</Text>
            </View>
          </View>
          <View style={styles.name}>
            <View style={styles.tmbname}>
              <Thumbnail small source={require('../../assests/about.png')} />
            </View>
            <View>
              <Text>About</Text>
              <Text style={styles.txt}> {data.description} </Text>
            </View>
            <Right>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(true);
                  }}>
                  <Thumbnail
                    square
                    small
                    source={require('../../assests/pen.png')}
                  />
                </TouchableOpacity>
              </View>
            </Right>
          </View>
          <View style={styles.name}>
            <View style={styles.tmbname}>
              <Thumbnail small source={require('../../assests/pin.png')} />
            </View>
            <View>
              <Text>Pin</Text>
              <Text style={styles.txt}>{data.pin}</Text>
            </View>
          </View>
          <View style={styles.btnLogout}>
            <Button onPress={() => this.logout()} title="Logout" />
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <TextInput
                placeholder="text"
                onChangeText={description => this.setState({description})}
              />
              <TouchableHighlight
                onPress={() => this.writeNewPost(this.state.description)}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingBottom: 90,
  },
  img: {},
  name: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginHorizontal: 10,
    marginTop: 40,
  },
  tmbname: {
    marginLeft: 15,
    marginRight: 30,
  },
  txtname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lbl: {
    paddingTop: 10,
    backgroundColor: 'blue',
    alignContent: 'center',
    // alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 20,
  },
  txtlbl: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  btnLogout: {
    marginTop: 50,
    marginHorizontal: 50,
    borderRadius: 6,
  },
  txt: {
    fontSize: 17,
    marginLeft:5,
  },
});
