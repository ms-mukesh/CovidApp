import React, {useState, Component, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import RegisterIon from '../Images/registerYou.png'
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
import {getLogin,getRegister} from '../Actions/getLoginAction';

function RegisterFunction(props) {
    // useEffect(()=>{
    //     console.log('affetcted')
    // },)

    const  getRegister=()=>{
       props.getRegister(userdat)
        props.navigation.pop();

    }
    const chek=()=>{
        alert("hkhjkh")
    }

    const [userdat,setUserData]=useState({phoneno:'',name:'',password:''})
    return(


        <View style={{flex:1}}>

            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image source={RegisterIon} style={{height:100,width:100}}/>
                <Text style={{marginTop:10,fontSize:20,fontWeight:'bold'}}>Get Register</Text>
            </View>

            <View style={{flex:2,}}>
                <ScrollView style={{flex:1}}>
                    <TextInput onChangeText={(text)=>setUserData({...userdat,phoneno: text})} style={style.textInput} placeholder="phone No"></TextInput>
                    <TextInput onChangeText={(text)=>setUserData({...userdat,name: text})} style={style.textInput} placeholder="User name"></TextInput>
                    <TextInput onChangeText={(text)=>setUserData({...userdat,password: text})} style={style.textInput} placeholder="Password"></TextInput>
                    <TouchableOpacity onPress={()=>getRegister()} style={style.btnLayout} ><Text style={{fontSize:20,fontWeight:'bold'}}>Register</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>chek()} style={style.btnLayout}><Text style={{fontSize:20,fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
                </ScrollView>

            </View>
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{fontSize:20}}>Already sign up? <Text onPress={()=>props.navigation.pop()} style={{textDecorationLine: 'underline',fontWeight:'bold'}}>Login</Text></Text>
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
        // username:state.getLoginReducer.username,
        // status:state.getLoginReducer.status
    }
}

debugger
function mapDispatchToProps(dispatch) {
    debugger;
    return {
        getRegister:(data)=>getRegister(data)
    }
}
export default connect(mapSatateToProps,mapDispatchToProps())(RegisterFunction)

