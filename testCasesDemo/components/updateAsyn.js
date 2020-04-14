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
    state={
        txtVal:this.props.username
    }
    updateValue=()=>{
        this.props.updateUserName(this.state.txtVal)
        this.props.navigation.pop();

    }
    render() {
        return (
            <View style={{flex:1,flexDirection:'',justifyContent:''}}>
                <TextInput onChangeText={(text)=>{this.setState({txtVal:text})}}  style={{height:50,width:w-30,padding:20,backgroundColor:'pink',borderRadius:50,fontSize:25}}>{this.props.username}</TextInput>
                <TouchableOpacity onPress={()=>this.updateValue()} style={{height:50,width:w-30,backgroundColor:'lightblue',borderRadius:50,alignItems:'center',justifyContent:'center'}}><Text>Update</Text></TouchableOpacity>
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





