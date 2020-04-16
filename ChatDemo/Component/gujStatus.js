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
let City=[];
let Cases=[];



export default class  rnFethcDemo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            cityData:{},
            flag:1,
            modelVisible:false,
            selectedCity:'',
            cityCases:''
        }
    }
    showDetials=(cases,index)=>{
        this.setState({selectedCity:City[index]})
        this.setState({cityCases:cases})


    }
    getCountryData=()=>{
        return new Promise((resolve=>{
            axios.post("https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/app/api/getGujData")
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
                {/*    data={this.state.cityData}*/}
                {/*    width={w*2}*/}
                {/*    height={h}*/}
                {/*    chartConfig={chartConfig}*/}
                {/*    verticalLabelRotation={40}*/}
                {/*    withInnerLines={true}*/}
                {/*    showBarTops={true}*/}
                {/*/>*/}


                <LineChart
                    data={this.state.cityData}
                    width={w}
                    height={h}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    bezier
                    onDataPointClick={(value,dataset,getColor)=>alert("There are " +JSON.stringify(value.value) + " Cases in " +City[value.index]+"Till now")}
                />




                {/*<LineChart*/}
                {/*    data={this.state.stateData}*/}
                {/*    width={w*3}*/}
                {/*    height={h}*/}
                {/*    verticalLabelRotation={30}*/}
                {/*    chartConfig={chartConfig}*/}
                {/*    bezier*/}
                {/*/>*/}


            </View>

        )

    }


    componentDidMount() {
        this.getCountryData().then((res)=>{
            res.data.map((data)=>{
                City.push(data.cityName)
                Cases.push(data.case)
            })
            this.setState({cityData:{}})
            this.setState({cityData:{labels:City,datasets:[{data:Cases}]}})
            this.setState({flag:0});
        })

    }


    render(){


    return(

        <View style={{flex:1}}>
            <ScrollView horizontal={true} style={{flex:1}}>
                {this.state.flag==1?console.log("kljl"):this.displayChat()}

                { this.state.modelVisible &&
                <Modal visible={true} animated={true} transparent={true}>
                    <View style={{flex:1,backgroundColor:'white'}}>
                        <View style={{alignSelf:'center',height:h-200,width:w-100}}>

                        </View>
                        <TouchableOpacity onPress={()=>this.setState({modelVisible:false})} style={{height:50,width:50}}><Text>Close</Text></TouchableOpacity>
                    </View>
                </Modal>
                }
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



