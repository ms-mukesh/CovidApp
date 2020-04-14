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


// import { AreaChart, Grid,BarChart } from 'react-native-svg-charts'
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
        r: "3",
        strokeWidth: "50",
        stroke: "red"
    }
};
const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
const fill = 'rgb(134, 65, 244)';
let Country=[];
let Cases=[];
const data={
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        }
    ]
}

export default class  rnFethcDemo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            countryData:{},
            flag:1,
            data:{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                    }
                ]
            }

        }
    }
    getCountryData=()=>{
        return new Promise((resolve=>{
            axios.post("https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/app/api/getCountryData")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))
    }
    displayChat=()=>{
        return(
            <View style={{flex:1}}>
                <BarChart
                    data={this.state.countryData}
                    width={w*2}
                    height={h}
                    chartConfig={chartConfig}
                    verticalLabelRotation={40}
                    withInnerLines={true}
                    showBarTops={true}
                />



            </View>

        )

    }

    componentDidMount() {
        this.getCountryData().then((res)=>{
            res.data.map((data)=>{
                Country.push(data.countryName)
                Cases.push(data.case)
            })
            this.setState({countryData:{}})
            this.setState({countryData:{labels:Country,datasets:[{data:Cases}]}})
            this.setState({flag:0});
        })

    }





    render(){


    return(

        <View style={{flex:1}}>
            <ScrollView horizontal={true} style={{flex:1}}>
                {this.state.flag==1?console.log("kljl"):this.displayChat()}


            </ScrollView>


            {/*<LineChart*/}
            {/*    data={data1}*/}
            {/*    width={Dimensions.get("window").width} // from react-native*/}
            {/*    height={220}*/}
            {/*    yAxisLabel="$"*/}
            {/*    yAxisSuffix="k"*/}
            {/*    yAxisInterval={1} // optional, defaults to 1*/}
            {/*    chartConfig={chartConfig}*/}
            {/*    bezier*/}
            {/*    style={{*/}
            {/*        marginVertical: 8,*/}
            {/*        borderRadius: 16*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<BarChart*/}
            {/*    style={{ height: 200 }}*/}
            {/*    data={ data }*/}
            {/*    svg={{ fill:randomColor() }}*/}
            {/*    contentInset={{ top: 30, bottom: 30 }}*/}
            {/*>*/}
            {/*    <Grid/>*/}
            {/*</BarChart>*/}

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



