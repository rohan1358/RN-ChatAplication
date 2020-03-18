import React, {Component, Children} from 'react';
import {Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class Home extends Component {
  state = {
    users: [],
    dbref: firebase.database.ref('users'),
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
            onPress={() => this.props.navigation.navigate('Chat')}
            data={[
              {key: 'Devin'},
              {key: 'Dan'},
              {key: 'Dominic'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chat', item)}>
                <Text style={styles.item}>{item.key}</Text>
              </TouchableOpacity>
            )}
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
