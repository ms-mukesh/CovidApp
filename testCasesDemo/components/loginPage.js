import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux'
import {updateUserName} from '../action/addToDoAction';

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
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            password:'',
            textValue:'',
            userName:''
        }
    }
    async componentDidMount(): void {
        try
        {
            this.setState({userName:await AsyncStorage.getItem('userNameKey4')})
            if(this.state.userName==null)
            {

            }
            else
            {
                this.props.updateUserName(this.state.userName)
                this.props.navigation.navigate('counterDemo')
            }
        }catch (e) {
        }
    }
    _checkLogin=()=>{
        let setting=JSON.stringify({
            email: this.state.username,
            pwd: this.state.password
        });
        console.log(setting)
        fetch('http://192.168.200.146:9001/getLoginForUserData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: setting,
        })
            .then((response)=>response.json())
            .then((responseJson)=>{

                if(responseJson==1)
                {
                    this.props.navigation.replace('homePage',{userName:this.state.username})
                    // this.props.navigation.pop()
                }
                else
                {
                    console.log(responseJson)
                    alert("invalid password or username")

                }
                this.textInput.clear()
            });

    }
    checkLogin=()=>{
        if(this.state.textValue=='mukesh')
        {
            AsyncStorage.setItem('userNameKey4',this.state.textValue)
            this.props.updateUserName(this.state.textValue);
            this.props.navigation.replace('counterDemo')

        }
        else
        {
            alert('invaldi details')
        }

    }
    render() {

        return (
            <View style={{flex:1,backgroundColor:'lightblue'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TextInput ref={input => { this.textInput = input }} autoCapitalize='none' onChangeText={(text)=>this.setState({textValue:text})} style={style.textInput} placeholder='userName'/>
                    <TextInput ref={input => { this.textInput = input }} secureTextEntry='true' autoCapitalize='none' onChangeText={(text)=>this.setState({password:text})} style={style.textInput} placeholder='password'/>
                    <TouchableOpacity onPress={()=>this.checkLogin()} style={style.btnLayout}><Text style={{fontSize:20}}>Login</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
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
    btnLayout: {
        width: w - 50,
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
        username: state.AddTodo.username,
    }
}
debugger
function mapDispatchToProps(dispatch) {
    return {
        updateUserName:(data)=>updateUserName(data),
    }
}
export default connect(mapSatateToProps,mapDispatchToProps())(LoginPage)
