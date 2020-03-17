import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import Home from '../screen/Home';
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
}
export default MyTabs;
