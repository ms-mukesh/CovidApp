import React, {Component} from 'react';
import {
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    ActivityIndicator,
    Dimensions,
    Image,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
import Tabs from '../Navigator/tabForNews'
import AppHeader from '../Component/appHeader'

export default class NewsPage extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <AppHeader title={'News'} onPress={()=>this.props.navigation.openDrawer()}/>
                <Tabs/>
            </View>
        )
    }

}
