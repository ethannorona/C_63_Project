import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import HomeScreen from './screens/HomeScreen'
import { createAppContainer, createSwitchNavigator } from 'react-native-navigation';

export default class App extends React.Component {

  render() {
    return (
      <View>
        <HomeScreen />
      </View>
    );
  }
}
