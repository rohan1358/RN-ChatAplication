import React, {Component} from 'react';
import {
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Tab,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Tabs,
  List,
  ListItem,
  Thumbnail,
  Fab,
} from 'native-base';
import Logo from '../image/chat.png';
import Maps from './Maps';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from '../../User';

export default class Screen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    data: {},
    users: [],
    dbRef: firebase.database().ref('users'),
  };

  componentDidMount() {
    AsyncStorage.getItem('dataUser', (err, result) => {
      console.log('result', result);
      console.log(err);
      if (result) {
        this.setState({data: JSON.parse(result)});
      }
    });

    this.state.dbRef.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.username = person.username;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }
  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  randerRow = ({item}) => {
    const {data} = this.state;
    console.warn(item);
    if (item.username !== data.username) {
      return (
        <List key={item.id}>
          <ListItem avatar>
            <Left>
              <TouchableOpacity>
                <Thumbnail
                  source={require('../../assests/avatar-default-icon.png')}
                />
              </TouchableOpacity>
            </Left>
            <Body>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chat', item)}>
                <Text>{item.username}</Text>
              </TouchableOpacity>
            </Body>
          </ListItem>
        </List>
      );
    }
  };

  render() {
    return (
      <Container>
        <Header hasTabs style={{backgroundColor: '#4682b4'}}>
          <Left>
            <Button transparent>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Add')}>
                <Image source={Logo} style={{width: 25, height: 25}} />
              </TouchableOpacity>
            </Button>
          </Left>
          <Body>
            <Title>Let's Chat</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Image
                source={require('../../assests/person.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </Right>
        </Header>
        <Tabs>
          <Tab heading="Chats">
            <Container>
              <Content>
                <FlatList
                  data={this.state.users}
                  renderItem={this.randerRow}
                  keyExtractor={item => item.phone}
                />
              </Content>
            </Container>
          </Tab>
          <Tab heading="Maps">
            <Maps />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
