import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import Chats from './src/screens/Chat';
import Screen from './src/screens/Home';
import Login from './src/screens/Login';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import Add from './src/screens/Add';
import Profile from './src/screens/profile';
import Register from './src/screens/Register';

const AppStack = createStackNavigator({
  Home: Screen,
  Chat: Chats,
  Add: Add,
  Profile: Profile,
  Register: Register,
});
const AuthStack = createStackNavigator({Login: Login});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
