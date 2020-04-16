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
let data=null;
export default class CityData extends React.Component{
    constructor(props) {
         data = props.route.params.data;
        super(props);
        this.state={
            arr:null,
            keyRefresh:1
        }


    }
    componentDidMount(): void {
        this.fetchCities()
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            // setData(props.route.params.data)
            // console.log(props.route.params.data)
            // setKeyRefresh(keyRefresh+Math.floor(Math.random() * 100)+1)
            this.setState(({ keyRefresh }) => ({
                keyRefresh: keyRefresh + 1
            }))
            this.fetchCities()

        });
    }

    fetchCities = () => {
        fetch('https://api.covid19india.org/state_district_wise.json')
            .then((response) => response.json())
            .then((json) => {
                this.citiesRender(json)
                // console.log(json)
            })
            .catch((error) => {
                console.error(error);
            });
    }
     summery = (title, total, today, textColor, numColor, backColor) => {
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

     citiesRender = (cities) => {
        let y;
        let tempArr = [];

        for (y in cities[data.state].districtData) {

            let temp = {
                city: y,
                total: cities[data.state].districtData[y].confirmed,
                today: cities[data.state].districtData[y].delta.confirmed
            }

            tempArr.push(temp);
        }
        // setArr(tempArr);
        this.setState({arr:tempArr})
        // console.log(tempArr)
    }
     display=()=>{
        console.log("called")

    }
    render(){
        return(
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView key={this.state.keyRefresh} style={{ flex: 1 }}>
                    <TopHeader title={'State Details'} onPress={()=>this.props.navigation.replace('abc')}/>
                    <View key={this.state.keyRefresh} style={{ flex: 1,backgroundColor:'white' }}>
                        <View style={style.headerView}>
                            <TouchableOpacity onPress={()=>this.display()}>
                                <Text  style={style.headerText}>{data.state}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {this.summery('CONFIRMED', data.confirmed, data.confirm, '#FF6A89', 'red', '#FFE0E6')}
                            {this.summery('ACTIVE', data.active, 0, '#75B7FF', '#007BFF', '#F0F7FF')}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {this.summery('RECOVERED', data.recovered, data.trecovered, '#85CD95', '#28A745', '#E4F4E7')}
                            {this.summery('DECEASED', data.deaths, data.tdeaths, '#A7ACB1', '#6C757D', '#F6F6F7')}
                        </View>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontSize: ws * 0.06, color: '#343A40',backgroundColor:'#ECEDEE',padding:5,borderRadius:10 }}>Cities of {data.state}</Text></View>
                            {this.state.arr === null ? <ActivityIndicator size="large" color="#00000f" />
                                :
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    style={{ marginHorizontal: 10,marginTop:10 }}>

                                    {
                                        this.state.arr && this.state.arr.map((item,index) => {
                                            return (
                                                <View key={item.city} style={{
                                                    backgroundColor:index%2==1 ?'#ECEDEE':'white',
                                                    // marginVertical: 10,
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: 10,
                                                    flexDirection: 'row',
                                                }}>
                                                    <Text style={{ width: ws * 0.6, fontSize: ws * 0.05 }}>{item.city}</Text>
                                                    <View style={{flexDirection:'row'}}>
                                                        {item.today>0 && <Text style={{ textAlign:'center',color:'green'  }}>+{item.today}</Text>}
                                                        <Text style={{ width: ws * 0.1,fontSize: ws * 0.05,color:'red',textAlign:'center' }}>{item.total}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            }
                        </View>
                    </View>

                </SafeAreaView>
            </>

        )
    }
}
// const CityData = (props) => {
//     const data = props.route.params.data;
//     // const [data,setData] = useState(props.route.params.data);
//     const [arr, setArr] = useState(null);
//     const[keyRefresh,setKeyRefresh]=useState(1);
//
//     let inputEl1 = useRef(null);
//
//     const refArray = [inputEl1];
//
//
//     useEffect(() => {
//         // setData(props.route.params.data)
//         // console.log(props.route.params.data)
//         // console.log(props.navigation)
//         // console.log("hello")
//         fetchCities()
//         const unsubscribe = props.navigation.addListener('focus', () => {
//             // setData(props.route.params.data)
//             // console.log(props.route.params.data)
//             setKeyRefresh(keyRefresh+Math.floor(Math.random() * 100)+1)
//             fetchCities()
//
//         });
//
//     }, [])
//
//     const fetchCities = () => {
//         fetch('https://api.covid19india.org/state_district_wise.json')
//             .then((response) => response.json())
//             .then((json) => {
//                 citiesRender(json)
//                 // console.log(json)
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
//     const summery = (title, total, today, textColor, numColor, backColor) => {
//         return (
//             <View style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: backColor,
//                 padding: ws * 0.03
//                 , borderRadius: 20,
//                 marginTop: hs * 0.03,
//                 width: ws * 0.35
//             }}>
//                 <Text style={{ color: textColor, fontWeight: 'bold' }}>{title}</Text>
//                 {today > 0 && <Text style={{ color: textColor }}>+{today}</Text>}
//                 <Text style={{ color: numColor, fontSize: ws * 0.1, fontWeight: '700' }}>{total}</Text>
//             </View>
//         )
//     }
//
//     const citiesRender = (cities) => {
//         let y;
//         let tempArr = [];
//         console.log(data.state)
//         for (y in cities[data.state].districtData) {
//
//             let temp = {
//                 city: y,
//                 total: cities[data.state].districtData[y].confirmed,
//                 today: cities[data.state].districtData[y].delta.confirmed
//             }
//
//             tempArr.push(temp);
//         }
//         setArr(tempArr);
//
//         // console.log(tempArr)
//     }
//     const display=()=>{
//         console.log("called")
//         console.log(refArray[0].children);
//     }
//
//     return (
//         <>
//             <StatusBar barStyle="dark-content" />
//             <SafeAreaView key={Math.floor(Math.random() * 100)} style={{ flex: 1 }}>
//                 <TopHeader title={'State Details'} onPress={()=>props.navigation.goBack()}/>
//                 <View key={Math.floor(Math.random() * 100)} style={{ flex: 1,backgroundColor:'white' }}>
//                     <View style={style.headerView}>
//                         <TouchableOpacity onPress={()=>display()}>
//                         <Text ref={ref => (refArray[0] = ref)}   style={style.headerText}>{data.state}</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//                         {summery('CONFIRMED', data.confirmed, data.confirm, '#FF6A89', 'red', '#FFE0E6')}
//                         {summery('ACTIVE', data.active, 0, '#75B7FF', '#007BFF', '#F0F7FF')}
//                     </View>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//                         {summery('RECOVERED', data.recovered, data.trecovered, '#85CD95', '#28A745', '#E4F4E7')}
//                         {summery('DECEASED', data.deaths, data.tdeaths, '#A7ACB1', '#6C757D', '#F6F6F7')}
//                     </View>
//                     <View style={{ flex: 1, marginTop: 10 }}>
//                         <View style={{ alignItems: 'center', justifyContent: 'center', }}>
//                             <Text style={{ fontSize: ws * 0.06, color: '#343A40',backgroundColor:'#ECEDEE',padding:5,borderRadius:10 }}>Cities of {data.state}</Text></View>
//                         {arr === null ? <ActivityIndicator size="large" color="#00000f" />
//                             :
//                             <ScrollView
//                                 showsVerticalScrollIndicator={false}
//                                 style={{ marginHorizontal: 10,marginTop:10 }}>
//
//                                 {
//                                     arr && arr.map((item,index) => {
//                                         return (
//                                             <View key={item.city} style={{
//                                                 backgroundColor:index%2==1 ?'#ECEDEE':'white',
//                                                 // marginVertical: 10,
//                                                 justifyContent: 'space-between',
//                                                 alignItems: 'center',
//                                                 padding: 10,
//                                                 flexDirection: 'row',
//                                             }}>
//                                                 <Text style={{ width: ws * 0.6, fontSize: ws * 0.05 }}>{item.city}</Text>
//                                                 <View style={{flexDirection:'row'}}>
//                                                     {item.today>0 && <Text style={{ textAlign:'center',color:'green'  }}>+{item.today}</Text>}
//                                                     <Text style={{ width: ws * 0.1,fontSize: ws * 0.05,color:'red',textAlign:'center' }}>{item.total}</Text>
//                                                 </View>
//                                             </View>
//                                         )
//                                     })
//                                 }
//                             </ScrollView>
//                         }
//                     </View>
//                 </View>
//
//             </SafeAreaView>
//         </>
//     );
// }

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
// export default CityData;
