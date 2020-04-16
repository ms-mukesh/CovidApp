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
        latitude: 8.507687,
        longitude: 76.953983
    },
    Delhi: {
        latitude: 28.646005,
        longitude: 77.222214
    },
    Telangana: {
        latitude: 17.363091,
        longitude: 78.473166
    },
    Rajasthan: {
        latitude: 26.920233,
        longitude: 75.819655
    },
    Haryana: {
        latitude: 29,
        longitude: 76
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
        latitude: 13.0801721,
        longitude: 80.2838331
    },
    JammuandKashmir: {
        latitude: 33.53155445,
        longitude: 75.31096353
    },
    Karnataka: {
        latitude: 12.9791198,
        longitude: 77.5912997
    },
    Maharashtra: {
        latitude: 18.9387711,
        longitude: 72.8353355
    },
    Punjab: {
        latitude: 30.72984395,
        longitude: 76.78414567
    },
    AndhraPradesh: {
        latitude: 15.9240905,
        longitude: 80.1863809
    },
    Uttarakhand: {
        latitude: 30.0668,
        longitude: 79.0193
    },
    Odisha: {
        latitude: 20.2667774,
        longitude: 85.8435592
    },
    Puducherry: {
        latitude: 11.9416,
        longitude: 79.8083
    },
    WestBengal: {
        latitude: 22.5677459,
        longitude: 88.3476023
    },
    Chhattisgarh: {
        latitude: 21.1610268,
        longitude: 81.7864412
    },
    Gujarat: {
        latitude: 23.2232877,
        longitude: 72.6492267
    },
    HimachalPradesh: {
        latitude: 31.23957275,
        longitude: 77.71979337
    },
    MadhyaPradesh: {
        latitude: 23.5,
        longitude: 77.416667
    },
    Bihar: {
        latitude: 25.416667,
        longitude: 85.166667
    },
    Manipur: {
        latitude: 24.8006088,
        longitude: 93.9369998
    },
    Mizoram: {
        latitude: 23.7414092,
        longitude: 92.7209297
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
        latitude: 23.30063985,
        longitude: 85.37344271
    },
    Assam: {
        latitude: 26.1513079,
        longitude: 91.7933805
    },
    ArunachalPradesh: {
        latitude: 27.0979659,
        longitude: 93.6237291
    },
    Nagaland: {
        latitude: 25.75,
        longitude: 94.166667
    },
    Sikkim: {
        latitude: 27.329046,
        longitude: 88.5122
    },
    Tripura: {
        latitude: 23.8312377,
        longitude: 91.2823821
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
        latitude: 25.5307653,
        longitude: 91.849528
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
