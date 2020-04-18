import React, {useState, Component, useEffect} from 'react';
import Contacts from 'react-native-contacts';
import io from 'react-native-socket.io-client';
import AppHeader from '../Component/appHeader'
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
    Modal,StatusBar,
    ImageBackground,
    ActivityIndicator,
    Dimensions,
    DatePickerIOS,Image,InputAccessoryView,
    TouchableHighlight,AsyncStorage
} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import {screenWidth,screenHeight,normalize,color} from '../Helper/themeHelper'
import axios from 'axios';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {getLogin,setChatUserDetail} from '../Actions/getLoginAction';
import {connect} from 'react-redux';

import IndiaNewsPage from '../Component/indiaNews3'
import GlobalNewsPage from '../Component/worldNews2'


function NewsPage(props) {
    const [bgFlag,setBgFlag]=useState(0);

    const btn1=()=>{
        this.scroll.scrollTo({x:0})
        setBgFlag(0)
    }
    const btn2=()=>{
        this.scroll.scrollTo({x:w})
        setBgFlag(1)
    }
    return(
        <View style={{flex:1}}>
            <AppHeader
                title={'NEWS'}
                onPress={() => props.navigation.openDrawer()}
            />
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:color.purple}}>
                    <TouchableOpacity style={{alignSelf:'flex-end',height:screenHeight*0.04,width:screenWidth*0.35,borderRadius:screenHeight*0.20,alignItems: 'center',justifyContent: 'center',backgroundColor:bgFlag==0?'red':'white'}} onPress={()=>btn1()}>
                        <Text style={{color:bgFlag==0?'white':'black',fontWeight:'bold',fontSize:normalize(13)}}>INDIA NEWS</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:color.purple}}>
                    <TouchableOpacity onPress={()=>btn2()} style={{marginLeft:10,alignSelf:'flex-start',height:screenHeight*0.04,width:screenWidth*0.35,borderRadius:screenHeight*0.20,alignItems: 'center',justifyContent: 'center',backgroundColor:bgFlag==1?'red':'white'}}>
                        <Text style={{color:bgFlag==1?'white':'black',fontWeight:'bold',fontSize:normalize(13)}}>GLOBLE NEWS</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{flex:9,}}>
                <ScrollView ref={(node)=>this.scroll=node} scrollEventThrottle={16}  pagingEnabled={true} horizontal={true} nestedScrollEnabled={true}>
                    <View style={{flex:1,width:w,height:null}}>
                        <IndiaNewsPage/>
                    </View>
                    <View style={{flex:1,width:w,height:null}}>
                        <GlobalNewsPage/>
                    </View>

                </ScrollView>
            </View>


        </View>
    )
}
const style=StyleSheet.create({
    textInput: {
        width: w - 50,
        height: 50,
        alignSelf: 'center',
        backgroundColor: 'lavender',
        borderRadius: 50,
        marginTop: 20,
        fontSize: 20,
        padding: 10
    },
    hederBtnLayout:{
        flex:1,height:null,width:null
    },
    btnLayout: {
        width: 100,
        height: 50,
        alignSelf: 'center',
        backgroundColor: 'lavender',
        borderRadius: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})


export default NewsPage
