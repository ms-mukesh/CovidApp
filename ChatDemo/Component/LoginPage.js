import React, {useState, Component, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
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
    TouchableHighlight
} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import axios from 'axios';
import {connect} from 'react-redux'
import {getLogin} from '../Actions/getLoginAction';
function LoginFunction(props) {
     const  checkLogin=()=>{
        props.getLogin(userdat)
        if(props.status==1)
        {
            props.navigation.replace('homePage')
        }
        else
        {
            alert("Plz enter correct details")
        }

    }

    const [userdat,setUserData]=useState({phoneno:'',password:''})
    return(
        <View style={{flex:1}}>

            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Icon name='login' size={80}/>
                <Text style={{marginTop:10,fontSize:20,fontWeight:'bold'}}>Get Login</Text>
            </View>

            <View style={{flex:2,}}>
                <TextInput style={style.textInput} onChangeText={(text)=>setUserData({...userdat,phoneno: text})} placeholder='Enter a phone no'></TextInput>
                <TextInput style={style.textInput} onChangeText={(text)=>setUserData({...userdat,password: text})} placeholder='Password'></TextInput>
                <TouchableOpacity style={style.btnLayout} onPress={()=>checkLogin()}><Text style={{fontSize:20,fontWeight:'bold'}}>Log-in</Text></TouchableOpacity>
                <TouchableOpacity style={style.btnLayout} onPress={()=>props.navigation.navigate('RegisterPage')}><Text style={{fontSize:20,fontWeight:'bold'}}>Register</Text></TouchableOpacity>
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
        width:  w - 50,
        height: 50,
        alignSelf: 'center',
        backgroundColor: 'orange',
        borderRadius: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

function mapSatateToProps(state) {
    return {
      username:state.getLoginReducer.username,
        status:state.getLoginReducer.status
    }
}
function mapDispatchToProps(dispatch) {
    debugger;
    return {
        getLogin:(data)=>getLogin(data)
    }
}
export default connect(mapSatateToProps,mapDispatchToProps())(LoginFunction)

