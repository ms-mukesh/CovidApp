import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    RefreshControl,
    PixelRatio,
    Image,
    ImageBackground,
    Modal,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
let h = Dimensions.get('window').height;
let w = Dimensions.get('window').width;
import axios from 'axios';
import AppHeader from './appHeader';
import NetInfo from '@react-native-community/netinfo';

const scale = w / 375;
import {screenWidth, screenHeight, color} from '../Helper/themeHelper';

const normalize = size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
let City = [];
export default class rnFethcDemo extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            cityData: {},
            flag: 1,
            modelVisible: false,
            selectedCity: '',

            CountryCase: '',
            WorldCase: '',

            CoutryDeath: '',
            WorldDeath: '',
            internetFlag: 'true',
            dateArray: [],
            dateWiesCasesArray: [],
            recoverCases: '',
            recoverCasesPer: '',
            seriousCases: '',
            seriousCasesPer: '',
            mildCase: '',
            mildCasePer: '',
            todayCases: '',
            refreshing: false,
        };
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

    getWorldData = () => {
        return new Promise(resolve => {
            axios
                .post(
                    'https://covidapi123.herokuapp.com/covid/api/getCurrentCasesWorld',
                )
                .then(res => {
                    // console.log(res.data)
                    return resolve(res);
                });
        });
    };

    getDemo = () => {
        return new Promise(resolve => {
            axios
                .post(
                    'https://www.worldometers.info/coronavirus/coronavirus-cases/#total-cases',
                )
                .then(res => {
                    // console.log(res.data)
                    return resolve(res);
                });
        });
    };

    initilization = () => {
        this.getDemo().then(res => {
            let str = res.data;
            let temp =
                '\n' +
                '        series: [{\n' +
                "            name: 'Cases',\n" +
                "            color: '#33CCFF',\n" +
                '            lineWidth: 5,\n' +
                '            data: [580,845';

            let CasesArray = str.substring(str.indexOf(temp), str.length);
            CasesArray = CasesArray.substring(
                CasesArray.indexOf('580'),
                CasesArray.indexOf('}]') - 9,
            );
            CasesArray = CasesArray.split(',');

            let daySArray=str.substring(str.indexOf('xAxis: {\n' +
                '        categories: ')+13,str.length)
            daySArray=daySArray.substring(17,daySArray.indexOf(']    },'))

            daySArray = daySArray.split(',');
            let tempArray = [];
            daySArray.map(data => {
                tempArray.push(
                    data.substring(data.indexOf('"') + 1, data.lastIndexOf('"')),
                );
            });
            this.setState({dateArray: tempArray, dateWiesCasesArray: CasesArray});

            // console.log(this.state.dateWiesCasesArray)

            let tempRecoverCases = str.substring(
                str.indexOf('Recovered/Discharged'),
                str.indexOf('Recovered/Discharged') + 100,
            );
            tempRecoverCases = tempRecoverCases.replace(/[^0-9]/g, '');

            let tempRecoverPer = tempRecoverCases.substring(
                tempRecoverCases.substring(0, tempRecoverCases.length - 2).length,
                tempRecoverCases.length,
            );

            tempRecoverCases = tempRecoverCases.substring(
                0,
                tempRecoverCases.length - 2,
            );
            this.setState({
                recoverCases: tempRecoverCases,
                recoverCasesPer: tempRecoverPer,
            });

            let seriousCases = str.substring(
                str.indexOf('Serious or Critical'),
                str.indexOf('Serious or Critical') + 100,
            );
            seriousCases = seriousCases.replace(/[^0-9]/g, '');

            let seriousCasesPer = seriousCases.substring(
                seriousCases.substring(0, seriousCases.length - 1).length,
                seriousCases.length,
            );
            seriousCases = seriousCases.substring(0, seriousCases.length - 1);
            this.setState({
                seriousCases: seriousCases,
                seriousCasesPer: seriousCasesPer,
            });
            let tempMildCases = str.substring(
                str.indexOf('Mild Condition'),
                str.indexOf('Mild Condition') + 100,
            );
            tempMildCases = tempMildCases.replace(/[^0-9]/g, '');
            let tempMildPer = tempMildCases.substring(
                tempMildCases.substring(0, tempMildCases.length - 2).length,
                tempMildCases.length,
            );
            tempMildCases = tempMildCases.substring(0, tempMildCases.length - 2);
            this.setState({mildCase: tempMildCases, mildCasePer: tempMildPer});
        });

        this.getWorldData().then(res => {
            let str = res.data;
            let Cases = str.substring(str.indexOf(':') + 2, str.indexOf('Cases'));
            let Death = str.substring(str.indexOf('and') + 4, str.indexOf('Deaths'));
            this.setState({WorldCase: Cases, WorldDeath: Death});
        });
        let tempTodayCases = 0;
        tempTodayCases =
            parseInt(this.state.WorldCase.replace(/[^0-9]/g, '')) -
            parseInt(
                this.state.dateWiesCasesArray[this.state.dateWiesCasesArray.length - 1],
            );
        this.setState({todayCases: tempTodayCases});
        setInterval(() => {
            this.getWorldData().then(res => {
                let str = res.data;
                let Cases = str.substring(str.indexOf(':') + 2, str.indexOf('Cases'));
                let Death = str.substring(
                    str.indexOf('and') + 4,
                    str.indexOf('Deaths'),
                );
                this.setState({WorldCase: Cases, WorldDeath: Death});
            });
            let tempTodayCases = 0;
            tempTodayCases =
                parseInt(this.state.WorldCase.replace(/[^0-9]/g, '')) -
                parseInt(
                    this.state.dateWiesCasesArray[
                    this.state.dateWiesCasesArray.length - 1
                        ],
                );
            this.setState({todayCases: tempTodayCases});
        }, 300000);
    };
    checkConnectivity = () => {
        this.unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            if (state.isConnected) {
                this.setState({internetFlag: true});
                this.initilization();
            } else {
                this.setState({internetFlag: false});
            }
        });

        // Unsubscribe
    };
    componentDidMount() {
        this.checkConnectivity();
    }
    componentWillUnmount(): void {
        this.unsubscribe();
    }

    render() {
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
            headerSecondRow,
        } = style;

        return (
            <View style={{flex: 1}}>
                <AppHeader
                    title={'Corona Meter(World)'}
                    onPress={() => this.props.navigation.openDrawer()}
                />
                <ScrollView
                    style={{flex: 1, padding: 10}}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.initilization()}
                        />
                    }>
                    <ImageBackground
                        source={require('../Images/assets/screen_bg.png')}
                        style={{width: null, height: null, flex: 1}}>
                        <View
                            style={{
                                height: screenHeight * 0.4,
                                width: w - 35,
                                alignSelf: 'center',
                            }}>
                            <View
                                style={{
                                    height: screenHeight * 0.2,
                                    flexDirection: 'row',
                                    padding: screenHeight * 0.01,
                                }}>
                                <View style={{flex: 1, backgroundColor: '#b2c8f4'}}>
                                    <View
                                        style={{
                                            flex: 1.5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            source={require('../Images/assets/covid_4.png')}
                                            style={{
                                                height: screenHeight * 0.04,
                                                width: screenHeight * 0.04,
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={[valueForColumn, {color: 'gray'}]}>
                                            {this.state.mildCase ? this.state.mildCase : 'Counting..'}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={titleForColumn}>MILD CASES</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(59,59,59,0.25)',
                                        }}>
                                        <Text style={[upperLabel, {color: 'white'}]}>
                                            {this.state.mildCasePer
                                                ? this.state.mildCasePer + '%'
                                                : 'Counting..'}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#f5e9dd',
                                        marginLeft: screenHeight * 0.01,
                                    }}>
                                    <View
                                        style={{
                                            flex: 1.5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            source={require('../Images/assets/covid_4.png')}
                                            style={{
                                                height: screenHeight * 0.04,
                                                width: screenHeight * 0.04,
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={[valueForColumn, {color: 'gray'}]}>
                                            {this.state.recoverCases
                                                ? this.state.recoverCases
                                                : 'Counting'}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={titleForColumn}>RECOVERED</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(59,59,59,0.25)',
                                        }}>
                                        <Text style={[upperLabel, {color: 'white'}]}>
                                            {this.state.recoverCasesPer
                                                ? this.state.recoverCasesPer
                                                : 'Counting..'}
                                            %
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#f1bdb8',
                                        marginLeft: screenHeight * 0.01,
                                    }}>
                                    <View
                                        style={{
                                            flex: 1.5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            source={require('../Images/assets/covid_4.png')}
                                            style={{
                                                height: screenHeight * 0.04,
                                                width: screenHeight * 0.04,
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={[valueForColumn, {color: 'gray'}]}>
                                            {this.state.seriousCases
                                                ? this.state.seriousCases
                                                : 'Counting..'}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={titleForColumn}>SERIOUS CASES</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(59,59,59,0.25)',
                                        }}>
                                        <Text style={[upperLabel, {color: 'white'}]}>
                                            {this.state.seriousCasesPer
                                                ? this.state.seriousCasesPer + '%'
                                                : 'Counting..'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: screenHeight * 0.2,
                                    padding: screenHeight * 0.01,
                                    flexDirection: 'row',
                                }}>
                                <View style={{flex: 1, backgroundColor: '#f6c778'}}>
                                    <View
                                        style={{
                                            flex: 1.5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            source={require('../Images/assets/covid_4.png')}
                                            style={{
                                                height: screenHeight * 0.04,
                                                width: screenHeight * 0.04,
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={[valueForColumn, {color: 'gray'}]}>
                                            {this.state.WorldCase
                                                ? this.state.WorldCase
                                                : 'Counting..'}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={titleForColumn}>CONFIRMED</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(59,59,59,0.25)',
                                        }}>
                                        <Text style={[upperLabel, {color: 'white'}]}>
                                            Today +
                                            {parseInt(this.state.WorldCase.replace(/[^0-9]/g, '')) -
                                            parseInt(
                                                this.state.dateWiesCasesArray[
                                                this.state.dateWiesCasesArray.length - 1
                                                    ],
                                            )
                                                ? parseInt(
                                                this.state.WorldCase.replace(/[^0-9]/g, ''),
                                                ) -
                                                parseInt(
                                                    this.state.dateWiesCasesArray[
                                                    this.state.dateWiesCasesArray.length - 1
                                                        ],
                                                )
                                                : 'Conting..'}
                                        </Text>
                                    </View>
                                </View>
                                {!this.state.internetFlag && (
                                    <Modal visible={true} animated={false} transparent={false}>
                                        <SafeAreaView
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Image
                                                source={require('../Actions/noInternet.png')}
                                                resizeMode={'contain'}
                                                style={{width: w * 0.2, height: w * 0.2}}
                                            />
                                            <Text
                                                style={{fontSize: normalize(16), fontWeight: '600'}}>
                                                Opps! Your internet connection appears offline.
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: 'red',
                                                    height: w * 0.15,
                                                    width: w * 0.4,
                                                    borderRadius: w * 0.02,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginTop: 20,
                                                }}
                                                onPress={() => this.checkConnectivity()}>
                                                <Text
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontSize: normalize(16),
                                                        color: 'white',
                                                    }}>
                                                    Try Again
                                                </Text>
                                            </TouchableOpacity>
                                        </SafeAreaView>
                                    </Modal>
                                )}
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#b6c8c4',
                                        marginLeft: screenHeight * 0.01,
                                    }}>
                                    <View
                                        style={{
                                            flex: 1.5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            source={require('../Images/assets/covid_4.png')}
                                            style={{
                                                height: screenHeight * 0.04,
                                                width: screenHeight * 0.04,
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={[valueForColumn, {color: 'gray'}]}>
                                            {this.state.WorldDeath
                                                ? this.state.WorldDeath
                                                : 'Counting..'}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={titleForColumn}>DEATH</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(59,59,59,0.25)',
                                        }}>
                                        <Text style={[upperLabel, {color: 'white'}]}>
                                            {(parseInt(this.state.WorldDeath.replace(/[^0-9]/g, '')) *
                                                100) /
                                            parseInt(this.state.WorldCase.replace(/[^0-9]/g, ''))
                                                ? (
                                                (parseInt(
                                                    this.state.WorldDeath.replace(/[^0-9]/g, ''),
                                                    ) *
                                                    100) /
                                                parseInt(
                                                    this.state.WorldCase.replace(/[^0-9]/g, ''),
                                                )
                                            )
                                                .toString()
                                                .substring(0, 4) + '%'
                                                : 'Counting...'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                height: screenHeight * 0.04,
                                marginTop: screenHeight * 0.01,
                                width: screenWidth,
                                marginLeft: -10,
                                backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: normalize(15),
                                }}>
                                Date Wise Cases
                            </Text>
                        </View>
                        <View
                            style={{
                                height: screenHeight * 0.4,
                                marginTop: screenHeight * 0.02,
                                width: screenWidth - 30,
                                alignSelf: 'center',
                            }}>
                            <View
                                style={{
                                    height: screenHeight * 0.05,
                                    backgroundColor: color.purple,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: normalize(15),
                                    }}>
                                    Daily Cases
                                </Text>
                            </View>

                            <View style={{height: screenHeight * 0.35}}>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    style={{flex: 1}}>
                                    {this.state.dateWiesCasesArray
                                        .slice(0)
                                        .reverse()
                                        .map((data, index) => {
                                            return (
                                                <View
                                                    style={{
                                                        height: screenHeight * 0.05,
                                                        backgroundColor:
                                                            index % 2 == 1 ? '#ECEDEE' : 'white',
                                                        flexDirection: 'row',
                                                    }}>
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        <Text style={listDay}>
                                                            {
                                                                this.state.dateArray[
                                                                this.state.dateWiesCasesArray.length -
                                                                1 -
                                                                index
                                                                    ]
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flex: 3,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        <Text style={listCase}>{data} Cases</Text>
                                                    </View>
                                                    <View style={{flex: 1, padding: screenHeight * 0.01}}>
                                                        {index > 0 && (
                                                            <Icon
                                                                style={{alignSelf: 'flex-end'}}
                                                                name={'arrowup'}
                                                                size={20}
                                                                color={'red'}
                                                            />
                                                        )}
                                                    </View>
                                                </View>
                                            );
                                        })}
                                </ScrollView>
                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </View>
        );
    }
}
const style = StyleSheet.create({
    headerFirstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: h * 0.2,
    },
    smallColumn: {
        width: w * 0.3,
        height: h * 0.15,
        padding: h * 0.01,
        borderRadius: h * 0.01,
        justifyContent: 'center',
    },
    bigColumn: {
        flex: 1,
        height: h * 0.15,
        backgroundColor: '#d1ffb1',
        padding: h * 0.01,
        borderRadius: h * 0.01,
        marginLeft: h * 0.01,
        justifyContent: 'center',
    },
    titleForColumn: {
        fontSize: normalize(13),
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'gray',
    },
    valueForColumn: {
        fontSize: normalize(15),
        marginTop: 1,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    upperLabel: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    secondRow: {
        flex: 1.5,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ECEDEE',
    },
    listViews: {
        height: h * 0.1,
        width: w - 50,
        marginTop: h * 0.01,
        borderRadius: 10,
        padding: h * 0.01,
        flexDirection: 'row',
    },
    listDay: {
        fontSize: normalize(14),
        fontWeight: 'bold',
    },
    listCase: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        color: 'black',
    },
    headerSecondRow: {
        flex: 1,
        flexDirection: 'row',
        height: h * 0.2,
    },
});
