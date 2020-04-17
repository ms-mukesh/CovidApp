import React, {Component, useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Slider,
  ScrollView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import ChatDemo from './ChatDemo/Navigator/navigaton';
import ChatStore from './ChatDemo/Store/indexStore';
import {color} from './ChatDemo/Helper/themeHelper';

export default class App extends Component {
  componentDidMount(): void {
    SplashScreen.hide();
  }
  render() {
    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: color.purple}} />
        <SafeAreaView style={{flex: 1}}>
          <Provider store={ChatStore}>
            <ChatDemo />
          </Provider>
        </SafeAreaView>
      </>
    );
  }
}
