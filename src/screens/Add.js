import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage, Alert} from 'react-native';
import {
  Item,
  Input,
  Form,
  Label,
  Button,
  Thumbnail,
  Text,
  Right,
  Header,
} from 'native-base';
import Bgimage from '../image/screen.jpeg';
import Logo from '../image/chat.png';
import firebase from 'firebase';

import User from '../../User';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import { Header } from 'react-native/Libraries/NewAppScreen';

class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      username: '',
    };
  }
  handleChange = key => val => {
    this.setState({[key]: val});
  };
  componentWillMount() {
    AsyncStorage.getItem('phone').then(val => {
      if (val) {
        this.setState({phone: val});
      }
    });
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
        .set({username: this.state.username});
      this.props.navigation.navigate('Home');
    }
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.logoStyle}>
          <Thumbnail square large source={Logo} />
          <Text styles={styles.textLogoStyle}>Add Friends</Text>
        </View>
        <Form style={styles.formLoginStyle}>
          <Item floatingLabel>
            <Label>
              <Text style={styles.inputStyle} />
              Pin
              <Text />
            </Label>
            <Input
              style={styles.inputStyle}
              keyboardType="number-pad"
              value={this.setState.phone}
              onChangeText={this.handleChange('phone')}
            />
          </Item>
          <Item floatingLabel>
            <Label>
              <Text style={styles.inputStyle} />
              name
              <Text />
            </Label>
            <Input
              style={styles.inputStyle}
              value={username => this.setState(username)}
              onChangeText={this.handleChange('username')}
            />
          </Item>
        </Form>
        <Button
          block
          style={styles.footerBottomStyle}
          onPress={this.submitForm}>
          <Text>Enter</Text>
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  BgimageStyle: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoStyle: {
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  textLogoStyle: {
    fontSize: 18,
    color: 'white',
  },
  formLoginStyle: {
    marginTop: -80,
    paddingLeft: 10,
    paddingRight: 30,
  },
  inputStyle: {
    marginBottom: 6,
    fontSize: 14,
  },
  footerBottomStyle: {
    marginTop: 30,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#4db5db',
  },
  header: {
    height: 40,
  },
  right: {
    marginTop: 20,
  },
});

export default Login;
