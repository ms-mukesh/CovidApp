import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    PixelRatio
} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import {connect} from 'react-redux'
import {setDays,setDailyProgress,setDailyRecovered,setDailyCases} from '../Actions/getLoginAction'

import {LineChart} from "react-native-chart-kit";
import AppHeader from './appHeader';
const scale = w / 375;

const normalize = size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

let maxDailyProgrees,maxDailyCase,maxRecovered,maxDeath
let maxCasewithState=0;
let tempCases=[];
let tempStateName=[];
let tempStateName1=[];
let tempStateCase1=[];
let lineChartData={}
let tempLineData={}
let i
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

        maxDeath=Math.max.apply(null, this.props.data.dailyDeathData)

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

    }

    createChat=(dataArray,dayArray,titleForChat,scale)=>{
        return(
            <View style={{height:h*.67,width:w-30,backgroundColor:'lavender',alignSelf:'center',alignItems:'center',borderRadius:10,marginTop:h*0.015}}>
                <Text style={{fontSize:normalize(15),fontWeight:'bold',marginTop:h*.001}}>{titleForChat}<Text style={{fontSize:normalize(11)}}>  (Swipe Right)</Text></Text>
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
                <Text style={{fontSize:normalize(15),fontWeight:'bold',marginTop:h*.001}}>Check the Progress<Text style={{fontSize:normalize(11)}}>  (Swipe Right)</Text></Text>
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
    render(){
        return(
            <View style={{flex:1,}}>
                <AppHeader title={'Graph Representation(India)'} onPress={()=>this.props.navigation.openDrawer()}/>
                <ScrollView style={{flex:1}}>
                        {this.createChat(this.props.data.dailyProgres,this.props.data.dayArray,"Graph For Daily Progress",maxDailyProgrees)}
                        {this.createChat(this.props.data.dailyCases,this.props.data.dayArray,"Graph For Daily Accumulated Cases",maxDailyCase)}
                        {this.createChat(this.props.data.recoveredCases,this.props.data.dayArray,"Graph For Daily Recovering",maxRecovered)}

                        {this.displayChat()}
                        {this.createChat(tempStateCase1.reverse(),tempStateName1.reverse(),"Check where your State Stands",maxCasewithState)}

                    {this.createChat(this.props.data.dailyDeathData,this.props.data.dayArray,"Graph For Deaths",maxDeath)}

                   </ScrollView>
            </View>
        )
    }
}

const style=StyleSheet.create({
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
