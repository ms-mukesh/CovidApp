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



import * as shape from 'd3-shape'


import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import {exp} from 'react-native-reanimated';



const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#BFFFD5",

    color: (opacity = 1) => `rgba(255,50, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 10,

    },
    propsForDots: {
        r: "1",
        strokeWidth: "50",
        stroke: "green",


    }
};
const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
const fill = 'rgb(134, 65, 244)';
let State=[];
let Cases=[];


export default class  rnFethcDemo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            stateData:{},
            flag:1,
        }
    }
    getCountryData=()=>{
        return new Promise((resolve=>{
            axios.post("https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/app/api/getStateData")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))
    }
    displayChat=()=>{
        return(
            <View style={{flex:1}}>
                {/*<BarChart*/}
                {/*    data={this.state.stateData}*/}
                {/*    width={w*2}*/}
                {/*    height={h}*/}
                {/*    chartConfig={chartConfig}*/}
                {/*    verticalLabelRotation={40}*/}
                {/*    withInnerLines={true}*/}
                {/*    showBarTops={true}*/}
                {/*/>*/}


                <LineChart
                    data={this.state.stateData}
                    width={w*3}
                    height={h}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>

        )

    }

    componentDidMount() {
        this.getCountryData().then((res)=>{
            res.data.map((data)=>{
                State.push(data.stateName)
                Cases.push(data.case)
            })
            this.setState({stateData:{}})
            this.setState({stateData:{labels:State,datasets:[{data:Cases}]}})
            this.setState({flag:0});
        })

    }


    render(){


    return(

        <View style={{flex:1}}>
            <ScrollView horizontal={true} style={{flex:1}}>
                {this.state.flag==1?console.log("kljl"):this.displayChat()}


            </ScrollView>




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



