import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    RefreshControl,
    PixelRatio, Image,
    ImageBackground
} from 'react-native';
let h=Dimensions.get('window').height;
let w=Dimensions.get('window').width;
import axios from 'axios';
import AppHeader from './appHeader';
import NetInfo from "@react-native-community/netinfo";

const scale = w / 375;
import {screenWidth,screenHeight,color} from '../Helper/themeHelper'

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
            refreshing:false,



        }
    }
    // showDetials=(cases,index)=>{
    //     this.setState({selectedCity:City[index]})
    //     this.setState({cityCases:cases})
    //
    //
    // }
    // getCountryData=()=>{
    //     return new Promise((resolve=>{
    //         axios.post("https://covidapi123.herokuapp.com/covid/api/getCurrentCasesIndia")
    //             .then((res)=>{
    //                 // console.log(res.data)
    //                 return resolve(res);
    //             });
    //     }))
    // }

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


    initilization=()=>{
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

        this.getWorldData().then((res)=>{
            let str=res.data
            let Cases=str.substring(str.indexOf(":")+2,str.indexOf("Cases"))
            let Death=str.substring(str.indexOf("and")+4,str.indexOf("Deaths"))
            this.setState({WorldCase:Cases,WorldDeath:Death});
        })
        let tempTodayCases=0;
        tempTodayCases=parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1])
        this.setState({todayCases:tempTodayCases})
        setInterval(()=>{
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
    componentDidMount() {
        this.initilization()
    }
    render(){
        const {
            headerFirstRow,
            smallColumn,
            bigColumn,
            titleForColumn,
            valueForColumn,
            upperLabel,
            secondRow,
            listViews,
            listDay,
            listCase,
            headerSecondRow
        } = style;

    return(

        <View style={{flex:1,}}>
            <AppHeader title={'Corona Meter(World)'} onPress={()=>this.props.navigation.openDrawer()}/>
            <ScrollView style={{flex:1,padding:10}}
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.initilization()}/>}
            >
                <ImageBackground
                    source={require('../Images/assets/screen_bg.png')}
                    style={{width: null, height: null,flex:1}}>


                <View style={{height:screenHeight*.40,width:w-35,alignSelf:'center',}}>
                    <View style={{height:screenHeight*.20,flexDirection:'row',padding:screenHeight*0.010}}>
                        <View style={{flex:1,backgroundColor:'#b2c8f4'}}>
                            <View style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../Images/assets/covid_4.png')} style={{height:screenHeight*.04,width:screenHeight*.04}} />
                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                                <Text style={[valueForColumn,{color:'gray'}]}>{this.state.mildCase?this.state.mildCase:'Counting..'}</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={titleForColumn}>MILD CASES</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(59,59,59,0.25)'}}>
                                <Text style={[upperLabel,{color:'white'}]}>{this.state.mildCasePer?this.state.mildCasePer+'%':'Counting..'}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,backgroundColor:'#f5e9dd',marginLeft: screenHeight*.010}}>
                            <View style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../Images/assets/covid_4.png')} style={{height:screenHeight*.04,width:screenHeight*.04}} />
                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                                <Text style={[valueForColumn,{color:'gray'}]}>{this.state.recoverCases?this.state.recoverCases:'Counting'}</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={titleForColumn}>RECOVERED</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(59,59,59,0.25)'}}>
                                <Text style={[upperLabel,{color:'white'}]}>{this.state.recoverCasesPer?this.state.recoverCasesPer:'Counting..'}%</Text>
                            </View>
                        </View>
                        <View style={{flex:1,backgroundColor:'#f1bdb8',marginLeft: screenHeight*.010}}>
                            <View style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../Images/assets/covid_4.png')} style={{height:screenHeight*.04,width:screenHeight*.04}} />
                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                                <Text style={[valueForColumn,{color:'gray'}]}>{this.state.seriousCases?this.state.seriousCases:'Counting..'}</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={titleForColumn}>SERIOUS CASES</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(59,59,59,0.25)'}}>
                                <Text style={[upperLabel,{color:'white'}]}>{this.state.seriousCasesPer?this.state.seriousCasesPer+'%':'Counting..'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:screenHeight*.20,padding:screenHeight*0.010,flexDirection:'row'}}>
                        <View style={{flex:1,backgroundColor:'#f6c778'}}>

                            <View style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../Images/assets/covid_4.png')} style={{height:screenHeight*.04,width:screenHeight*.04}} />
                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                                <Text style={[valueForColumn,{color:'gray'}]}>{this.state.WorldCase?this.state.WorldCase:'Counting..'}</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={titleForColumn}>CONFIRMED</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(59,59,59,0.25)'}}>
                                <Text style={[upperLabel,{color:'white'}]}>Today +{parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1])?parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))-parseInt(this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length-1]):'Conting..'}</Text>
                            </View>

                        </View>
                        <View style={{flex:1,backgroundColor:'#b6c8c4',marginLeft:screenHeight*.010 }}>
                            <View style={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../Images/assets/covid_4.png')} style={{height:screenHeight*.04,width:screenHeight*.04}} />
                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                                <Text style={[valueForColumn,{color:'gray'}]}>{this.state.WorldDeath?this.state.WorldDeath:'Counting..'}</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={titleForColumn}>DEATH</Text>

                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(59,59,59,0.25)'}}>
                                <Text style={[upperLabel,{color:'white'}]}>{(parseInt(this.state.WorldDeath.replace(/[^0-9]/g,''))*100/parseInt(this.state.WorldCase.replace(/[^0-9]/g,'')))?(parseInt(this.state.WorldDeath.replace(/[^0-9]/g,''))*100/parseInt(this.state.WorldCase.replace(/[^0-9]/g,''))).toString().substring(0,4)+"%":'Counting...'}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{height:screenHeight*0.04,marginTop:screenHeight*0.03,width:screenWidth,marginLeft:-10,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:normalize(15)}}>Date Wise Cases</Text>
                </View>
                <View style={{height:screenHeight*0.40,marginTop:screenHeight*0.05,width:screenWidth-30,alignSelf:'center',}}>
                    <View style={{height:screenHeight*0.05,backgroundColor:color.purple,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'bold',fontSize:normalize(15)}}>Daily Cases</Text>
                    </View>

                    <View style={{height:screenHeight*0.35}}>
                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{flex:1}}>
                            {
                                this.state.dateWiesCasesArray.slice(0).reverse().map((data,index)=>{
                                    return(
                                        <View style={{height:screenHeight*0.05,backgroundColor:index%2==1 ?'white':'#dedfe0',flexDirection:'row'}}>
                                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                                <Text style={listDay}>{this.state.dateArray[this.state.dateWiesCasesArray.length-1-index]}</Text>
                                            </View>
                                            <View style={{flex:3,alignItems:'center',justifyContent:'center'}}>
                                                <Text style={listCase}>{data} Cases</Text>
                                            </View>
                                            <View style={{flex:1,padding:screenHeight*0.010}}>
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
                </View>
                </ImageBackground>

            </ScrollView>
        </View>
    )

    }
}
const style=StyleSheet.create({
    headerFirstRow:{
        flexDirection:'row',alignItems:'center',justifyContent:'center',height:h*0.20,
    },
    smallColumn:{
        width:w*.30,height:h*.15,padding:h*.010,borderRadius:h*.010,justifyContent:'center'
    },
    bigColumn:{
        flex:1,height:h*.15,backgroundColor:'#d1ffb1',padding:h*.010,borderRadius:h*.010,marginLeft:h*.010,justifyContent:'center'
    },
    titleForColumn:{
        fontSize:normalize(10),fontWeight:'bold',alignSelf:'center',color:'gray'

    },
    valueForColumn:{
        fontSize:normalize(20),marginTop:1,fontWeight:'bold',alignSelf:'center'
    },
    upperLabel:{
        fontSize:normalize(15),fontWeight:'bold',alignSelf:'center',

    },
    secondRow:{
        flex:1.5,alignItems:'center',borderRadius:10,backgroundColor:'#ECEDEE'
    },
    listViews:{
        height:h*.10,width:w-50,marginTop:h*.01,borderRadius:10,padding:h*.01,flexDirection:'row'
    },
    listDay:{
        fontSize:normalize(13),fontWeight:'bold',
    },
    listCase:{
        fontSize:normalize(15),fontWeight:'bold',color:'black',
    },
    headerSecondRow:{
        flex:1,flexDirection:'row',height:h*0.20
    }


})



