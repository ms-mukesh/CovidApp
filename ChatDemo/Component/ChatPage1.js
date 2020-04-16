import React, {useState, Component, useEffect} from 'react';
import Contacts from 'react-native-contacts';
import Icon from 'react-native-vector-icons/Feather';
import fire from '../config/firebaseConfig';
import * as firebase from 'firebase';
import 'firebase/firestore';

import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    SectionList,
    FlatList,
    Modal, StatusBar,
    ImageBackground,
    ActivityIndicator,
    Dimensions,
    DatePickerIOS, Image, InputAccessoryView,
    TouchableHighlight, AsyncStorage,
} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import axios from 'axios';
import {getLogin} from '../Actions/getLoginAction';
import {connect} from 'react-redux';
import io from 'react-native-socket.io-client';
let ChatMessages=[];
let appLoad=0;

const  socket="";

class ChatPage extends React.Component
{


    constructor(props) {
        super(props);


        this.state={
            chatMsg:[],
            wholeChat:[],
            receiveMessage:[],
            sendMessages:[],
            receiveFla:false,
            sendFalg:false,
            userMsg:[],
            loadFlag:[]

        }
    }
   componentDidMount(): void {
      this.getSendedMessage().then(()=>{
           this.getRecivedMessage().then(()=>{
               this.getFirebaseData()
               this.getChat2();
               // this.getFirebaseData();
           })
       })
   }


    getSendedMessage=()=>{
        let data={
            senderNo:this.props.senderNo,
            reciverNo:this.props.receiverNo
        }
        return new Promise((resolve=>{
            axios.post("https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/chatApp/api/DemoGetChatData",data)
                .then((res)=>{
                    this.setState({sendMessages:res.data,chatMsg:res.data})
                    return resolve(res);
                });
        }))
    }

     getRecivedMessage=()=>{
        let data={
            senderNo:this.props.receiverNo,
            reciverNo:this.props.senderNo
        }
        return new Promise((resolve=>{
            axios.post("https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/chatApp/api/DemoGetChatData",data)
                .then((res)=>{
                    this.setState({receiveMessage:res.data,chatMsg:res.data})
                    return resolve(res);
                });
        }))
    }
     getChat2=()=>{
        ChatMessages=[];
            this.state.sendMessages.map((item) => ChatMessages.push({
                "message": item.message,
                "dateTime": item.datetime._seconds,
                "status": "sent"
            }));
            this.state.receiveMessage.map((item) => ChatMessages.push({
                "message": item.message,
                "dateTime": item.datetime._seconds,
                "status": "recieve"
            }));
            let tempChat = [];
            let len = ChatMessages.length;
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - i - 1; j++) {
                    if (ChatMessages[j].dateTime > ChatMessages[j + 1].dateTime) {
                        tempChat = ChatMessages[j];
                        ChatMessages[j] = ChatMessages[j + 1];
                        ChatMessages[j + 1] = tempChat;
                    }
                }
            }
            this.setState({sendFalg:true})
            this.setState({wholeChat:ChatMessages});

          }


    // const getChat2=()=>{
    //     ChatMessages=[];
    //     // setChatMSg(sendMessages);
    //     // console.log(chatMsg.length)
    //
    //    // console.log(sendMessages)
    //    //  console.log(receiveMessage);
    //
    //     return new Promise((resolve=>{
    //         // console.log("from promis"+receiveMessage.length)
    //
    //         sendMessages.map((item) => ChatMessages.push({
    //             "message": item.message,
    //             "dateTime": item.datetime._seconds,
    //             "status": "sent"
    //         }));
    //
    //
    //         receiveMessage.map((item) => ChatMessages.push({
    //             "message": item.message,
    //             "dateTime": item.datetime._seconds,
    //             "status": "recieve"
    //         }));
    //
    //         let tempChat = [];
    //         let len = ChatMessages.length;
    //         for (let i = 0; i < len - 1; i++) {
    //             for (let j = 0; j < len - i - 1; j++) {
    //                 if (ChatMessages[j].dateTime > ChatMessages[j + 1].dateTime) {
    //                     tempChat = ChatMessages[j];
    //                     ChatMessages[j] = ChatMessages[j + 1];
    //                     ChatMessages[j + 1] = tempChat;
    //                 }
    //             }
    //         }
    //         // setWholeChat([...ChatMessages,{"data":ChatMessages}])
    //         // console.log(wholeChat.length+"from g promise")
    //         // console.log("Total dmsg"+ChatMessages.length)
    //         setWholeChat(ChatMessages);
    //       //  console.log(wholeChat.length)
    //         return(resolve(wholeChat))
    //
    //
    //     }))
    //   }


    sendMsg=()=>{
        var date = new Date();

        let data={
            senderNo:this.props.senderNo,
            reciverNo:this.props.receiverNo,
            message:this.state.userMsg,
            dateTime:date,
            readStatus:"0"
        }
        axios.post("https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/chatApp/api/insChat",data)
                .then((res)=>{
                    // console.log(res);
                    this.textInput.clear();
                    // this.setState({wholeChat:[...this.state.wholeChat,{"message":this.state.userMsg,"dateTime":date,status:"sent"}]})
                    return res
                }).catch((err)=>{
                    console.log(err)
        });
    }

    getFirebaseData= () => {
        debugger
        if(this.state.sendMessages.length===0 && this.state.receiveMessage.length===0 && this.state.wholeChat.length===0)
        {
            console.log("first time")

        }
        else
        {
            const db=fire.firestore();
            let qry=db.collection("UserChat");
            qry=qry.where("senderNo","==",this.props.senderNo)
            qry=qry.where("reciverNo","==",this.props.receiverNo)
            qry=qry.orderBy("dateTime","desc");
            qry=qry.limit(1)
            qry.onSnapshot((doc)=>{
                doc.forEach((d)=>{
                   this.setState({wholeChat:[...this.state.wholeChat,{"message":d.data().message,status:"sent"}]})
                })

            });
            let qry1=db.collection("UserChat");
            qry1=qry1.where("senderNo","==",this.props.receiverNo)
            qry1=qry1.where("reciverNo","==",this.props.senderNo)
            qry1=qry1.orderBy("dateTime","desc");
            qry1=qry1.limit(1)


            qry1.onSnapshot((doc)=>{
                doc.forEach((d)=>{
                    this.setState({wholeChat:[...this.state.wholeChat,{"message":d.data().message,status:"recieve"}]})
                })
            });
        }
    }
    renderChatLayout=()=>{
        return(
            <View style={{flex:1}}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1,alignContent:'center',justifyContent:'center',padding:10}}>
                        <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/collageappdemo.appspot.com/o/User_profile%2Fimg1580980542056?alt=media&token=03d02880-e6e6-4a1e-93bf-ee904dd5e26a'}} style={{height:60,width:60,borderRadius:30}}></Image>
                    </View>
                    <View style={{flex:4,}}>
                        <TouchableOpacity onPress={()=>alert(this.props.phoneno)} style={{flex:1,height:null,width:null}}>
                            <Text style={{fontSize:17,marginTop:10}}>{this.props.reciverName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex:9.2}}>
                    <ScrollView style={{flex:1,padding:10}}>
                    {
                        this.state.wholeChat.map(chatMessages=><Text  style={{fontSize:20,padding:10,alignSelf:chatMessages.status==='sent'?'flex-end':'flex-start'}} >{chatMessages.message}</Text>)
                    }
                    </ScrollView>

                </View>

                <View style={{flex:.8,flexDirection:'row'}}>
                    <View style={{flex:9,justifyContent:'center'}}>
                        <TextInput ref={input => { this.textInput = input }} onChangeText={(text)=>this.setState({userMsg:text})} style={style.textInput}/>
                    </View>

                        <View style={{flex:1,justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.sendMsg()} style={{height:40,width:40,backgroundColor:'orange',borderRadius:20,alignItems:'center',justifyContent:'center'}}><Icon size={20} name='send'/></TouchableOpacity>
                        </View>

                </View>
            </View>
        )
    }


    render(){
        return(
            <View style={{flex:1,}}>
                { this.state.sendFalg &&this.renderChatLayout()}
            </View>
        )
    }

}
const style=StyleSheet.create({
    textInput: {
        width: w-50,
        height: null,
        backgroundColor: 'lavender',
        borderRadius: 50,
        fontSize: 20,
        padding: 10,
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
        reciverName:state.getLoginReducer.receiverName,
        receiverNo:state.getLoginReducer.recieverPhoneNo,
        senderName:state.getLoginReducer.username,
        senderNo:state.getLoginReducer.phoneno
    }
}

debugger
function mapDispatchToProps(dispatch) {
    debugger;
    return {
        getLogin:(data)=>getLogin(data)
    }
}

export default connect(mapSatateToProps,mapDispatchToProps())(ChatPage)

