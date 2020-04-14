import React, {useState, Component, useEffect} from 'react';
import Contacts from 'react-native-contacts';
import io from 'react-native-socket.io-client';
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
import axios from 'axios';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {getLogin,setChatUserDetail} from '../Actions/getLoginAction';
import {connect} from 'react-redux';

let tempmycontactList=[];
let tempnewtContactList=[];
let tempcommonList=[];


function HookCounter2(props) {
    const [myConatcatlist,setmyConatct]=useState([]);
    const [networkConatctList,setNetConatct]=useState([]);
    const [commonConatct,setCommonConatct]=useState([]);

    const getCommonConatct=()=>{
        setmyConatct([]);
        setNetConatct([]);
        setCommonConatct([]);
        const  socket="";
        let i=0,j=0,k=0;
        axios
            .post("https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/chatApp/api/getAllData")
            .then(res => {
                for(i=0;i<res.data.length;i++)
                {
                    tempnewtContactList.push({"phoneno":res.data[i].phoneno,"name":res.data[i].name})
                }
                setNetConatct(tempnewtContactList)
                Contacts.getAll((err, contacts) => {
                    if (err) {
                        throw err;
                    }
                    {
                        for(i=0;i<contacts.length;i++)
                        {
                            tempmycontactList.push({"phoneno":contacts[i].phoneNumbers[0].number,"name":contacts[i].givenName})

                        }
                        setmyConatct(tempmycontactList)

                    }

                    if(tempmycontactList.length>tempnewtContactList.length)
                    {
                        for(i=0;i<tempmycontactList.length;i++)
                        {

                            for(j=0;j<tempnewtContactList.length;j++)
                            {
                                if(tempmycontactList[i].phoneno.replace(/[^a-zA-Z0-9]/g, "")==tempnewtContactList[j].phoneno)
                                {
                                     tempcommonList.push(tempmycontactList[i])
                                    break;
                                }
                            }
                        }
                    }
                    else
                    {
                        for(i=0;i<tempnewtContactList.length;i++)
                        {
                            for(j=0;j<tempmycontactList.length;j++)
                            {
                                if(tempnewtContactList[i].phoneno==tempmycontactList[i].phoneno.replace(/[^a-zA-Z0-9]/g, ""))
                                {
                                    tempcommonList.push(tempnewtContactList[i])
                                    break;
                                }
                            }
                        }
                    }
                    setCommonConatct(tempcommonList)
                })
            })
            .catch(err => {
                console.log(err);
                // return err;
            });

    }


    useEffect(()=>{
      getCommonConatct()


    },[])
     const getLogin=()=>{
        getCommonConatct()

    }

    const setReceiver=(data)=>{
        // props.getSetReciverDetail(data);

        let reciverData={username:data.name,phoneno:data.phoneno.replace(/[^a-zA-Z0-9]/g, "")}
        props.getSetReciverDetail(reciverData)


        //
        // AsyncStorage.setItem('receiverName',data.name)
        // AsyncStorage.setItem('recieverPhoneNo',data.phoneno.replace(/[^a-zA-Z0-9]/g, ""))


        // console.log(JSON.stringify(AsyncStorage.getItem('receiverName')));
        props.navigation.navigate('ChatPage1')
    }
    const _RenderMain = (item, index) => {
        return (
            <View  style={{height:70,width:null,flexDirection:'row',borderBottomColor:'grey',borderBottomWidth:.3,padding:10}}>
                <View style={{flex:1,alignContent:'center',justifyContent:'center',padding:10}}>
                    <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/collageappdemo.appspot.com/o/User_profile%2Fimg1580980542056?alt=media&token=03d02880-e6e6-4a1e-93bf-ee904dd5e26a'}} style={{height:60,width:60,borderRadius:30}}></Image>
                </View>
                <View style={{flex:3,justifyContent:'center'}}>
                    {/*<TouchableOpacity onPress={()=>props.navigation.navigate('ChatPage',{username:item.name})} style={{flex:1,height:null,width:null,justifyContent:'center'}}>*/}
                    <TouchableOpacity onPress={()=>setReceiver(item)} style={{flex:1,height:null,width:null,justifyContent:'center'}}>
                        <Text style={{fontSize:17}}>{item.name}</Text>
                        {/*<Text style={{fontSize:17}}>{item.phoneno.replace(/[^a-zA-Z0-9]/g, "")}</Text>*/}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return(

        <View style={{flex:1}}>
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                     <TouchableOpacity onPress={()=>{this.scroll.scrollTo({x:0})}} style={style.hederBtnLayout}><Text>Calls</Text></TouchableOpacity>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{this.scroll.scrollTo({x:w})}} style={style.hederBtnLayout}><Text>Chats</Text></TouchableOpacity>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{this.scroll.scrollTo({x:w*2})}} style={style.hederBtnLayout}><Text>Status</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{flex:9,}}>
                <ScrollView ref={(node)=>this.scroll=node} scrollEventThrottle={16}  pagingEnabled={true} horizontal={true}>
                    <View style={{flex:1,backgroundColor:'pink',width:w,height:null}}>
                    </View>
                    <View style={{flex:1,width:w,height:null}}>
                        <FlatList
                            horizontal={false}
                            data={commonConatct}
                            showsHorizontalScrollIndicator={false}
                            extraData={({item, index}) =>
                               _RenderMain(item,index)
                            }
                            renderItem={({item, index}) =>
                                _RenderMain(item, index)
                            }
                        />

                    </View>
                    <View style={{flex:1,backgroundColor:'green',width:w,height:null}}>

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

function mapSatateToProps(state) {
    return {
        username:state.getLoginReducer.username,
        phoneno:state.getLoginReducer.phoneno,

    }
}
debugger
function mapDispatchToProps(dispatch) {
    debugger;
    return {
        getSetReciverDetail:(data)=>setChatUserDetail(data)
    }
}
export default connect(mapSatateToProps,mapDispatchToProps())(HookCounter2)
