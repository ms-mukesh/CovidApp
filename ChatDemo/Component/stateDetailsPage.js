import React, { useEffect, useState,useRef } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import {
    Button,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    ImageBackground, Image
} from 'react-native';
const ws = Dimensions.get('window').width;
const hs = Dimensions.get('window').height;
import TopHeader from '../Component/headerForBack'
import {jsTypeToCppType} from 'react-native/ReactCommon/hermes/inspector/tools/msggen/src/Converters';
import axios from 'axios';
import {color, normalize, screenHeight} from '../Helper/themeHelper';

import icon1 from '../Images/assets/covid_1.png'
import icon2 from '../Images/assets/covid_2.png'
import icon3 from '../Images/assets/covid_3.png'
import icon4 from '../Images/assets/covid_4.png'


let data1 = [];
let states1 = [];
let cities1 = [];

const CityData = (props) => {
    const data = props.route.params.data;
    let stateName=''
    let tempStateArray=[]


    // const [data,setData] = useState(props.route.params.data);
    const [arr, setArr] = useState(null);
    const [deceasedData,setDeceasedData]=useState(null)
    const [stateTemp,setStateTemp]=useState(data.state)
    const [tempState,setTempState]=useState()
    const [flag,setFlag]=useState(false)
    const[keyRefresh,setKeyRefresh]=useState(1);
    let inputEl1 = useRef(null);
    const refArray = [inputEl1];
    useEffect(() => {
debugger
        fetchCities()
        stateName=props.route.params.data.state
        const unsubscribe = props.navigation.addListener('focus', () => {
            setFlag(true)
        });
    }, [props.route.params.data])


    const getDeathDataCityWise=()=>{
        debugger
        return new Promise((resolve=>{
            axios
                .get('https://api.covid19india.org/deaths_recoveries.json')
                .then(res => {
                    data1 = res.data.deaths_recoveries;
                    states1 = [
                        ...new Set(
                            data1.map(
                                item =>
                                    item.state !== '' &&
                                    item.state !== 'Kerala/Puducherry?' &&
                                    item.state,
                            ),
                        ),
                    ];
                    states1.sort();
                    states1.pop();

                    states1.forEach(state => {
                        let temp = new Set();
                      data1.forEach(item => {
                            if (
                                item.state === state &&
                                item.district !== '' &&
                                item.patientstatus === 'Deceased'
                            ) {
                                temp.add(item.district);
                            }
                        });
                       cities1.push({key: state, data: Array.from(temp)});

                    });
                    cities1 = cities1.filter(item => item.data.length > 0 && item);
                    let finalData = [];
                    cities1.forEach(state => {
                        let tempCity = [];
                        state.data.forEach(city => {
                            let counter = 0;
                            data1.forEach(item => {
                                if (item.district === city && item.patientstatus === 'Deceased') {
                                    counter++;
                                }
                            });
                            tempCity.push({city, totalDeceased: counter});
                        });
                        finalData.push({state: state.key, data: tempCity});
                    });
                    return resolve(finalData)
                })
                .catch(error => alert(error));

        }))
    }

    const fetchCities = () => {

           fetch('https://api.covid19india.org/state_district_wise.json')
            .then((response) => response.json())
            .then((json) => {
                citiesRender(json)
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const summery = (title, total, today, textColor, numColor, backColor,imgPath) => {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backColor,
                padding: ws * 0.03,
                marginTop: hs * 0.03,
                width: ws * 0.35
            }}>
                <Image source={imgPath} style={{height:screenHeight*.06,width:screenHeight*.06}} />
                <Text style={{fontSize:normalize(11),marginTop:screenHeight*0.025,fontWeight:'bold',color:numColor,textAlign:'center'}}> {title}</Text>
                <Text style={{fontSize:normalize(9),marginTop:screenHeight*0.005,fontWeight:'bold',color:numColor}}>{total}</Text>
            </View>
        )
    }

    const citiesRender = (cities) => {
        let y;
        let tempArr = [];
        let tempDeathArray=[];


        for (y in cities[data.state].districtData) {
            let temp = {
                city: y,
                total: cities[data.state].districtData[y].confirmed,
                today: cities[data.state].districtData[y].delta.confirmed,
                death:0
            }

            tempArr.push(temp);
        }
        let tempDeatCount=0;
        getDeathDataCityWise().then((res)=>{
            res.map((data1)=>{

                if(data1.state.toUpperCase()==data.state.toUpperCase())
                {
                    tempDeathArray.push(data1)
                    tempDeathArray[0].data.map((d1,in1)=>{
                        tempArr.map((dataaa1,indexxx1)=>{
                            if(dataaa1.city==d1.city)
                            {
                                tempArr[indexxx1].death=d1.totalDeceased

                            }
                        })
                    })
                }

                tempArr.map((data)=>{
                    tempDeatCount=tempDeatCount+data.death
                })


            })
            if(tempDeatCount==0){
                tempArr.map((data,index)=>{
                    tempArr[index].death='N/A'
                })
            }
            setArr(tempArr.sort(_sorting));

        })



    }
    const display=(text)=>{

        setFlag(false)
        setStateTemp(text)
    }
    const _sorting=(a, b) => {
        if (a.total < b.total) {
            return 1;
        } else if (a.total > b.total) {
            return -1;
        } else {
            return 0;
        }
    }

    const backPress=()=>{
        setFlag(true)
        props.navigation.goBack(null)
    }
    return (
        <>
            <StatusBar  barStyle="dark-content" />
            <SafeAreaView  style={{ flex: 1 }}>

                <TopHeader title={'State Details'} onPress={()=>backPress()}/>
                <ScrollView style={{flex:1}}>
                <ImageBackground source={require('../Images/assets/screen_bg.png')} style={{flex:1}}>

                <View  style={{ flex: 1, }}>
                    <View  style={style.headerView}>
                        <Text style={style.headerText}>{data.state.toUpperCase()}</Text>
                    </View>
                    <View style={{height:hs*0.002,width:ws,backgroundColor:'red'}}/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {summery('CONFIRMED', data.confirmed, data.confirm, '#FF6A89', 'red', '#FFE0E6',icon1)}
                        {summery('ACTIVE', data.active, 0, '#75B7FF', '#007BFF', '#F0F7FF',icon2)}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {summery('RECOVERED', data.recovered, data.trecovered, '#85CD95', '#28A745', '#E4F4E7',icon3)}
                        {summery('DECEASED', data.deaths, data.tdeaths, '#A7ACB1', '#6C757D', '#F6F6F7',icon4)}
                    </View>
                    <View  style={{ flex: 1, marginTop: 10 }}>
                        <View  style={{ alignItems: 'center', justifyContent: 'center',backgroundColor:'red' }}>
                            <Text style={{ fontSize: ws * 0.04, color: 'white',padding:5,borderRadius:10,fontWeight: 'bold' }}>CITIES OF {data.state.toUpperCase()}</Text></View>

                        <View style={{height: hs*.50,width:ws-50,alignSelf:'center',marginTop: hs*.040}}>
                            <View style={{height: hs*.05,backgroundColor:'red',flexDirection:'row',}}>
                                <Text style={{flex:3,backgroundColor:color.purple,fontSize:normalize(18),fontWeight:'bold',color:'white',padding:hs*0.010}}>Location</Text>
                                <Text style={{flex:1,fontSize:normalize(18),fontWeight:'bold',backgroundColor:'red',color:'white',padding:hs*0.010}}>Death</Text>
                                <Text style={{flex:1,fontSize:normalize(18),fontWeight:'bold',backgroundColor:'red',color:'white',padding:hs*0.010}}>Cases</Text>
                            </View>
                            <View style={{height:hs*.45,}}>
                                {arr === null ? <ActivityIndicator size="large" color="#00000f"/> :
                                    <ScrollView nestedScrollEnabled={true} style={{flex: 1}}>
                                        {
                                            arr && arr.map((item, index) => {
                                                return (
                                                    <View key={item.city} style={{
                                                        backgroundColor: index % 2 == 1 ? '#ECEDEE' : 'white',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: 10,
                                                        flexDirection: 'row',
                                                    }}>
                                                        <Text style={{flex: 3, fontSize: ws * 0.05}}>{item.city}</Text>
                                                        <Text style={{
                                                            fontSize: ws * 0.05,
                                                            color: 'red',
                                                            flex: 1,
                                                            fontWeight: 'bold'
                                                        }}>{item.death}</Text>
                                                        <View style={{flexDirection: 'row', width: ws * .22, flex: 1}}>
                                                            <Text style={{
                                                                width: ws * 0.20,
                                                                fontSize: ws * 0.05,
                                                                fontWeight: 'bold',
                                                                color: '#b8462d',
                                                                textAlign: 'center',
                                                            }}>{item.total}</Text>
                                                            {item.today > 0 && <Text style={{
                                                                textAlign: 'center',
                                                                fontWeight: 'bold',
                                                                color: 'green',
                                                                marginLeft: -(ws * .06),
                                                                marginTop: -(ws * .015)
                                                            }}>+{item.today}</Text>}
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }


                                    </ScrollView>
                                }
                            </View>
                        </View>
                        {/*{flag && fetchCities()}*/}

                    </View>
                </View>
                </ImageBackground>
                </ScrollView>

            </SafeAreaView>
        </>
    );
}

const style = StyleSheet.create({

    headerView: {
        marginTop: hs * 0.03, alignItems: 'center', justifyContent: 'center',height:hs*0.10
    },
    headerText: {
        textAlign: 'center',
        fontSize: ws * 0.06,
        fontWeight: 'bold',
        color:color.purple
        // color: '#9dd7e3'
    }
})
export default CityData;
