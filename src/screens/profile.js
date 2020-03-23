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
import ImagePicker from 'react-native-image-picker';
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
    avatarSource: null,
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
  writeUserData = () => {
    const {data} = this.state;
    console.warn('ini', data);
    var postData = {
      username: data.username,
      pin: data.pin,
      password: data.password,
      image: this.state.avatarSource.uri,
    };
    const newPostKey = firebase
      .database()
      .ref('users')
      .child()
      .push().key;
    var updates = {};
    updates['/users/' + newPostKey] = postData;
    updates['/users-posts/' + data.pin + '/' + newPostKey] = postData;
    return firebase
      .database()
      .ref()
      .update(updates);
  };

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
    // console.log('hello');
  };

  image() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
    const {data} = this.state;
    // const pin = JSON.parse(data).phone;
    console.warn('ini :', data.pin);
    firebase
      .database()
      .ref('users/' + data.pin)
      .set({
        username: 'test',
        pin: data.pin,
        password: data.password,
        image: this.state.avatarSource,
      });
  }

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
            <TouchableOpacity onPress={() => this.image()}>
              <Thumbnail large source={this.state.avatarSource} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.name}>
            <View style={styles.tmbname}>
              <TouchableOpacity onPress={() => this.image()}>
                <Thumbnail small source={this.state.avatarSource} />
              </TouchableOpacity>
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
    marginLeft: 5,
  },
});
