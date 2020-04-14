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
import AppHeader from './appHeader';

import NetInfo from "@react-native-community/netinfo";

const scale = w / 375;

const normalize = size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
let City=[];
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
        let tempTodayCases=0;
        tempTodayCases=parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1])
        this.setState({todayCases:tempTodayCases})
        console.log("---data")
        console.log(parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1]))
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
            let tempTodayCases=0;
            tempTodayCases=parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1])
            this.setState({todayCases:tempTodayCases})
        },300000)

    }
    render(){


    return(

        <View style={{flex:1,}}>
            <AppHeader title={'Corona Meter(World)'} onPress={()=>this.props.navigation.openDrawer()}/>
            <ScrollView style={{flex:1,padding:10}}>
                <View style={{height:h*.40,}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:h*0.20,}}>

                        <View style={{width:w*.30,height:h*.15,backgroundColor:'#FFE0E6',padding:h*.010,borderRadius:h*.010,justifyContent:'center'}}>
                            <Text style={{fontSize:normalize(12),fontWeight:'bold',alignSelf:'center',color:'red'}}>Today {parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1])?parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1]):'...'}</Text>
                            <Text style={{fontSize:normalize(20),marginTop:1,fontWeight:'bold',color:'red',alignSelf:'center'}}>{this.state.WorldCase?this.state.WorldCase:'Counting..'}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Confirmed</Text>
                        </View>

                        <View style={{width:w*.30,height:h*.15,backgroundColor:'#E4F4E7',padding:h*.010,borderRadius:h*.010,marginLeft:h*.010,justifyContent:'center'}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'green'}}>{this.state.recoverCasesPer?this.state.recoverCasesPer:'Counting..'}%</Text>
                            <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center',color:'green'}}>{this.state.recoverCases?this.state.recoverCases:'Counting'}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Recovered</Text>
                        </View>
                        <View style={{width:w*.30,height:h*.15,backgroundColor:'#faffc1',padding:h*.010,borderRadius:h*.010,marginLeft:h*.010,justifyContent:'center'}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'red'}}>{this.state.seriousCasesPer?this.state.seriousCasesPer+'%':'Counting..'}</Text>
                            <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center',color:'orange'}}>{this.state.seriousCases?this.state.seriousCases:'Counting..'}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Serious Cases</Text>
                        </View>

                    </View>
                    <View style={{flex:1,flexDirection:'row',height:h*0.20}}>
                        <View style={{flex:1,height:h*.15,backgroundColor:'#d1ffb1',padding:h*.010,borderRadius:h*.010,marginLeft:h*.010,justifyContent:'center'}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'#4bf462'}}>{this.state.mildCasePer?this.state.mildCasePer+'%':'Counting..'}</Text>
                            <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center',color:'#16f485'}}>{this.state.mildCase?this.state.mildCase:'Counting..'}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Mild Cases</Text>
                        </View>
                        <View style={{flex:1,height:h*.15,backgroundColor:'#ffd5ac',padding:h*.010,borderRadius:h*.010,marginLeft:h*.010,justifyContent:'center'}}>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',color:'red'}}>{(parseInt(this.state.WorldDeath.replace(/[^0-9]/g,''))*100/parseInt(this.state.WorldCase.replace(/[^0-9]/g,'')))?(parseInt(this.state.WorldDeath.replace(/[^0-9]/g,''))*100/parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))).toString().substring(0,4)+"%":'Counting...'}</Text>
                            <Text style={{fontSize:normalize(20),fontWeight:'bold',alignSelf:'center',color:'red'}}>{this.state.WorldDeath?this.state.WorldDeath:'Counting..'}</Text>
                            <Text style={{fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',}}>Death</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1.5,alignItems:'center',borderRadius:10,backgroundColor:'#ECEDEE'}}>
                    <Text style={{fontSize:normalize(20),fontWeight:'bold'}}>Date Wise Cases(World)</Text>
                            <ScrollView style={{flex:1}}>
                               {
                                    this.state.dateWiesCasesArray.slice(0).reverse().map((data,index)=>{
                                        return(
                                            <View style={{height:h*.10,width:w-50, backgroundColor:index%2==1 ?'#dedfe0':'white',marginTop:h*.01,borderRadius:10,padding:h*.01,flexDirection:'row'}}>
                                                <View style={{flex:4,justifyContent:'center'}}>
                                                    <Text style={{fontSize:normalize(15),fontWeight:'bold',}}>{this.state.dateArray[this.state.dateWiesCasesArray.length-1-index]}</Text>
                                                    <Text style={{fontSize:normalize(17),fontWeight:'bold',color:'red',}}>{data} Cases</Text>
                                                </View>
                                                <View style={{flex:1}}>
                                                    {index>0 &&
                                                    <Icon style={{alignSelf:'flex-end'}} name={'arrowup'} size={20} color={'red'}/>
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



