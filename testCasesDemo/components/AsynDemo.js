import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import {Appbar} from 'react-native-paper'
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            item:''
        }
    }
     async componentDidMount(): void {
        this.setState({item:await AsyncStorage.getItem('myKey')});

    }

    storeData= async () => {
        try {
            await AsyncStorage.setItem('myKey', 'hello world')
            this.setState({item:await AsyncStorage.getItem('myKey')});
            // const value=await AsyncStorage.getItem('myKey')

        }catch (e) {
            console.log(e)

        }
        console.log(this.state.item)
    }

    deleteData=async ()=>{
        try
        {
            AsyncStorage.removeItem('myKey',async ()=>{
                console.log('item deleted');
                this.setState({item:await AsyncStorage.getItem('myKey')});
            })
        }
        catch (e) {
            console.log(e)

        }
    }
    retriveData=async ()=>{
        try
        {
            const value=await AsyncStorage.getItem()
        }
        catch (e) {
            console.log(e)

        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'lightblue',alignItems:'',justifyContent:''}}>
                {/*<TouchableOpacity style={style.btnLayout} onPress={this.storeData}>*/}
                {/*    <Text>Store Value</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity style={style.btnLayout} onPress={this.deleteData}>*/}
                {/*    <Text>Remove Value</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<Text>{this.state.item}</Text>*/}
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
