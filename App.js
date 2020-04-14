import React, {Component,useEffect} from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, Text, View, PanResponder, Slider, ScrollView} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import ChatDemo from './ChatDemo/Navigator/navigaton'
import ChatStore from './ChatDemo/Store/indexStore';

export default class App extends Component{
    componentDidMount(): void {
        SplashScreen.hide();

    }
    render() {
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#002f7f'}}>
        <Provider store={ChatStore}>
            <ChatDemo/>
                </Provider>
        </SafeAreaView>
    )
  }
}

