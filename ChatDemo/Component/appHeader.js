import React, {useState, Component, useEffect} from 'react';
import {color} from '../Helper/themeHelper';
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
import {normalize} from '../Helper/themeHelper';
let h = Dimensions.get('window').height;
let w = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Entypo';

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
            <TouchableOpacity onPress={onPress} style={{marginLeft: h * 0.001}}>
              <Icon name={'menu'} size={h * 0.055} color={'white'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: h * 0.1,
              width: w * 0.9,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: normalize(22),
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {title}
            </Text>
          </View>
        </View>

        {/*<View style={{height:h*0.05,width:w,justifyContent:'center',flexDirection:'row'}}>*/}
        {/*    <TouchableOpacity>*/}
        {/*        <Icon  name={'menu'} size={30} color={'white'}/>*/}
        {/*    </TouchableOpacity>*/}
        {/*    <Text style={{color:'white',alignSelf:'center',fontSize:normalize(20),fontWeight:'bold'}}>{title}</Text>*/}
        {/*</View>*/}
      </SafeAreaView>
    );
  }
}
