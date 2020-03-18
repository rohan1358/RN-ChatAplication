import React from 'react';
import {Text, View} from 'react-native';

export default function Chat() {
  return (
    <View>
      <Text> {this.props.navigation.getParam('key')} </Text>
    </View>
  );
}
