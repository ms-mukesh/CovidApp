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
import {getLogin} from '../Actions/getLoginAction';

import getLoginReducer from '../Reducer/loginReducer';
import indianFlag from '../Images/inidanFlag.png';
import * as shape from 'd3-shape'
import {LineChart} from "react-native-chart-kit";
import index from 'rn-fetch-blob';

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
    TamilNadu: {
        latitude: 11.1271,
        longitude: 78.6569
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
    Tripura: {
        latitude: 23.9408,
        longitude: 91.9882
    },
    DadraandNagarHaveli: {
        latitude: 20.1809,
        longitude: 73.0169
    },
    Lakshadweep:	{
        latitude: 8.295441,
        longitude: 73.048973
    }

}

const scale = w / 375;

const normalize = size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


// const lineData = {
//     labels: [
//         '1',
//         '2',
//         '3',
//         '4',
//         '5',
//         '6',
//         '7',
//         '8',
//         '9',
//         '10',
//         '11',
//         '12',
//         '13',
//         '14',
//     ],
//     datasets: [
//         {
//             data: [20, 45, 48, 47, 53, 58, 58, 75, 80, 82, 84, 90, 96, 122],
//             strokeWidth: 3, // optional
//             color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
//         },
//     ],
// };




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

            stateName:[],
            stateCases:[],

            dayArray:[],
            dailyCases:[],
            maxDailyCases:0,
            maxDailyReovered:0,
            maxDaiyProgress:0,
            recoverCases:0,
            dailyRecoverCases:[],
            dailyGetCase:[],

            dailyRecoverCases2:[],
            stateDataFinal:[],
            stateNameDetail:'',

            districtName:[],
            districtCases:[],
            districtTotalCase:[],
            stateWiseCaseForMap:null,
            chartData:{},
            chatFlag:false,

            renderFlag:true,
            todayCases:0
        }
    }

    fetchCities = () => {
        fetch('https://api.covid19india.org/state_district_wise.json')
            .then((response) => response.json())
            .then((json) => {
                this.citiesLatLog(json)
            })
            .catch((error) => {
                console.error(error);
            });
    }

     citiesLatLog = (citiesData) => {
        let x;
        let y;
        let arr = [];
        for (x in citiesData) {

            let confir = 0, today = 0;
            for (y in citiesData[x].districtData) {
                confir = confir + citiesData[x].districtData[y].confirmed;
                today = today + citiesData[x].districtData[y].delta.confirmed
            }
            let data;
            let stateName = x.split(/\s/).join('');
            let coodinaties = this.findCoodinaties(stateName);
            if (coodinaties) {
                data = {
                    stateName: x,
                    confirm: confir,
                    today: today,
                    coo: coodinaties
                }
                arr.push(data)
            } else {
                console.log(x)
            }

        }
        console.log(arr.length)
        // setCities(arr)

         this.setState({stateWiseCaseForMap:arr})
    }

     findCoodinaties = (x) => {
        let i;
        for (i in LatLog) {
            if (i === x) {
                return LatLog[i]
            }
        }
    }

     _callOut = (item) => {
        return <Callout >
            <View >
                <Text>Place: {item.stateName}</Text>
                <Text>Total cases: {item.confirm}</Text>
                <Text>Today cases: {item.today}</Text>
            </View>
        </Callout>
    }




    getStateData=()=>{
        return new Promise((resolve=>{
            axios.post("https://www.mohfw.gov.in/")
                .then((res)=>{
                    return resolve(res);
                });
        }))

    }
    getDemo=()=>{
        return new Promise((resolve=>{
            axios.post("https://www.worldometers.info/coronavirus/country/india/")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))
    }



    intialixation=()=>{
        this.fetchCities()
        this.getCountryData1().then((res)=>{
            let str=res.data
            let IndiaCase=str.substring(str.indexOf(':')+1,str.indexOf('Cases'))
            let IndiaDeath=str.substring(str.indexOf('and')+4,str.indexOf('Deaths'))
            this.setState({CountryCase:IndiaCase,CoutryDeath:IndiaDeath})
        })
        this.getCountryData().then((res)=>{
            let tempState=[];
            let tempStateCase=[];
            res.data.map((data)=>{
                tempState.push(data.stateName)
                tempStateCase.push(data.case)

            })
            this.setState({stateName:tempState,stateCases:tempStateCase})
        })
        this.getDemo().then((res)=>{
            let str=res.data
            let temp='<div id="maincounter-wrap" style="margin-top:15px;">\n' +
                '<h1>Recovered:</h1>\n' +
                '<div class="maincounter-number" style="color:#8ACA2B ">\n' +
                '<span>'

            let temp1='</span>\n' +
                '</div>\n' +
                '</div>\n' +
                '<div style="margin-top:50px;"></div>'
            let recoverCase=str.substring(str.indexOf(temp)+temp.length,str.indexOf(temp1));
            this.setState({dailyRecoverCases:recoverCase})
            temp='  series: [{\n' +
                '            name: \'Cases\',\n' +
                '            color: \'#33CCFF\',\n' +
                '            lineWidth: 5,\n' +
                '            data: '

            let activeCases=str.substring(str.indexOf(temp)+temp.length,str.length)
            temp1=activeCases.indexOf(']')
            activeCases=activeCases.substring(1,temp1);
            activeCases=activeCases.split(',')
            let daysOfActiveCase=str.substring(str.indexOf('categories: ["Feb 15",')+13,str.length)
            temp1=daysOfActiveCase.indexOf(']');
            daysOfActiveCase=daysOfActiveCase.substring(0,temp1);
            daysOfActiveCase=daysOfActiveCase.split(',')
            temp='series: [{\n' +
                '            name: \'Daily Cases\',\n' +
                '            color: \'#999\',\n' +
                '            lineWidth: 5,\n' +
                '            data:';

            let dailyTempCases=str.substring(str.lastIndexOf(temp)+20,str.length)
            dailyTempCases=dailyTempCases.substring(dailyTempCases.indexOf('[')+1,dailyTempCases.indexOf(']'))
            dailyTempCases=dailyTempCases.split(',')
            dailyTempCases[0]=0;
            let recoverCases=str.substring(str.indexOf('  series: [{\n' +
                '            name: \'New Recoveries\',\n' +
                '            color: \'#8ACA2B\',\n' +
                '            lineWidth: 5,'),str.length)

            recoverCases=recoverCases.substring(recoverCases.indexOf(' data: [')+8,recoverCases.indexOf(']'));
            recoverCases=recoverCases.split(",")
            this.setState({dailyRecoverCases2:recoverCases})
            this.setState({dailyGetCase:dailyTempCases})



            this.setState({maxDailyCases:Math.max.apply(null,dailyTempCases)})
            this.setState({maxDailyReovered:Math.max.apply(null,recoverCases)})
            this.setState({maxDaiyProgress:Math.max.apply(null,activeCases)})


            this.setState({dayArray:daysOfActiveCase,dailyCases:activeCases})
            this.setState({cityData:{}})


            this.setState({chartData:{labels:this.state.dayArray,datasets:[{data:this.state.dailyCases}]}})
            this.setState({chatFlag:true})
            this.setState({renderFlag:false})
            this.setState({todayCases:parseInt(this.state.CountryCase.replace(/[^0-9]/g,''))-parseInt(this.state.dailyCases[this.state.dailyCases.length-1])})

            let tempDayActiveCases=[]
            daysOfActiveCase.map((data)=>{
                tempDayActiveCases.push(data.substring(1,7))

            })
            this.setState({dayArray:tempDayActiveCases})
            this.setState({chartData:{labels:this.state.dayArray,datasets:[{data:this.state.dailyCases}]}})
        })

        this.getStateData().then((res)=>{
            let responseData=res.data;
            let responseData1=''
            let tempStateArray=[]
            let tempFinalStateArray=[]
            let tempFinalStateArray1=[]
            StateArray.map((stateName)=>{
                responseData1=responseData.substring(responseData.indexOf(stateName),responseData.length)
                responseData1=responseData1.substring(responseData1.indexOf(stateName),responseData1.indexOf('</tr>\n'))
                tempStateArray.push(responseData1)
            })
            var num=[];
            let j=0;

            tempStateArray.map((data,index)=>{

                for(let i=0;i<tempStateArray[index].split("\n").length;i++)
                {
                    if(i!==0)
                    {
                        num[i]=tempStateArray[index].split("\n")[i].replace(/[^0-9]/g,'')
                    }
                    else
                    {
                        num[i]=tempStateArray[index].split("\n")[i].substring(0,tempStateArray[index].split("\n")[i].length-5);
                    }
                }


                for(let j=0;j<num.length-1;j++)
                {
                    tempFinalStateArray=[{"stateName":num[0],"confirmCases":num[1],"cured":num[2],"death":num[3]}]
                }
                tempFinalStateArray1.push(tempFinalStateArray)
            })
            this.setState({stateDataFinal:tempFinalStateArray1})
        })
    }
    componentDidMount() {
        this.intialixation()

        // setInterval(()=>{
        //     this.intialixation()
        // },300000)
    }

    getCountryData=()=>{
        return new Promise((resolve=>{
            axios.post("https://us-central1-cloudfunctiondemo-d2104.cloudfunctions.net/app/api/getStateData")
                .then((res)=>{
                    return resolve(res);
                });
        }))
    }

    getCountryData1=()=>{
        return new Promise((resolve=>{
            axios.post("https://covidapi123.herokuapp.com/covid/api/getCurrentCasesIndia")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))
    }


    getStateInformationForCase=()=>{
        return new Promise((resolve=>{
            axios.get("https://api.covid19india.org/state_district_wise.json")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))

    }

    displayChat=()=>{
        return(
            <View>
                <LineChart
                    data={this.state.chartData}
                    width={this.state.chartData.labels.length * 55} // from react-native
                    height={h * 0.50}
                    yAxisLabel={''}
                    fromZero={true}
                    withInnerLines={false}
                    chartConfig={{
                        backgroundColor: 'lightblue',
                        backgroundGradientFrom: 'lightblue',
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
                                    left: index !== this.state.chartData.labels.length - 1 ? x - 10 : x + 5,
                                    top: index !== this.state.chartData.labels.length - 1 ? y - 25 : y - 10,
                                    zIndex: 1,
                                }}>
                                <Text
                                    style={{
                                        fontSize: w * 0.035,
                                        fontWeight: '600',
                                        color: 'black',
                                    }}>
                                    {this.state.chartData.datasets[0].data[index]}
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
            </View>
        )
    }

    displayStateData=(statename,cases)=>{
        this.setState({renderFlag:true})

        this.getStateInformationForCase().then((res)=>{
            let str=res.data;
            let tempDistrcitArray=[];
            let tempDistrcitArrayCase=[];
            let x,y,z
            for(x in str){
                if(x===statename)
                {
                    for(y in str[x].districtData)
                    {
                        tempDistrcitArray.push(y)
                        tempDistrcitArrayCase.push(str[x].districtData[y].confirmed)
                    }
                }
            }
            this.setState(({districtName:tempDistrcitArray,districtCases:tempDistrcitArrayCase}))
            this.setState({renderFlag:false})
            this.setState({modelVisible:true,stateNameDetail:statename,districtTotalCase:cases})

        })
    }

    render(){
    return(
        <View style={{flex:1,alignItems:'center'}}>
            <ScrollView style={{flex:1}}>

                <View style={{height:h*.50,width:w,}}>
                    <View style={{height:h*.10,width:w,justifyContent:'center',flexDirection:'row',padding:10}}>
                        <Image source={indianFlag} style={{height:h*0.08,width:w*.25}}/>
                        <Text style={{fontSize:normalize(20),fontWeight:'bold',textAlign:'center',marginTop:h*0.02,marginLeft:w*0.02}}>India</Text>
                    </View>
                    <View style={{height:h*.12,width:w,alignItems:'center'}}>
                        <Text style={{flex:1,fontSize:normalize(30),fontWeight:'bold'}}>Corona Virus Cases</Text>
                        {/*<Text style={{fontSize:normalize(15),color:this.state.todayCases==0?'green':'red'}}>(Today +{this.state.todayCases})</Text>*/}
                        <Text style={{flex:1,fontSize:normalize(25),fontWeight:'bold'}}>{this.state.CountryCase}</Text>
                    </View>
                    <View style={{height:h*.12,width:w,alignItems:'center'}}>
                        <Text style={{flex:1,fontSize:normalize(30),fontWeight:'bold'}}>Death</Text>
                        <Text style={{flex:1,fontSize:normalize(25),fontWeight:'bold',color:'red'}}>{this.state.CoutryDeath}</Text>
                    </View>
                    <View style={{height:h*.12,width:w,alignItems:'center'}}>
                        <Text style={{flex:1,fontSize:normalize(30),fontWeight:'bold'}}>Recovered</Text>
                        <Text style={{flex:1,fontSize:normalize(25),fontWeight:'bold',color:'green'}}>{this.state.dailyRecoverCases}</Text>
                    </View>
                </View>

                <View style={{height:h*.50,width:w,padding:1}}>
                    <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center'}}>Graph for Daily Progress<Text style={{fontSize:normalize(15)}}>(Swipe right)</Text></Text>
                    <ScrollView horizontal={true}>
                        {this.state.chatFlag==true?this.displayChat():console.log("kljl")}
                    </ScrollView>
                </View>

                <View style={{height:h*0.80,width:w,}}>
                    <Text style={{fontSize:20,fontWeight:'bold',marginTop:h*.01}}>Map</Text>
                    <ScrollView style={{flex:1}}>
                       <MapView
                            // provider={PROVIDER_GOOGLE}
                            style={{ height:h*0.80,width:w }}
                            initialRegion={{
                                latitude: 20.593683,
                                longitude: 78.962883,
                                latitudeDelta: 23,
                                longitudeDelta: 25,
                            }}
                        >
                            {
                            }
                            {
                                this.state.stateWiseCaseForMap && this.state.stateWiseCaseForMap.map((item) => {
                                        // if (item.stateName === 'Punjab') {
                                        return (
                                            <Marker
                                                key={item.stateName}
                                                coordinate={item.coo}
                                                // title={item.stateName}
                                                // description={'Total cases:' + item.confirm + '\n today:' + item.today}
                                            >
                                                {this._callOut(item)}
                                            </Marker>
                                        )
                                        // }
                                    }
                                )
                            }

                        </MapView>
                    </ScrollView>
                </View>
                <View style={{height:h*0.70,alignItems:'center',justifyContent:'center',padding:10}}>
                    <Text style={{fontSize:normalize(20),fontWeight:'bold',marginTop:h*.01}}>State Wise Data<Text style={{fontSize:normalize(15)}}>  (select state for more detail)</Text></Text>
                    <ScrollView nestedScrollEnabled={true} style={{flex:1}}>
                        {this.state.stateDataFinal.map((data,index)=>{
                            return(
                                <View>
                                    <View key={index} style={{flex:4,height:40,backgroundColor:'white',marginTop:10,width:w-40,padding:10,alignItems:'center',flexDirection:'row',borderRadius:5}}>
                                        <TouchableOpacity style={{flex:1,flexDirection:'row'}} onPress={()=>this.displayStateData(data[0].stateName,data[0].confirmCases)}>
                                        <Text style={{fontSize:normalize(15),fontWeight:'bold',textAlign:'left',flex:8}}>{data[0].stateName}</Text>
                                        <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'flex-end',flex:2}}>{data[0].confirmCases}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={{height:h*.60,width:w-30,backgroundColor:'lightblue',alignSelf:'center',alignItems:'center',borderRadius:10}}>
                    <Text style={{fontSize:normalize(15),fontWeight:'bold',marginTop:10}}>Progress Day by Day</Text>
                    <ScrollView nestedScrollEnabled={true} style={{flex:1}}>
                        {this.state.dayArray.map((data,index)=>{
                            return(
                                <View>
                                    <View key={index} style={{flex:4,height:40,backgroundColor:'white',marginTop:h*.01,width:w-40,padding:10,alignItems:'center',flexDirection:'row',borderRadius:5}}>
                                        <Text style={{fontSize:normalize(16),fontWeight:'bold',textAlign:'left',flex:7}}>{data}</Text>
                                        <Text style={{fontSize:normalize(16),fontWeight:'bold',alignSelf:'flex-end',flex:3}}>{this.state.dailyCases[index]}  Cases</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>



                <View style={{height:h*.70,width:w-30,backgroundColor:'#ffffff',alignSelf:'center',alignItems:'center',borderRadius:10,marginTop:5}}>
                    <Text style={{fontSize:normalize(15),fontWeight:'bold',marginTop:10}}>Graph for daily Progress<Text style={{fontSize:normalize(10)}}>(Swipe right)</Text></Text>
                    <ScrollView horizontal={true} scrollEventThrottle={16}>

                        {this.state.dailyCases.slice(0).reverse().map((data,index)=>{
                            return(
                                <View>
                                    <View style={{flex:9,width:50,marginLeft:13,alignItems:'flex-end',flexDirection:'row-reverse',justifyContent:'center'}}>
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
                                                    height:data==this.state.maxDaiyProgress?"95%": Math.ceil(data * 100 / this.state.maxDaiyProgress) + "%",
                                                    width: w*.13,
                                                    backgroundColor: 'lightblue',
                                                    borderRadius: 2
                                                }}>
                                                </View>
                                            </View>

                                        }
                                    </View>
                                    <View style={{flex:1,width:50,marginLeft:w*0.01,alignItems:'center',marginTop:5,}}>
                                        <Text style={{alignSelf:'center',fontWeight:'bold'}}>{this.state.dayArray[this.state.dayArray.length-1-index]}</Text>
                                    </View>
                                </View>
                            )
                        })
                        }

                        {/*{this.state.dayArray.map((data,index)=>{*/}
                        {/*    return(*/}
                        {/*        <View>*/}
                        {/*            <View style={{flex:9,width:50,marginLeft:13,alignItems:'flex-end',flexDirection:'row-reverse',justifyContent:'center'}}>*/}

                        {/*                {this.state.dailyCases[index] == 0 ? <Text style={{*/}
                        {/*                        fontWeight: 'bold',*/}
                        {/*                        color: 'grey',*/}
                        {/*                    }}>{0}</Text> :*/}
                        {/*                    <View>*/}
                        {/*                        <Text style={{*/}
                        {/*                            alignSelf: 'center',*/}
                        {/*                            fontWeight: 'bold',*/}
                        {/*                            color: 'grey'*/}
                        {/*                        }}>{this.state.dailyCases[index]}</Text>*/}
                        {/*                        <View key={index} style={{*/}
                        {/*                            height: this.state.dailyCases[index]==this.state.maxDaiyProgress?"95%":Math.ceil(this.state.dailyCases[index] * 100 / this.state.maxDaiyProgress) + "%",*/}
                        {/*                            width: w*.13,*/}
                        {/*                            backgroundColor: 'lightblue',*/}
                        {/*                            borderRadius: 2*/}
                        {/*                        }}>*/}
                        {/*                        </View>*/}
                        {/*                    </View>*/}

                        {/*                }*/}



                        {/*            </View>*/}
                        {/*            <View style={{flex:1,width:50,marginLeft:w*0.01,alignItems:'center',marginTop:5,}}>*/}
                        {/*                <Text style={{alignSelf:'center',fontWeight:'bold'}}>{data}</Text>*/}
                        {/*            </View>*/}
                        {/*        </View>*/}
                        {/*    )*/}
                        {/*})*/}
                        {/*}*/}
                   </ScrollView>
                </View>


               <View style={{height:h*.70,width:w-30,backgroundColor:'lavender',alignSelf:'center',alignItems:'center',borderRadius:10,marginTop:5}}>
                    <Text style={{fontSize:normalize(15),fontWeight:'bold',marginTop:10}}>Daily new Cases<Text style={{fontSize:normalize(10)}}>(Swipe right)</Text></Text>
                    <ScrollView horizontal={true}>



                        {this.state.dailyGetCase.slice(0).reverse().map((data,index)=>{
                            return(
                                <View>
                                    <View style={{flex:9,width:50,marginLeft:13,alignItems:'flex-end',flexDirection:'row-reverse',justifyContent:'center'}}>
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
                                                    height:data==this.state.maxDailyCases?"95%": Math.ceil(data * 100 / this.state.maxDailyCases) + "%",
                                                    width: w*.13,
                                                    backgroundColor: 'lightblue',
                                                    borderRadius: 2
                                                }}>
                                                </View>
                                            </View>

                                        }
                                    </View>
                                    <View style={{flex:1,width:50,marginLeft:w*0.01,alignItems:'center',marginTop:5,}}>
                                        <Text style={{alignSelf:'center',fontWeight:'bold'}}>{this.state.dayArray[this.state.dayArray.length-1-index]}</Text>
                                    </View>
                                </View>
                            )
                        })
                        }





                        {/*{this.state.dayArray.map((data,index)=>{*/}
                        {/*    return(*/}
                        {/*        <View>*/}
                        {/*            <View style={{flex:9,width:50,marginLeft:13,alignItems:'flex-end',flexDirection:'row-reverse',justifyContent:'center'}}>*/}

                        {/*                {this.state.dailyGetCase[index] == 0 ? <Text style={{*/}
                        {/*                        fontWeight: 'bold',*/}
                        {/*                        color: 'grey',*/}
                        {/*                    }}>{0}</Text> :*/}
                        {/*                    <View>*/}
                        {/*                        <Text style={{*/}
                        {/*                            alignSelf: 'center',*/}
                        {/*                            fontWeight: 'bold',*/}
                        {/*                            color: 'grey'*/}
                        {/*                        }}>{this.state.dailyGetCase[index]}</Text>*/}
                        {/*                        <View key={index} style={{*/}
                        {/*                            height: this.state.dailyGetCase[index]==this.state.maxDailyCases?"95%":Math.ceil(this.state.dailyGetCase[index] * 100 / this.state.maxDailyCases) + "%",*/}
                        {/*                            width: w*.13,*/}
                        {/*                            backgroundColor: 'lightblue',*/}
                        {/*                            borderRadius: 2*/}
                        {/*                        }}>*/}
                        {/*                        </View>*/}
                        {/*                    </View>*/}

                        {/*                }*/}


                        {/*            </View>*/}
                        {/*            <View style={{flex:1,width:50,marginLeft:w*0.01,alignItems:'center',marginTop:5,}}>*/}
                        {/*                <Text style={{alignSelf:'center',fontWeight:'bold'}}>{data}</Text>*/}
                        {/*            </View>*/}
                        {/*        </View>*/}
                        {/*    )*/}
                        {/*})*/}
                        {/*}*/}
                    </ScrollView>
                </View>

                <View style={{height:h*.70,width:w-30,backgroundColor:'white',alignSelf:'center',alignItems:'center',borderRadius:10,marginTop:5}}>
                    <Text style={{fontSize:15,fontWeight:'bold',marginTop:10}}>Daily Recovered Cases<Text style={{fontSize:normalize(10)}}>(Swipe right)</Text></Text>
                    <ScrollView horizontal={true}>
                        {this.state.dailyRecoverCases2.slice(0).reverse().map((data,index)=>{
                            return(
                                <View>
                                    <View style={{flex:9,width:50,marginLeft:13,alignItems:'flex-end',flexDirection:'row-reverse',justifyContent:'center'}}>
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
                                                    height:data==this.state.maxDailyReovered?"95%": Math.ceil(data * 100 / this.state.maxDailyReovered) + "%",
                                                    width: w*.13,
                                                    backgroundColor: 'lightblue',
                                                    borderRadius: 2
                                                }}>
                                                </View>
                                            </View>

                                        }
                                    </View>
                                    <View style={{flex:1,width:50,marginLeft:w*0.01,alignItems:'center',marginTop:5,}}>
                                        <Text style={{alignSelf:'center',fontWeight:'bold'}}>{this.state.dayArray[this.state.dayArray.length-1-index]}</Text>
                                    </View>
                                </View>
                            )
                        })
                        }

                    </ScrollView>
                    {
                        this.state.modelVisible &&

                    <Modal visible={true} animated={true} transparent={false}>
                        <SafeAreaView style={{flex:1}}>
                            <TouchableOpacity style={{padding:13}} onPress={()=>this.setState({modelVisible:false})}><Icon name='closecircleo' size={35} color={'green'}/></TouchableOpacity>
                        <View style={{flex:1,}}>
                            <View style={{height:h*.35,alignItems:'center',padding:10,justifyContent:'center'}}>
                                <Text style={{marginTop:10,fontSize:normalize(40),fontWeight:'bold',color:'lightblue'}}>{this.state.stateNameDetail}</Text>
                                <Text style={{marginTop:10,fontSize:normalize(30),fontWeight:'bold',}}>Total Cases</Text>
                                <Text style={{marginTop:15,fontSize:normalize(30),fontWeight:'bold',color:'red'}}>{this.state.districtTotalCase}</Text>
                            </View>
                            <View style={{flex:4,backgroundColor:'lightblue',alignItems:'center',justifyContent:'center'}}>
                                <ScrollView style={{flex:1}}>
                                {
                                    this.state.districtCases.map((data,index)=>{
                                        return(
                                            <View key={index} style={{height:h*.07,width:w-20,padding:10,backgroundColor:'white',marginTop:10,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                    <Text style={{flex:3,fontSize:normalize(16),fontWeight:'bold'}}>{this.state.districtName[index]}</Text>
                                                    <Text style={{flex:1,textAlign:'right',fontSize:normalize(17),fontWeight:'bold',color:'red'}}>{data}</Text>
                                            </View>
                                        )
                                    })
                                }
                                </ScrollView>
                            </View>
                        </View>
                        </SafeAreaView>
                    </Modal>
                    }
                    { this.state.renderFlag &&
                    <Modal visible={true} animated={false} transparent={true}>
                        <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="grey" animating={this.state.renderFlag}  />
                        </SafeAreaView>
                    </Modal>
                    }
                </View>
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



