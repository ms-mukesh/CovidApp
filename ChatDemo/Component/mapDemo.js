import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import AppHeader from '../Component/appHeader'
import { NavigationEvents } from 'react-navigation';
import {
    View,
    Text,
    StatusBar,
    Image,
    Platform
} from 'react-native';

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
    DamanandDiu: {
        latitude: 20.4283,
        longitude: 72.8397
    },
    Meghalaya: {
        latitude: 25.4670,
        longitude: 91.3662
    }

}


const Map = (props,navigation) => {
    const [states, setStates] = useState(null);

    const[keyRefresh,setKeyRefresh]=useState(1);

    const[initialLatitude,setinitialLatitude]=useState(20.593683)
    const[intitallongitude,setinitialLogitude]=useState( 78.962883)

    // const[initialLatitude,setinitialLatitude]=useState(500)
    // const[intitallongitude,setinitialLogitude]=useState( 700)


    const statesLatLog = (citiesData) => {
        let x;
        let y;
        let arr = [];
        for (x in citiesData) {
            let data;
            if (x != '0') {
                let stateName = citiesData[x].state.split(/\s/).join('');
                let coodinaties = findCoodinaties(stateName);
                if (coodinaties && citiesData[x].confirmed > 0) {
                    data = {
                        stateName: citiesData[x].state,
                        confirm: citiesData[x].confirmed,
                        recovered: citiesData[x].recovered,
                        deaths: citiesData[x].deaths,
                        tconfirm: citiesData[x].deltaconfirmed,
                        trecovered: citiesData[x].deltarecovered,
                        tdeaths: citiesData[x].deltadeaths,
                        update: citiesData[x].lastupdatedtime,
                        active: citiesData[x].active,
                        coo: coodinaties
                    }
                    arr.push(data)
                } else {
                    console.log(citiesData[x].state)
                }
            }

        }
        setStates(arr)
    }


    const findCoodinaties = (x) => {
        let i;
        for (i in LatLog) {
            if (i === x) {
                return LatLog[i]
            }
        }
    }

    const _callOut = (item) => {

        const data={"active": item.active, "confirmed": item.confirm, "deaths": item.deaths, "deltaconfirmed": item.confirm, "deltadeaths": item.deaths, "deltarecovered": item.recovered, "lastupdatedtime": item.update, "recovered": item.recovered, "state": item.stateName, "statecode": "MH"}
        return <Callout onPress={() =>  props.navigation.navigate('StateInfo',{data})} >
            <View >
                <Text>Place: {item.stateName}</Text>
                <Text>Confirmed: {item.confirm}</Text>
                <Text>Recovered: {item.recovered}</Text>
                <Text>Death: {item.deaths}</Text>
                <Text>Active: {item.active}</Text>
                <Text>Today confirmed: {item.tconfirm}</Text>
                <Text>Today death: {item.tdeaths}</Text>
                <Text>Today recovered: {item.trecovered}</Text>
                <Text>Last updateed: {item.update}</Text>
            </View>
        </Callout>
    }

    useEffect(() => {
        fetchStates();

        const unsubscribe = props.navigation.addListener('focus', () => {
            setinitialLatitude(20.593683)
            setinitialLogitude(78.962883)
            setKeyRefresh(keyRefresh+Math.floor(Math.random() * 100)+1)
            // alert(keyRefresh)
        });


    }, [])


    const fetchStates = async () => {
        try {
            const [
                response,
            ] = await Promise.all([
                axios.get('https://api.covid19india.org/data.json'),
                axios.get('https://api.covid19india.org/state_district_wise.json'),
                axios.get('https://api.covid19india.org/updatelog/log.json'),
            ]);
            statesLatLog(response.data.statewise)
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <StatusBar barStyle="dark-content" onBlur={()=>alert("hello")} />
            <AppHeader title={'India-Map'} onPress={()=>props.navigation.openDrawer()}/>
            <MapView
                // provider={PROVIDER_GOOGLE}
                key={Math.floor(Math.random() * 100)}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: initialLatitude,
                    longitude: intitallongitude,
                    latitudeDelta: 23,
                    longitudeDelta: 25,
                }}
                maxZoomLevel={6}
                minZoomLevel={4}
            >

                {
                    states && states.map((item) => {
                            return (
                                <Marker
                                    key={item.stateName}
                                    coordinate={item.coo}
                                    image={require('../Images/viruiconTemp2.png')
                                    }

                                >
                                    {_callOut(item)}
                                </Marker>
                            )
                        }
                    )
                }
            </MapView>
        </>
    );
};


export default Map;
