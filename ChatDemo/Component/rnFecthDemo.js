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
    TouchableHighlight,


} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import axios from 'axios';
import {connect} from 'react-redux'
import {getLogin} from '../Actions/getLoginAction';

import getLoginReducer from '../Reducer/loginReducer';

import RNFetchBlob from 'rn-fetch-blob'






function rnFethcDemo(props) {


    const [userdat,setUserData]=useState({phoneno:'',password:''})

    const [imgPath,setImgPath]=useState('');
    const [animator,setAnimator]=useState(false);
    let dirs = RNFetchBlob.fs.dirs

    const getDownLoad=()=>{
        setAnimator(true)
        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache : true,
                // path : dirs.DocumentDir + '/path-to-file.anything'
                // appendExt : 'png'
            })
            .fetch('GET', 'https://firebasestorage.googleapis.com/v0/b/collageappdemo.appspot.com/o/User_profile%2Fimg1580980542056?alt=media&token=03d02880-e6e6-4a1e-93bf-ee904dd5e26a', {
                //some headers ..
            })
            .then((res) => {
                // the temp file path

                setImgPath(res.path());
                setAnimator(false)

                console.log(res.path);
                console.log(imgPath)

                console.log('The file saved to ', res.path())
            })
    }
    return(
        <View style={{flex:1}}>



            <View style={{flex:2,}}>
                <TouchableOpacity style={style.btnLayout} onPress={()=>getDownLoad()}><Text style={{fontSize:20,fontWeight:'bold'}}>Download</Text></TouchableOpacity>

                <View style={{height:300,width:300,borderRadius:150,backgroundColor:'skyblue',alignItems:'center',alignSelf:'center',justifyContent:'center',margin:50}}>
                    <Image style={{height:280,width:280,borderRadius:140,backgroundColor:'skyblue'}} source={{ uri : Platform.OS === 'android' ? 'file://' + imgPath : '' + imgPath }}/>
                </View>

                <ActivityIndicator
                    animating = {animator}
                    color = 'gray'
                    size = "large"

                />

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

debugger
function mapDispatchToProps(dispatch) {
    debugger;
    return {
        getLogin:(data)=>getLogin(data)
    }
}
export default connect(mapSatateToProps,mapDispatchToProps())(rnFethcDemo)

