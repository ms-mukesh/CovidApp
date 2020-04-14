import React, {useState, Component, useEffect} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

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
    PixelRatio


} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import axios from 'axios';
import {connect} from 'react-redux'

import {setDays,setDailyProgress,setDailyRecovered,setDailyCases} from '../Actions/getLoginAction'



import indianFlag from '../Images/inidanFlag.png';
import {LineChart} from "react-native-chart-kit";
import ScatterChart from 'react-native-charts-wrapper/lib/ScatterChart';
import AppHeader from './appHeader';

const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
const fill = 'rgb(134, 65, 244)';
let City=[];
let Cases=[];

let counter=0;

let sum=0;

let StateArray=['Andhra Pradesh','Andaman and Nicobar Islands','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Madhya Pradesh','Maharashtra','Manipur','Mizoram','Odisha','Puducherry','Punjab','Rajasthan','Tamil Nadu','Telengana','Uttarakhand','Uttar Pradesh','West Bengal']
let LatLog = {
    Kerala: {
        latitude: 10.536421,
        longitude: 76.429138
    },
    Delhi: {
        latitude: 28.646005,
        longitude: 77.222214
    },
    Telangana: {
        latitude: 17.978733,
        longitude: 79.310303
    },
    Rajasthan: {
        latitude: 26.706360,
        longitude: 73.773193
    },
    Haryana: {
        latitude: 29.310351,
        longitude: 76.061096
    },
    UttarPradesh: {
        latitude: 26.8467,
        longitude: 80.9462
    },
    Ladakh: {
        latitude: 34.152588,
        longitude: 77.577049
    },
    JammuandKashmir: {
        latitude: 33.7782,
        longitude: 76.5762
    },
    Karnataka: {
        latitude: 15.317277,
        longitude: 75.713890
    },
    Maharashtra: {
        latitude: 19.663280,
        longitude: 75.300293
    },
    Punjab: {
        latitude: 31.1471,
        longitude: 75.3412
    },
    AndhraPradesh: {
        latitude: 15.9129,
        longitude: 79.7400
    },
    Uttarakhand: {
        latitude: 30.0668,
        longitude: 79.0193
    },
    Odisha: {
        latitude: 20.9517,
        longitude: 85.0985
    },
    Puducherry: {
        latitude: 11.9416,
        longitude: 79.8083
    },
    WestBengal: {
        latitude: 22.9868,
        longitude: 87.8550
    },
    Chandigarh: {
        latitude: 30.7333,
        longitude: 76.7794
    },
    Chhattisgarh: {
        latitude: 21.2787,
        longitude: 81.8661
    },
    Gujarat: {
        latitude: 22.2587,
        longitude: 71.1924
    },
    HimachalPradesh: {
        latitude: 31.1048,
        longitude: 77.1734
    },
    MadhyaPradesh: {
        latitude: 22.9734,
        longitude: 78.6569
    },
    Bihar: {
        latitude: 25.0961,
        longitude: 85.3131
    },
    Manipur: {
        latitude: 24.6637,
        longitude: 93.9063
    },
    Mizoram: {
        latitude: 23.1645,
        longitude: 92.9376
    },
    Goa: {
        latitude: 15.2993,
        longitude: 74.1240
    },
    AndamanandNicobarIslands: {
        latitude: 11.7401,
        longitude: 92.6586
    },
    Jharkhand: {
        latitude: 23.6102,
        longitude: 85.2799
    },
    Assam: {
        latitude: 26.2006,
        longitude: 92.9376
    },
    ArunachalPradesh: {
        latitude: 28.2180,
        longitude: 94.7278
    },
    Nagaland: {
        latitude: 26.1584,
        longitude: 94.5624
    },
    Sikkim: {
        latitude: 27.5330,
        longitude: 88.5122
    },
    TamilNadu: {
        latitude: 11.1271,
        longitude: 78.6569
    },
    Tripura: {
        latitude: 23.9408,
        longitude: 91.9882
    },
    DadraandNagarHaveli: {
        latitude: 20.1809,
        longitude: 73.0169
    },
    Lakshadweep: {
        latitude: 8.295441,
        longitude: 73.048973
    },
    DamanandDiu:{
        latitude: 20.4283,
        longitude: 72.8397
    },
    Meghalaya:{
        latitude: 25.4670,
        longitude: 91.3662
    }

}

const scale = w / 375;

const normalize = size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

let maxDailyProgrees,maxDailyCase,maxRecovered
let maxCasewithState=0;
let tempCases=[];
let tempStateName=[];
let tempStateName1=[];
let tempStateCase1=[];

let lineChartData={}

let tempLineData={}
class IndiaGraphPage extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            chartData:{},
            chatFlag:false,
            stateName:[],
            stateCases:[]

        }




        maxDailyProgrees=this.props.data.maxDailyProgrees;
        maxDailyCase=this.props.data.maxDailyCases;
        maxRecovered=this.props.data.maxDailyRecovered;

        this.props.data.stateDataFinal.map((data,index)=>{
            if(data.state!=='Total')
            {
                tempCases.push(data.confirmed)
                tempStateName.push(data.state)
            }

        })


        let j
        for(i=0;i<tempCases.length;i++)
        {
            for(j=0;j<(tempCases.length-i-1);j++)
            {
                if(parseInt(tempCases[j])<parseInt(tempCases[j+1]))
                {
                    let temp=tempCases[j];
                    tempCases[j]=tempCases[j+1];
                    tempCases[j+1]=temp
                    let temp2=tempStateName[j];
                    tempStateName[j]=tempStateName[j+1];
                    tempStateName[j+1]=temp2
                }
            }

        }

        tempStateName1=tempStateName;
        tempStateCase1=tempCases
        maxCasewithState=Math.max.apply(null, tempCases)

        lineChartData=this.props.data.lineChartData
        lineChartData={labels:this.props.data.lineChartData.labels,datasets:[{data:this.props.data.lineChartData.datasets[0].data}]}



        let templabel=[];
        let tempDataset=[];

       lineChartData.labels.slice(0).reverse().map((data)=>{
           templabel.push(data)
       })
        lineChartData.datasets[0].data.slice(0).reverse().map((data)=>{
            tempDataset.push(data)
        })

        tempLineData={labels:templabel,datasets:[{data:tempDataset}]}

        console.log(tempLineData)


        // tempLineData={labels:lineChartData.labels,datasets:[{data:lineChartData.datasets[0].data}]}




    }
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;


            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    createChat=(dataArray,dayArray,titleForChat,scale)=>{
        return(
            <View style={{height:h*.67,width:w-30,backgroundColor:'lavender',alignSelf:'center',alignItems:'center',borderRadius:10,marginTop:h*0.015}}>
                <Text style={{fontSize:normalize(15),fontWeight:'bold',marginTop:h*.001}}>{titleForChat}<Text style={{fontSize:normalize(10)}}>(Swipe right)</Text></Text>
                <ScrollView horizontal={true} nestedScrollEnabled={true}>
                    {dataArray.slice(0).reverse().map((data,index)=>{
                        return(
                            <View>
                                <View style={{height:h*0.55,width:w*0.15,alignItems:'flex-end',flexDirection:'row-reverse',justifyContent:'center',marginTop:h*.01,}}>
                                    {data == 0 ? <Text style={{
                                            fontWeight: 'bold',
                                            color: 'grey',
                                        }}>{0}</Text> :
                                        <View>
                                            <Text style={{
                                                alignSelf: 'center',
                                                fontWeight: 'bold',
                                                color: 'grey'
                                            }}>{data}</Text>
                                            <View key={index}  style={{
                                                height:data==scale?"95%": Math.ceil(data * 100 / scale) + "%",
                                                width: w*.13,
                                                backgroundColor: 'lightblue',
                                                borderRadius: 2
                                            }}>
                                            </View>
                                        </View>
                                    }
                                </View>
                                <View style={{height:h*.20,width:50,marginLeft:w*0.015,alignItems:'center',}}>
                                    <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:normalize(11),marginTop:h*.001}}>{dayArray[dayArray.length-1-index]}</Text>
                                </View>
                            </View>
                        )
                    })
                    }
                </ScrollView>
            </View>
        )
    }

    displayChat=()=>{
        return(
            <View style={{height:h*.67,width:w-30,backgroundColor:'lavender',alignSelf:'center',alignItems:'center',borderRadius:10,marginTop:h*0.020}}>
                <Text style={{fontSize:normalize(15),fontWeight:'bold',marginTop:h*.001}}>Check the Progress<Text style={{fontSize:normalize(10)}}>(Swipe right)</Text></Text>
                <ScrollView  horizontal={true} nestedScrollEnabled={true}>
                <LineChart

                    data={tempLineData}
                    width={tempLineData.labels.length * 55} // from react-native
                    height={h * 0.67}
                    yAxisLabel={''}
                    fromZero={true}
                    withInnerLines={false}
                    chartConfig={{
                        backgroundColor: 'lavender',
                        backgroundGradientFrom: 'lavender',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    renderDotContent={({x, y, index}) => {
                        return (
                            <View
                                style={{
                                    position: 'absolute',
                                    left: index !== tempLineData.labels.length - 1 ? x - 10 : x + 5,
                                    top: index !== tempLineData.labels.length - 1 ? y - 25 : y - 10,
                                    zIndex: 1,

                                }}>
                                <Text
                                    style={{
                                        fontSize: w * 0.035,
                                        fontWeight: '600',
                                        color: 'black',
                                        marginTop:index==0?h*0.015:0,
                                        marginLeft:index==0?w*0.035:0
                                    }}>
                                    {tempLineData.datasets[0].data[index]}
                                </Text>
                            </View>
                        );
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
                </ScrollView>
            </View>


        )
    }
    componentDidMount(): void {


        // console.log(tempStateName)


        // console.log(this.props.data.lineChartData.datasets[0].data.reverse())
        // this.props.data.lineChartData.labels=this.props.data.lineChartData.labels.reverse()
        // console.log(this.props.data.lineChartData.labels)

        // this.setState({chartData:{labels:this.props.data.lineChartData.labels,datasets:[{data:this.props.data.lineChartData.datasets[0].data}]}})



    }
    render(){
        return(
            <View style={{flex:1,}}>
                <AppHeader title={'Graph Representation(India)'} onPress={()=>this.props.navigation.openDrawer()}/>
                <ScrollView style={{flex:1}}>
                        {this.createChat(this.props.data.dailyProgres,this.props.data.dayArray,"Graph For Daily Progress",maxDailyProgrees)}
                        {this.createChat(this.props.data.dailyCases,this.props.data.dayArray,"Graph For Daily Getting Cases",maxDailyCase)}
                        {this.createChat(this.props.data.recoveredCases,this.props.data.dayArray,"Graph For Daily Recovering",maxRecovered)}

                        {this.displayChat()}
                    {console.log(tempStateCase1)}
                        {this.createChat(tempStateCase1.reverse(),tempStateName1.reverse(),"Check where your State Stands",maxCasewithState)}



                    {/*<View style={{height:h*0.70,alignItems:'center',justifyContent:'center',padding:10}}>*/}
                    {/*    <View style={{height:h*0.08}}>*/}
                    {/*        <Text style={{fontSize:normalize(20),fontWeight:'bold',marginTop:h*.01}}>State Wise Data<Text style={{fontSize:normalize(15)}}>  (select state for more detail)</Text></Text>*/}
                    {/*    </View>*/}
                    {/*    <ScrollView nestedScrollEnabled={true} style={{flex:1}}>*/}
                    {/*        {this.props.data.stateDataFinal.map((data,index)=>{*/}
                    {/*            return(*/}
                    {/*                <View>*/}
                    {/*                    <View key={index} style={{flex:4,height:40,backgroundColor:'white',marginTop:h*0.01,width:w-40,padding:w*0.01,alignItems:'center',flexDirection:'row',borderRadius:5}}>*/}
                    {/*                        <TouchableOpacity style={{flex:1,flexDirection:'row'}} onPress={()=>this.displayStateData(data[0].stateName,data[0].confirmCases)}>*/}
                    {/*                            <Text style={{fontSize:normalize(15),fontWeight:'bold',textAlign:'left',flex:8}}>{data[0].stateName}</Text>*/}
                    {/*                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'flex-end',flex:2}}>{data[0].confirmCases}</Text>*/}
                    {/*                        </TouchableOpacity>*/}
                    {/*                    </View>*/}
                    {/*                </View>*/}
                    {/*            )*/}
                    {/*        })}*/}
                    {/*    </ScrollView>*/}
                    {/*</View>*/}

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
        fontSize: normalize(20),
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
    mainView: {
        width:w,
        height: h * 0.33,
    },
})

function mapSatateToProps(state) {
    return {
        data:state.getLoginReducer

    }
}


function mapDispatchToProps(dispatch) {
    return {
        setDays:(data)=>setDays(data),
        setProgress:(data)=>setDailyProgress(data),
        setRecovered:(data)=>setDailyRecovered(data),
        setDailyCases:(data)=>setDailyCases(data)

    }
}

export default connect(mapSatateToProps,mapDispatchToProps())(IndiaGraphPage)
