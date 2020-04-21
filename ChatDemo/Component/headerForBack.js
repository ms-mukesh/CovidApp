import React, {useState, Component, useEffect} from 'react';
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
} from 'react-native';
import {normalize, color} from '../Helper/themeHelper';
let h = Dimensions.get('window').height;
let w = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/AntDesign';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, onPress} = this.props;
    return (
      <SafeAreaView
        style={{backgroundColor: color.purple}}
        forceInset={{top: 'always', bottom: 'never'}}>
        <View style={{height: h * 0.1, flexDirection: 'row', width: w}}>
          <View
            style={{
              height: h * 0.1,
              width: w * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={onPress}>
              <Icon name={'arrowleft'} size={h * 0.05} color={'white'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: h * 0.1,
              width: w * 0.9,
              // alignItems: 'center',

              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: normalize(20),
                fontWeight: 'bold',
                marginLeft: w * 0.04,
              }}>
              {title}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
