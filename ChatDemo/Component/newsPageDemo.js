/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, Component, useEffect} from 'react';
import Contacts from 'react-native-contacts';
import io from 'react-native-socket.io-client';
import AppHeader from '../Component/appHeader';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
  FlatList,
  Modal,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  DatePickerIOS,
  Image,
  InputAccessoryView,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
let h = Dimensions.get('window').height;
let w = Dimensions.get('window').width;
import {
  screenWidth,
  screenHeight,
  normalize,
  color,
} from '../Helper/themeHelper';
import axios from 'axios';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {getLogin, setChatUserDetail} from '../Actions/getLoginAction';
import {connect} from 'react-redux';

import IndiaNewsPage from '../Component/indiaNews3';
import GlobalNewsPage from '../Component/worldNews2';
import NetInfo from '@react-native-community/netinfo';
let unsubscribe = null;
function NewsPage(props) {
  const [bgFlag, setBgFlag] = useState(0);
  const [internetFlag, setInternetFlag] = useState(true);

  const btn1 = () => {
    this.scroll.scrollTo({x: 0});
    setBgFlag(0);
  };
  const btn2 = () => {
    this.scroll.scrollTo({x: w});
    setBgFlag(1);
  };
  const checkConnectivity = () => {
    unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setInternetFlag(true);
      } else {
        setInternetFlag(false);
      }
    });

    // Unsubscribe
  };
  useEffect(() => {
    checkConnectivity();
    return unsubscribe();
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppHeader title={'NEWS'} onPress={() => props.navigation.openDrawer()} />
      {!internetFlag && (
        <Modal visible={true} animated={false} transparent={false}>
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {console.log('inside')}
            <Image
              source={require('../Images/assets/noInternet.png')}
              resizeMode={'contain'}
              style={{width: w * 0.2, height: w * 0.2}}
            />
            <Text style={{fontSize: normalize(16), fontWeight: '600'}}>
              Opps! Your internet connection appears offline.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: w * 0.15,
                width: w * 0.4,
                borderRadius: w * 0.02,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}
              onPress={() => checkConnectivity()}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: normalize(16),
                  color: 'white',
                }}>
                Try Again
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      )}

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.purple,
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              height: screenHeight * 0.04,
              width: screenWidth * 0.35,
              borderRadius: screenHeight * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: bgFlag == 0 ? 'red' : 'white',
            }}
            onPress={() => btn1()}>
            <Text
              style={{
                color: bgFlag == 0 ? 'white' : 'black',
                fontWeight: 'bold',
                fontSize: normalize(14),
              }}>
              INDIA NEWS
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.purple,
          }}>
          <TouchableOpacity
            onPress={() => btn2()}
            style={{
              marginLeft: 10,
              alignSelf: 'flex-start',
              height: screenHeight * 0.04,
              width: screenWidth * 0.35,
              borderRadius: screenHeight * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: bgFlag == 1 ? 'red' : 'white',
            }}>
            <Text
              style={{
                color: bgFlag == 1 ? 'white' : 'black',
                fontWeight: 'bold',
                fontSize: normalize(14),
              }}>
              GLOBLE NEWS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 9}}>
        <ScrollView
          ref={node => (this.scroll = node)}
          scrollEventThrottle={16}
          pagingEnabled={true}
          horizontal={true}
          onMomentumScrollEnd={event => {
            console.log(event.nativeEvent.contentOffset.x);
            if (event.nativeEvent.contentOffset.x === 0) {
              setBgFlag(0);
            } else {
              setBgFlag(1);
            }
          }}
          nestedScrollEnabled={true}>
          <View style={{flex: 1, width: w, height: null}}>
            <IndiaNewsPage />
          </View>
          <View style={{flex: 1, width: w, height: null}}>
            <GlobalNewsPage />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  textInput: {
    width: w - 50,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'lavender',
    borderRadius: 50,
    marginTop: 20,
    fontSize: 20,
    padding: 10,
  },
  hederBtnLayout: {
    flex: 1,
    height: null,
    width: null,
  },
  btnLayout: {
    width: 100,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'lavender',
    borderRadius: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsPage;
