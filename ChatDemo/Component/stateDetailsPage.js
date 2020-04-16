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
} from 'react-native';
const ws = Dimensions.get('window').width;
const hs = Dimensions.get('window').height;
import TopHeader from '../Component/headerForBack'
import {jsTypeToCppType} from 'react-native/ReactCommon/hermes/inspector/tools/msggen/src/Converters';
import axios from 'axios';
import {normalize} from '../Helper/themeHelper';

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

        fetchCities()
        stateName=props.route.params.data.state

        const unsubscribe = props.navigation.addListener('focus', () => {
            setFlag(true)
        });
    }, [])


    const getDeathDataCityWise=()=>{
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
    const summery = (title, total, today, textColor, numColor, backColor) => {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backColor,
                padding: ws * 0.03
                , borderRadius: 20,
                marginTop: hs * 0.03,
                width: ws * 0.35
            }}>
                <Text style={{ color: textColor, fontWeight: 'bold' }}>{title}</Text>
                {today > 0 && <Text style={{ color: textColor }}>+{today}</Text>}
                <Text style={{ color: numColor, fontSize: ws * 0.1, fontWeight: '700' }}>{total}</Text>
            </View>
        )
    }

    const citiesRender = (cities) => {
        let y;
        let tempArr = [];
        for (y in cities[data.state].districtData) {
            let temp = {
                city: y,
                total: cities[data.state].districtData[y].confirmed,
                today: cities[data.state].districtData[y].delta.confirmed,
                death:0
            }
            tempArr.push(temp);
        }
        tempStateArray=[];
        getDeathDataCityWise().then((res)=>{
            res.map((data)=>{
                if(data.state.toUpperCase()==stateName.toUpperCase()){
                    tempStateArray.push(data)
                }
            })
            if(tempStateArray.length>0){
                tempStateArray[0].data.map((data,index)=>{
                    tempArr.map((data1,index1)=>{
                        if(data.city.toUpperCase()==data1.city.toUpperCase()){
                            tempArr[index1].death=data.totalDeceased
                        }
                    })
                })
                setArr(tempArr.sort(_sorting));

            }

        })


    }
    const display=(text)=>{
        console.log("called this time")
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
                <View  style={{ flex: 1,backgroundColor:'white' }}>
                    <View  style={style.headerView}>
                        <TouchableOpacity>
                        <Text ref={ref => (inputEl1 = ref)}   style={style.headerText}>{data.state}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {summery('CONFIRMED', data.confirmed, data.confirm, '#FF6A89', 'red', '#FFE0E6')}
                        {summery('ACTIVE', data.active, 0, '#75B7FF', '#007BFF', '#F0F7FF')}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {summery('RECOVERED', data.recovered, data.trecovered, '#85CD95', '#28A745', '#E4F4E7')}
                        {summery('DECEASED', data.deaths, data.tdeaths, '#A7ACB1', '#6C757D', '#F6F6F7')}
                    </View>
                    <View  style={{ flex: 1, marginTop: 10 }}>
                        <View  style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ fontSize: ws * 0.06, color: '#343A40',backgroundColor:'#ECEDEE',padding:5,borderRadius:10 }}>Cities of {data.state}</Text></View>
                        {flag && fetchCities()}
                        {arr === null ? <ActivityIndicator size="large" color="#00000f" />
                            :
                            <View>
                                <View style={{height:hs*0.07,width:ws,alignItems:'center',flexDirection:'row'}}>
                                    <Text style={{fontSize:normalize(20),fontWeight:'bold',marginLeft:ws*0.030}}>City Name</Text>
                                    <Text style={{fontSize:normalize(20),fontWeight:'bold',marginLeft:ws*0.22}}>Death</Text>
                                    <Text style={{fontSize:normalize(20),fontWeight:'bold',marginLeft:ws*0.13}}>Cases</Text>

                                </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ marginHorizontal: 10,marginTop:10 }}>

                                {
                                    arr && arr.map((item,index) => {
                                        return (
                                            <View key={item.city} style={{
                                                backgroundColor:index%2==1 ?'#ECEDEE':'white',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: 10,
                                                flexDirection: 'row',
                                            }}>
                                                <Text style={{ width: ws * 0.6, fontSize: ws * 0.05 }}>{item.city}</Text>
                                                <Text style={{ fontSize: ws * 0.05,marginLeft:-(ws*0.12) }}>{item.death}</Text>
                                                <View style={{flexDirection:'row',width:ws*.22}}>
                                                    <Text style={{ width: ws * 0.20,fontSize: ws * 0.05,color:'red',textAlign:'center', }}>{item.total}</Text>
                                                    {item.today>0 && <Text style={{ textAlign:'center',color:'green',marginLeft:-(ws*.06),marginTop:-(ws*.015)  }}>+{item.today}</Text>}
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                            </View>
                        }
                    </View>
                </View>

            </SafeAreaView>
        </>
    );
}

const style = StyleSheet.create({

    headerView: {
        marginTop: hs * 0.03, alignItems: 'center', justifyContent: 'center'
    },
    headerText: {
        textAlign: 'center',
        fontSize: ws * 0.08,
        fontWeight: 'bold',
        // color: '#9dd7e3'
    }
})
export default CityData;
