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
    Modal, StatusBar,
    ImageBackground,
    ActivityIndicator,
    Dimensions,
    DatePickerIOS, Image, InputAccessoryView,
    TouchableHighlight, PixelRatio,


} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import axios from 'axios';
import {connect} from 'react-redux'
import {getLogin} from '../Actions/getLoginAction';

import getLoginReducer from '../Reducer/loginReducer';



import * as shape from 'd3-shape'
import {exp} from 'react-native-reanimated';

import index from 'rn-fetch-blob';

const scale = w / 375;

const normalize = size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const data = [-10, -15, 40, 60, 78, 42, 56];
const labels = ["jan", "feb", "mar", "apr", "may", "jun", "jul"];
const config = {
    line: {
        visible: true,
        strokeWidth: 2,
        strokeColor: "#341f97"
    },
    area: {
        visible: false
    },
    yAxis: {
        visible: true,
        labelFormatter: v => String(v) + " °C"
    },
    xAxis: {
        visible: true
    },
    grid: {
        stepSize: 15
    },
    dataPoint: {
        visible: true,
        color: "#777",
        radius: 3,
        label: { visible: true, marginBottom: 25 }
    },
    insetY: 10
};
const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
const fill = 'rgb(134, 65, 244)';
let City=[];
let Cases=[];

let counter=0;



export default class  rnFethcDemo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            cityData:{},
            flag:1,
            modelVisible:false,
            selectedCity:'',

            CountryCase:'',
            WorldCase:'',

            CoutryDeath:'',
            WorldDeath:'',

            dateArray:[],
            dateWiesCasesArray:[],
            recoverCases:'',
            recoverCasesPer:'',
            seriousCases:'',
            seriousCasesPer:'',
            mildCase:'',
            mildCasePer:'',
            todayCases:'',


        }
    }
    showDetials=(cases,index)=>{
        this.setState({selectedCity:City[index]})
        this.setState({cityCases:cases})


    }
    getCountryData=()=>{
        return new Promise((resolve=>{
            axios.post("https://covidapi123.herokuapp.com/covid/api/getCurrentCasesIndia")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))
    }



    getWorldData=()=>{
        return new Promise((resolve=>{
            axios.post("https://covidapi123.herokuapp.com/covid/api/getCurrentCasesWorld")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))
    }



    getDemo=()=>{
        return new Promise((resolve=>{
            axios.post("https://www.worldometers.info/coronavirus/coronavirus-cases/#total-cases")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))
    }
    displayChat=()=>{
        return(
            <View style={{flex:1}}>
                <LineChart
                    data={this.state.cityData}
                    width={w}
                    height={h}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    bezier
                    onDataPointClick={(value,dataset,getColor)=>alert("There are " +JSON.stringify(value.value) + " Cases in " +City[value.index]+"Till now")}
                />
            </View>

        )

    }


    componentDidMount() {
        this.getDemo().then((res)=>{
           let str=res.data;

           let temp='\n' +
               '        series: [{\n' +
               '            name: \'Cases\',\n' +
               '            color: \'#33CCFF\',\n' +
               '            lineWidth: 5,\n' +
               '            data: [580,845'

            console.log("datdad")

            let CasesArray=str.substring(str.indexOf(temp),str.length);

            CasesArray=CasesArray.substring(CasesArray.indexOf('580'),CasesArray.indexOf('}]')-9)
            CasesArray=CasesArray.split(",");
             let daySArray=str.substring(str.indexOf("categories")+13,str.indexOf("yAxis")-5)
             daySArray=daySArray.split(",")
             let tempArray=[];
             daySArray.map((data)=>{
                 tempArray.push(data.substring(data.indexOf('"')+1,data.lastIndexOf('"')))
             })
            this.setState({dateArray:tempArray,dateWiesCasesArray:CasesArray})

            let tempRecoverCases=str.substring(str.indexOf('Recovered/Discharged'),str.indexOf('Recovered/Discharged')+100)
            tempRecoverCases=tempRecoverCases.replace(/[^0-9]/g,'')

            let tempRecoverPer=tempRecoverCases.substring(tempRecoverCases.substring(0,tempRecoverCases.length-2).length,tempRecoverCases.length)

            tempRecoverCases=tempRecoverCases.substring(0,tempRecoverCases.length-2)
            this.setState({recoverCases:tempRecoverCases,recoverCasesPer:tempRecoverPer})

            let seriousCases=str.substring(str.indexOf('Serious or Critical'),str.indexOf('Serious or Critical')+100)
            seriousCases=seriousCases.replace(/[^0-9]/g,'')

            let seriousCasesPer=seriousCases.substring(seriousCases.substring(0,seriousCases.length-1).length,seriousCases.length)
            seriousCases=seriousCases.substring(0,seriousCases.length-1)

             this.setState({seriousCases:seriousCases,seriousCasesPer:seriousCasesPer})

            let tempMildCases=str.substring(str.indexOf('Mild Condition'),str.indexOf('Mild Condition')+100)
            tempMildCases=tempMildCases.replace(/[^0-9]/g,'')

            let tempMildPer=tempMildCases.substring(tempMildCases.substring(0,tempMildCases.length-2).length,tempMildCases.length)

            tempMildCases=tempMildCases.substring(0,tempMildCases.length-2)


            this.setState({mildCase:tempMildCases,mildCasePer:tempMildPer})


        });


        this.getCountryData().then((res)=>{
            let str=res.data
            let IndiaCase=str.substring(str.indexOf(':')+1,str.indexOf('Cases'))
            let IndiaDeath=str.substring(str.indexOf('and')+4,str.indexOf('Deaths'))
            this.setState({CountryCase:IndiaCase,CoutryDeath:IndiaDeath})
        })

        this.getWorldData().then((res)=>{
            let str=res.data
            let Cases=str.substring(str.indexOf(":")+2,str.indexOf("Cases"))
            let Death=str.substring(str.indexOf("and")+4,str.indexOf("Deaths"))
            this.setState({WorldCase:Cases,WorldDeath:Death});
        })
        setInterval(()=>{
            this.getCountryData().then((res)=>{
                let str=res.data
                let IndiaCase=str.substring(str.indexOf(':')+1,str.indexOf('Cases'))
                let IndiaDeath=str.substring(str.indexOf('and')+4,str.indexOf('Deaths'))
                this.setState({CountryCase:IndiaCase,CoutryDeath:IndiaDeath})
            })

            this.getWorldData().then((res)=>{
                let str=res.data
                let Cases=str.substring(str.indexOf(":")+2,str.indexOf("Cases"))
                let Death=str.substring(str.indexOf("and")+4,str.indexOf("Deaths"))
                this.setState({WorldCase:Cases,WorldDeath:Death});
            })
        },300000)

    }
    render(){


    return(

        <View style={{flex:1,padding:10}}>
            <ScrollView style={{flex:1}}>
                <View style={{height:h*.35}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                        <View style={{flex:1}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'red'}}>Today +{parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1])}</Text>
                            <Text style={{fontSize:normalize(20),marginTop:1,fontWeight:'bold',color:'red',alignSelf:'center'}}>{this.state.WorldCase}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Confirmed</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'green'}}>{this.state.recoverCasesPer}%</Text>
                            <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center',color:'green'}}>{this.state.recoverCases}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Recovered</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'red'}}>{this.state.seriousCasesPer}%</Text>
                            <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center',color:'orange'}}>{this.state.seriousCases}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Serious Cases</Text>
                        </View>

                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'red'}}>{this.state.mildCasePer}%</Text>
                            <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center',color:'lightblue'}}>{this.state.mildCase}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Mild Cases</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'red'}}>Today +3124</Text>
                            <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center',color:'lightblue'}}>{this.state.WorldDeath}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Death</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1.5,alignItems:'center',backgroundColor:'lightblue',borderRadius:10}}>
                    <Text style={{fontSize:normalize(20),fontWeight:'bold'}}>Date Wise Cases(World)</Text>
                            <ScrollView style={{flex:1}}>
                               {
                                    this.state.dateWiesCasesArray.map((data,index)=>{
                                        return(
                                            <View style={{height:h*.10,width:w-50,backgroundColor:'white',marginTop:10,borderRadius:10,padding:10,flexDirection:'row'}}>
                                                <View style={{flex:4}}>
                                                <Text style={{fontSize:normalize(15),fontWeight:'bold'}}>{this.state.dateArray[index]}</Text>
                                                <Text style={{fontSize:normalize(17),fontWeight:'bold',color:index==0?'red':data>this.state.dateWiesCasesArray[index-1]?'red':'green',marginTop:2}}>{data}  cases</Text>
                                                </View>
                                                <View style={{flex:1}}>
                                                    {index>0 &&
                                                    <Icon style={{alignSelf:'flex-end'}} name={data>this.state.dateWiesCasesArray[index-1]?'arrowup':'arrowdown'} size={20} color={data>this.state.dateWiesCasesArray[index-1]?'red':'green'}/>
                                                    }

                                                </View>

                                            </View>


                                        )
                                    })

                                }
                            </ScrollView>
                        </View>
            </ScrollView>


        </View>

        // <View style={{flex:1,padding:10,backgroundColor:'lightblue'}}>
        //
        //     <View style={{flex:1,alignItems:'center'}}>
        //         <Text style={{fontSize:20,fontWeight:'bold'}}>Live status</Text>
        //     <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',borderRadius:10,padding:10,marginTop:10}}>
        //         <Text style={{fontSize:20,flex:1.5,fontWeight:'bold'}}>World Total Positive Cases</Text>
        //         <Text style={{fontSize:25,flex:1,color:'red',fontWeight:'bold',textAlign:'right'}}>{this.state.WorldCase}</Text>
        //     </View>
        //
        //     <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',borderRadius:10,padding:10,marginTop:10}}>
        //         <Text style={{fontSize:20,flex:2,fontWeight:'bold'}}>World Total Death</Text>
        //         <Text style={{fontSize:25,flex:1,color:'red',fontWeight:'bold',textAlign:'right'}}>{this.state.WorldDeath}</Text>
        //     </View>
        //
        //     <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',borderRadius:10,padding:10,marginTop:10}}>
        //         <Text style={{fontSize:20,flex:2,fontWeight:'bold'}}>India Total Positive Cases</Text>
        //         <Text style={{fontSize:25,flex:1,color:'red',fontWeight:'bold',textAlign:'right'}}>{this.state.CountryCase}</Text>
        //     </View>
        //     <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',borderRadius:10,padding:10,marginTop:10}}>
        //         <Text style={{fontSize:20,flex:2,fontWeight:'bold'}}>India Total Death</Text>
        //         <Text style={{fontSize:25,flex:1,color:'red',fontWeight:'bold',textAlign:'right'}}>{this.state.CoutryDeath}</Text>
        //     </View>
        //     </View>
        //
        //     <View style={{flex:1.5,alignItems:'center'}}>
        //         <Text style={{fontSize:20,fontWeight:'bold'}}>Date Wise Cases(World)</Text>
        //         <ScrollView style={{flex:1}}>
        //             {
        //                 this.state.dateWiesCasesArray.map((data,index)=>{
        //                     return(
        //                         <View style={{height:70,width:w-50,backgroundColor:'white',marginTop:10,borderRadius:10,padding:10,flexDirection:'row'}}>
        //                             <View style={{flex:4}}>
        //                             <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.dateArray[index]}</Text>
        //                             <Text style={{fontSize:17,fontWeight:'bold',color:index==0?'red':data>this.state.dateWiesCasesArray[index-1]?'red':'green',marginTop:2}}>{data}  cases</Text>
        //                             </View>
        //                             <View style={{flex:1}}>
        //                                 {index>0 &&
        //                                 <Icon style={{alignSelf:'flex-end'}} name={data>this.state.dateWiesCasesArray[index-1]?'arrowup':'arrowdown'} size={20} color={data>this.state.dateWiesCasesArray[index-1]?'red':'green'}/>
        //                                 }
        //
        //                             </View>
        //
        //                         </View>
        //
        //
        //                     )
        //                 })
        //
        //             }
        //         </ScrollView>
        //     </View>
        // </View>
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



