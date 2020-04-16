import React from 'react';
import AppHeader from '../Component/appHeader'
import NetInfo from "@react-native-community/netinfo";
import LiveCoverage from '../Component/liveCoverage'
import {
    View,
    Text,
    Platform,
    RefreshControl,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Dimensions,
    Image,
    PixelRatio,

} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import axios from 'axios';
import {connect} from 'react-redux'
import {setDays,setDailyDeath,setDailyProgress,setDailyRecovered,setDailyCases,setScaleForGraph,setStateData,setLineChartData} from '../Actions/getLoginAction'
import indianFlag from '../Images/inidanFlag.png';
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

class rnFethcDemo extends React.Component{
    constructor(props) {
        super(props);
        this.data = [];
        this.states = [];
        this.cities = [];
        this.state={
            deceasedData: [],
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
            todayCases:0,
            stateApiResponse:[],
            internetFlag:true,
            refreshing:false,
            todayRecoveredPatient:0,
            dailyDeathArray:[],
            todayDeath:0
        }
    }
    // fetchCities = async () => {
    //     try {
    //         const [
    //             response,
    //         ] = await Promise.all([
    //             axios.get('https://api.covid19india.org/data.json'),
    //             axios.get('https://api.covid19india.org/state_district_wise.json'),
    //             axios.get('https://api.covid19india.org/updatelog/log.json'),
    //         ]);
    //         this.citiesLatLog(response.data.statewise)
    //     } catch (err) {
    //         console.log(err);
    //
    //     }
    //
    // }



    citiesLatLog = (citiesData) => {
        let x;
        let arr = [];
        for (x in citiesData) {
            let data;
            if (x != '0') {
                let stateName = citiesData[x].state.split(/\s/).join('');
                if (coodinaties && citiesData[x].confirmed>0) {
                    data = {
                        stateName: citiesData[x].state,
                        confirm: citiesData[x].confirmed,
                        recovered: citiesData[x].recovered,
                        deaths: citiesData[x].deaths,
                        tconfirm: citiesData[x].deltaconfirmed,
                        trecovered: citiesData[x].deltarecovered,
                        tdeaths: citiesData[x].deltadeaths,
                        update: citiesData[x].lastupdatedtime,
                        active:citiesData[x].active,

                    }
                    arr.push(data)
                } else {
                    // console.log(citiesData[x].state)
                }
            }

        }
        // this.setState({stateWiseCaseForMap:arr})

    }


    // getStateData=()=>{
    //     return new Promise((resolve=>{
    //         axios.post("https://www.mohfw.gov.in/")
    //             .then((res)=>{
    //                 return resolve(res);
    //             });
    //     }))
    //
    // }
    getDemo=()=>{
        return new Promise((resolve=>{
            axios.post("https://www.worldometers.info/coronavirus/country/india/")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                })

        }))
    }





    intialixation=()=>{
        // this.fetchCities()


        this.fetchStates()
        this.getCountryData1().then((res)=>{
            let str=res.data
            let IndiaCase=str.substring(str.indexOf(':')+1,str.indexOf('Cases'))
            this.setState({CountryCase:IndiaCase})
            let IndiaDeath=str.substring(str.indexOf('and')+4,str.indexOf('Deaths'))
            this.setState({CoutryDeath:IndiaDeath})
        })
        // this.getCountryData().then((res)=>{
        //     let tempState=[];
        //     let tempStateCase=[];
        //     res.data.map((data)=>{
        //         tempState.push(data.stateName)
        //         tempStateCase.push(data.case)
        //     })
        //     this.setState({stateName:tempState,stateCases:tempStateCase})
        // })
        this.getDemo().then((res)=>{
            let str=res.data

            let tempDeath=str.substring(str.indexOf('series: [{\n' +
                '                name: \'Deaths\',\n' +
                '                color: \'#FF9900\',\n' +
                '                lineWidth: 5,\n' +
                '                data: '),str.length)

            tempDeath=tempDeath.substring(tempDeath.indexOf('data: ')+7,tempDeath.indexOf(']'))
            tempDeath=tempDeath.split(",")
            this.setState({dailyDeathArray:tempDeath})
            this.props.setDailyDeath(this.state.dailyDeathArray)

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
            let tempDayActiveCases=[]
            daysOfActiveCase.map((data)=>{
                tempDayActiveCases.push(data.substring(1,7))
            })
            this.setState({dayArray:tempDayActiveCases})
            if(this.state.dayArray) {
                let tempTodayRecovered=0;
                this.state.dailyRecoverCases2.map((data)=>{
                    tempTodayRecovered=parseInt(data)+tempTodayRecovered
                })

                this.setState({todayDeath:parseInt(this.state.CoutryDeath)-parseInt(this.state.dailyDeathArray[this.state.dailyDeathArray.length-1])})

                this.setState({todayRecoveredPatient:tempTodayRecovered})
                this.props.setDays(this.state.dayArray)
                this.props.setProgress(this.state.dailyCases)
                this.props.setDailyCases(this.state.dailyGetCase)
                this.props.setRecovered(this.state.dailyRecoverCases2)
                this.props.setScaleForGraph({
                    maxDailyCases: Math.max.apply(null, dailyTempCases),
                    maxDailyReovered: Math.max.apply(null, recoverCases),
                    maxDailyProgress: Math.max.apply(null, activeCases),

                })
            }
            let tempDailyCases=this.state.dailyCases
            this.setState({chartData:{labels:tempDayActiveCases,datasets:[{data:tempDailyCases}]}})
            this.props.setLineChartData(this.state.chartData)
            this.setState({todayCases:parseInt(this.state.CountryCase.replace(/[^0-9]/g,''))-parseInt(this.state.dailyCases[this.state.dailyCases.length-1])})

        })



        // this.getStateData().then((res)=>{
        //     let responseData=res.data;
        //     let responseData1=''
        //     let tempStateArray=[]
        //     let tempFinalStateArray=[]
        //     let tempFinalStateArray1=[]
        //     StateArray.map((stateName)=>{
        //         responseData1=responseData.substring(responseData.indexOf(stateName),responseData.length)
        //         responseData1=responseData1.substring(responseData1.indexOf(stateName),responseData1.indexOf('</tr>\n'))
        //         tempStateArray.push(responseData1)
        //     })
        //     var num=[];
        //     let j=0;
        //
        //     tempStateArray.map((data,index)=>{
        //
        //         for(let i=0;i<tempStateArray[index].split("\n").length;i++)
        //         {
        //             if(i!==0)
        //             {
        //                 num[i]=tempStateArray[index].split("\n")[i].replace(/[^0-9]/g,'')
        //             }
        //             else
        //             {
        //                 num[i]=tempStateArray[index].split("\n")[i].substring(0,tempStateArray[index].split("\n")[i].length-5);
        //             }
        //         }
        //
        //         for(let j=0;j<num.length-1;j++)
        //         {
        //             tempFinalStateArray=[{"stateName":num[0],"confirmCases":num[1],"cured":num[2],"death":num[3]}]
        //         }
        //         tempFinalStateArray1.push(tempFinalStateArray)
        //     })
        //     this.setState({stateDataFinal:tempFinalStateArray1})
        //     console.log(this.state.dailyCases)
        //     console.log(this.state.CountryCase)
        // })
    }

    checkConnectivity=()=>{
        if (Platform.OS === "android") {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    return true
                } else {
                    return false
                }
            });
        }
        else
        {
            NetInfo.isConnected.addEventListener(
                "connectionChange",
                this.handleFirstConnectivityChange
            );
        }
    }
    handleFirstConnectivityChange = isConnected => {
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
        );

        if (isConnected === false) {
            return false
        } else {
            return true
        }
    };
    componentDidMount() {
        if(this.checkConnectivity) {
            this.setState({internetFlag: false})
            this.intialixation()
        }
        else{
            this.setState({internetFlag: true})
            console.log("please connect to internetss")
        }
       setInterval(()=>{
           if(this.checkConnectivity) {
               this.setState({internetFlag: false})
               this.intialixation()
           }
           else{
               alert("please connect to internet for more updates")
           }
        },300000)
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


     fetchStates = async () => {
        try {
            const [
                response,
            ] = await Promise.all([
                axios.get('https://api.covid19india.org/data.json'),
                axios.get('https://api.covid19india.org/state_district_wise.json'),
                axios.get('https://api.covid19india.org/updatelog/log.json'),
            ]);

            let j,i;
            let tempCases=[];

            for(i=1;i<response.data.statewise.length;i++)
            {
                for(j=1;j<response.data.statewise.length-i-1;j++)
                {
                    if(parseInt(response.data.statewise[j].confirmed)<parseInt(response.data.statewise[j+1].confirmed)){
                        let temp=response.data.statewise[j];
                        response.data.statewise[j]=response.data.statewise[j+1]
                        response.data.statewise[j+1]=temp;
                    }
                }

            }

            this.setState({stateApiResponse:response.data.statewise})
            this.props.setStateData(this.state.stateApiResponse);

        } catch (err) {
            console.log(err);
        }
    };


    getStateInformationForCase=()=>{
        return new Promise((resolve=>{
            axios.get("https://api.covid19india.org/state_district_wise.json")
                .then((res)=>{
                    // console.log(res.data)
                    return resolve(res);
                });
        }))

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

    refreshDemo=()=>{
        this.intialixation()

    }

    render(){
        const {logoView,
            logoTitle,
            coronaVirusCases,
            totalCases,
            headerPartition,
            liveCoverageView,
            stateWiseView,
            stateHeaderTitle,
            stateListView,
            stateName,
            stateCases,
            progressView,
            progressTitle,
            progressList,
            progressDay,
            progresCases,
            modalForLoader,
            modalForNetIssue,

        } = style;
    return(

        <View style={{alignItems:'center',flex:1}}>
            <SafeAreaView style={{flex:0,}}/>
            <AppHeader title={'Corona Meter(India)'} onPress={()=>this.props.navigation.openDrawer()}/>

            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.refreshDemo()}/>
            }>
                <View style={{height:h*.60,width:w,}}>
                    <View style={logoView}>
                        <Image source={indianFlag} style={{height:h*0.10,width:w*.25}}/>
                        <Text style={logoTitle}>India</Text>
                    </View>
                    <View style={headerPartition}>
                        <Text style={coronaVirusCases}>Coronavirus Cases</Text>
                        <Text style={totalCases}>{this.state.CountryCase?this.state.CountryCase:'Counting..'}{parseInt(this.state.todayCases)>0&& <Text style={{fontSize:normalize(15),color:this.state.todayCases==0?'green':'red'}}>(Today +{this.state.todayCases?this.state.todayCases:'Counting..'})</Text>}</Text>
                    </View>
                    <View style={headerPartition}>
                        <Text style={coronaVirusCases}>Death</Text>
                        <Text style={[totalCases,{color:'red'}]}>{this.state.CoutryDeath?this.state.CoutryDeath:'Counting..'}<Text style={{fontSize:normalize(13)}}>( {this.state.dailyDeathArray && this.state.CoutryDeath?'+':''} <Text>{this.state.dailyDeathArray && this.state.CoutryDeath?parseInt(this.state.CoutryDeath)-parseInt(this.state.dailyDeathArray[this.state.dailyDeathArray.length-1]):'..'}</Text> )</Text></Text>
                    </View>
                    <View style={headerPartition}>
                        <Text style={coronaVirusCases}>Recovered</Text>
                        <Text style={[totalCases,{color:'green'}]}>{this.state.dailyRecoverCases.length>0?this.state.dailyRecoverCases:'Counting..'}<Text style={{fontSize:normalize(15)}}><Text>( {this.state.todayRecoveredPatient?'+':''} {this.state.todayRecoveredPatient?parseInt(this.state.dailyRecoverCases.replace(/[^0-9]/g,''))-parseInt(this.state.todayRecoveredPatient):'..'}</Text>)</Text></Text>
                    </View>
                </View>
                <View style={liveCoverageView}>
                    <LiveCoverage/>
                </View>


                <View style={stateWiseView}>
                    <View style={{height:h*0.08}}>
                    <Text style={stateHeaderTitle}>State Wise Data<Text style={{fontSize:normalize(15)}}>  (select state for more detail)</Text></Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{flex:1}}>
                        {this.state.stateApiResponse.map((data,index)=>{
                            return(
                                <View>
                                    {(data.state !== 'Total' && data.confirmed!=0) &&
                                    <View key={index} style={[stateListView,{backgroundColor:index%2==1 ?'#ECEDEE':'white',}]}

                                    >
                                        <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}
                                                          onPress={() => this.props.navigation.navigate('StateInfo', {
                                                             data,

                                                          })}>
                                            <Text style={stateName}>{data.state}</Text>
                                            <Text style={stateCases}>{data.confirmed}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    }
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={progressView}>
                    <Text style={progressTitle}>Progress Day by Day</Text>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{flex:1,marginTop:h*.015}}>
                        {this.state.dayArray.slice(0).reverse().map((data,index)=>{
                            return(
                                <View>
                                    <View key={index} style={[progressList,{backgroundColor:index%2==1 ?'#ECEDEE':'white',}]}>
                                        <Text style={progressDay}>{data}</Text>
                                        <Text style={progresCases}>{this.state.dailyCases[this.state.dailyCases.length-1-index]}  Cases</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>

                    { this.state.renderFlag &&
                    <Modal visible={true} animated={false} transparent={true}>
                        <SafeAreaView style={modalForLoader}>
                            <ActivityIndicator size="large" color="black" animating={this.state.renderFlag}  />
                        </SafeAreaView>
                    </Modal>
                    }


                { this.state.internetFlag &&
                <Modal visible={true} animated={false} transparent={false}>
                    <SafeAreaView style={modalForNetIssue}>
                        <Text>Opps! Please connect to network connect</Text>
                        <TouchableOpacity onPress={()=>this.componentDidMount()}><Text>Click Here To Reload Page</Text></TouchableOpacity>
                    </SafeAreaView>
                </Modal>
                }


            </ScrollView>
        </View>

    )
    }
}
const style=StyleSheet.create({
    logoView:{
        height:h*.15,width:w,flexDirection:'row',alignItems:'center',justifyContent:'center'
    },
    logoTitle:{
        fontSize:normalize(20),fontWeight:'bold',textAlign:'center',marginTop:h*0.02,marginLeft:w*0.02
    },
    coronaVirusCases:{
        flex:1,fontSize:normalize(30),fontWeight:'bold'
    },
    totalCases:{
        flex:1,fontSize:normalize(25),fontWeight:'bold',color:'red'
    },
    headerPartition:{
        height:h*.15,width:w,alignItems:'center'
    },
    liveCoverageView:{
        height:h*.60,width:w,marginTop:-(h*.020)
    },
    stateWiseView:{
        height:h*0.70,alignItems:'center',justifyContent:'center',padding:10
    },
    stateHeaderTitle:{
        fontSize:normalize(20),fontWeight:'bold',marginTop:h*.01
    },
    stateListView:{
        flex: 4,
        height: 40,
        marginTop: h * 0.012,
        width: w - 40,
        padding: w * 0.01,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5
    },
    stateName:{
        fontSize: normalize(15),
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 7
    },
    stateCase:{
        fontSize: normalize(15),
        fontWeight: 'bold',
        textAlign:'right',
        flex: 3
    },
    progressView:{
        height:h*.70,width:w-30,backgroundColor:'#d7d7d7',alignSelf:'center',alignItems:'center',borderRadius:10,marginTop:h*0.01,justifyContent:'center'
    },
    progressTitle:{
        fontSize:normalize(15),fontWeight:'bold',justifyContent:'center',alignSelf:'center'
    },
    progressList:{
        flex:4,height:h*.06,marginTop:h*.01,width:w-40,padding:10,alignItems:'center',flexDirection:'row',borderRadius:5
    },
    progressDay:{
        fontSize:normalize(16),fontWeight:'bold',textAlign:'left',flex:6
    },
    progresCases:{fontSize:normalize(16),fontWeight:'bold',flex:4,textAlign:'right'},

    modalForLoader: {
            flex:1,alignItems:'center',justifyContent:'center'
    },
    modalForNetIssue:{flex:1,alignItems:'center',justifyContent:'center'}
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
        setDailyCases:(data)=>setDailyCases(data),
        setScaleForGraph:(data)=>setScaleForGraph(data),
        setStateData:(data)=>setStateData(data),
        setLineChartData:(data)=>setLineChartData(data),
        setDailyDeath:(data)=>setDailyDeath(data)

    }
}

export default connect(mapSatateToProps,mapDispatchToProps())(rnFethcDemo)


