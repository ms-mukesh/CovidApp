import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux'
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
import {updateUserName} from '../action/addToDoAction';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;

class CounterDemo extends Component {
    getLogOut=()=>{
        AsyncStorage.removeItem('userNameKey4')
        this.props.navigation.replace('loginPage');

    }

    render() {
        return (
            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <TouchableOpacity  style={{flex:1}}><Text style={{textAlign:'center'}}>Increase</Text></TouchableOpacity>
                <Text>{this.props.counter}</Text>
                <TouchableOpacity  style={{flex:1}}><Text style={{textAlign:'center'}}>Decrese</Text></TouchableOpacity>
                <Text onPress={()=>this.props.navigation.navigate('updateAsyn')}>{this.props.username}</Text>
                <Text onPress={()=>this.getLogOut()} style={{marginLeft:10}}>Log-out</Text>
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
        username: state.AddTodo.username
    }
}
debugger
function mapDispatchToProps(dispatch) {
    return {
        updateUserName:(data)=>updateUserName(data),
    }
}
export default connect(mapSatateToProps,mapDispatchToProps())(CounterDemo)





