import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {addToDo, DeleteToDo, getUser} from '../action/addToDoAction';
import axios from 'axios';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
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
  Modal,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  DatePickerIOS,
  Image,
  InputAccessoryView,
  TouchableHighlight,
} from 'react-native';

let h = Dimensions.get('window').height;
let w = Dimensions.get('window').width;
class AddTodo extends Component {
  state = {
    enterData: '',
  };

  // loadDate=()=>{
  //     axios.get('http://192.168.200.146:9001/getUserData')
  //         .then(res => {
  //             const persons = res.data;
  //             console.log(persons);
  //         })
  // };
  // componentDidMount(): void {
  //     this.loadDate()
  // }
  render() {
    debugger;
    return (
      <View style={{flex: 1, flexDirection: '', justifyContent: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <TextInput
              onChangeText={text => {
                this.setState({enterData: text});
              }}
              style={style.textInput}>
              {this.props.tododata}
            </TextInput>
          </View>
          <View style={{flex: 1, alignItems: 'center', marginTop: 18}}>
            <TouchableOpacity
              onPress={() => this.props.DeleteToDo(this.state.enterData)}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: 'lightblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, alignItems: 'center', marginTop: 18}}>
            <TouchableOpacity
              onPress={() => this.props.getUser()}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: 'lightblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Api Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: 'pink'}}>
          {/*<OutlinedTextField*/}
          {/*    label='Phone number'*/}
          {/*    keyboardType='phone-pad'*/}
          {/*    formatText={this.formatText}*/}
          {/*    onSubmitEditing={this.onSubmit}*/}
          {/*    ref={this.fieldRef}*/}
          {/*/>*/}

          <Text>
            {this.props.person != null
              ? this.props.person[0].username
              : 'fdfdfdfdfd'}
          </Text>
        </View>
        {this.props.person != null
          ? console.log(this.props.person[0].username)
          : console.log('fdfdfdfdfd')}
      </View>
    );
  }
}
const style = StyleSheet.create({
  textInput: {
    width: w - 50,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'lavender',
    borderRadius: 50,
    marginTop: 20,
    fontSize: 20,
    padding: 10,
  },
  btnLayout: {
    width: w - 50,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'lavender',
    borderRadius: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapSatateToProps(state) {
  // alert(state.AddTodo.tododata)

  return {
    tododata: state.AddTodo.tododata,
    person: state.AddTodo.person,
  };
}
debugger;
function mapDispatchToProps(dispatch) {
  debugger;
  return {
    addToDo: data => addToDo(data),
    DeleteToDo: data => DeleteToDo(data),
    getUser: () => getUser(),
  };
}
export default connect(
  mapSatateToProps,
  mapDispatchToProps(),
)(AddTodo);
