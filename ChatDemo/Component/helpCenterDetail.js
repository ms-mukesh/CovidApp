import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    Modal,
    PixelRatio,
    Dimensions,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ImageBackground,
    Image,
    TouchableHighlight,
} from 'react-native';
import SafeAreaInsets from 'react-native-static-safe-area-insets';
import axios from 'axios';
import AppHeader from '../Component/appHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import {color, isIOS} from '../Helper/themeHelper';

const {width, height} = Dimensions.get('window');
const scale = width / 375;

const normalize = size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
export default class HealthCare extends Component {
    state: {
        selectedState: string,
        selectedCity: string,
        isStateModelOpen: boolean,
        isCityModelOpen: boolean,
        isLoading: boolean,
    };
    constructor(props) {
        super(props);
        this.medicalData = [];
        this.states = [];
        this.cities = [];
        this.flatListRef = '';
        this.state = {
            selectedState: '',
            selectedCity: '',
            isStateModelOpen: false,
            isCityModelOpen: false,
            isLoading: true,
            isButtonPress: false,
            selectedIndex: null,
        };
    }

    componentDidMount(): void {
        this.fetchDataFromServer();
    }

    stateListView(items, isState) {
        const {
            selectHeadingText,
            listView,
            highlightListView,
            highlightSelectHeadingText,
        } = styles;
        return (
            <TouchableHighlight
                activeOpacity={1}
                onShowUnderlay={() => {
                    this.setState({isButtonPress: true, selectedIndex: items.index});
                }}
                onHideUnderlay={() => this.setState({isButtonPress: false})}
                style={
                    this.state.isButtonPress && this.state.selectedIndex === items.index
                        ? highlightListView
                        : listView
                }
                onPress={() => {
                    this.setState({selectedIndex: null, isButtonPress: false});
                    if (isState) {
                        this.setState({isStateModelOpen: false, isCityModelOpen: false});
                        this.setState({selectedCity: ''});
                        if (items.index === 0) {
                            this.setState({selectedState: ''});
                        } else {
                            this.setState({selectedState: items.item});
                        }
                    } else {
                        this.setState({selectedCity: items.item});
                        this.setState({isCityModelOpen: false});
                    }
                }}>
                <View
                    style={
                        this.state.isButtonPress && this.state.selectedIndex === items.index
                            ? highlightListView
                            : listView
                    }>
                    <Text
                        style={
                            this.state.isButtonPress &&
                            this.state.selectedIndex === items.index
                                ? highlightSelectHeadingText
                                : selectHeadingText
                        }>
                        {items.item.replace(/[^a-zA-Z ]/g, '')}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    stateModal() {
        if (this.states[0] !== 'ALL') {
            this.states.unshift('ALL');
        }
        return this.commonFlatList(this.states, true, true);
        // return (
        //   <Modal
        //     visible={this.state.isStateModelOpen}
        //     animationType={'slide'}
        //     onRequestClose={() => this.setState({isStateModelOpen: false})}>
        //     <View style={modalView}>
        //       <View style={innerModalHeadingView}>
        //         <TouchableOpacity
        //           onPress={() => this.setState({isStateModelOpen: false})}>
        //           <Text style={cancelButton}>Cancel</Text>
        //         </TouchableOpacity>
        //         <Text
        //           style={{
        //             alignSelf: 'center',
        //             fontSize: normalize(16),
        //             fontWeight: 'bold',
        //             marginTop: -(height * 0.02),
        //           }}>
        //           Please Select State
        //         </Text>
        //       </View>
        //       <View style={innerModalView}>
        //         <FlatList
        //           style={modalFlatListStyle}
        //           data={this.states}
        //           keyExtractor={item => item}
        //           renderItem={items => this.stateListView(items, true)}
        //         />
        //       </View>
        //     </View>
        //   </Modal>
        // );
    }

    cityModal() {
        // const {
        //   modalView,
        //   cancelButton,
        //   innerModalHeadingView,
        //   innerModalView,
        //   modalFlatListStyle,
        // } = styles;
        if (this.state.selectedState !== '') {
            const cityObj = this.cities.find(o => o.key === this.state.selectedState);
            cityObj.data.sort();
            if (cityObj.data[0] !== 'ALL' && cityObj.data.length > 1) {
                cityObj.data.unshift('ALL');
            }
            return this.commonFlatList(cityObj.data, true, false);
            //   return (
            //     <Modal
            //       visible={this.state.isCityModelOpen}
            //       animationType={'slide'}
            //       onRequestClose={() => this.setState({isCityModelOpen: false})}>
            //       <View style={modalView}>
            //         <View style={innerModalHeadingView}>
            //           <TouchableOpacity
            //             onPress={() => this.setState({isCityModelOpen: false})}>
            //             <Text style={cancelButton}>Cancel</Text>
            //           </TouchableOpacity>
            //           <Text
            //             style={{
            //               alignSelf: 'center',
            //               fontSize: normalize(16),
            //               fontWeight: '700',
            //               marginTop: -(height * 0.02),
            //             }}>
            //             Please Select City
            //           </Text>
            //         </View>
            //         <View style={innerModalView}>
            //           <FlatList
            //             style={modalFlatListStyle}
            //             data={cityObj.data}
            //             keyExtractor={item => item}
            //             renderItem={items => this.stateListView(items, false)}
            //           />
            //         </View>
            //       </View>
            //     </Modal>
            //   );
        }
    }

    fetchDataFromServer() {
        axios
            .get('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
            .then(res => {
                this.medicalData = [...new Set(res.data.data.medicalColleges)];
                this.states = [
                    ...new Set(
                        this.medicalData.map(item =>
                            item.state !== 'Maharastra' ? item.state : false,
                        ),
                    ),
                ];
                this.states.sort();
                //Maharastra
                this.states.pop();
                this.states.forEach(state => {
                    let temp = new Set();
                    this.medicalData.forEach(item => {
                        if (item.state === state) {
                            temp.add(item.city);
                        }
                    });
                    this.cities.push({key: state, data: Array.from(temp)});
                    this.setState({isLoading: false});
                });
            })
            .catch(error => alert(error));
    }
    renderHealthView = items => {
        const {
            viewForStateList,
            hospitalBedText,
            collegeNameText,
            admissionCapacityText,
            viewForAdmission,
            viewForName,
        } = styles;
        return (
            <View
                style={[
                    viewForStateList,
                    {
                        backgroundColor: items.index % 2 ? '#ffffff' : color.lightGray,
                    },
                ]}>
                <View style={viewForName}>
                    <Text style={collegeNameText}>{items.item.name}</Text>
                </View>
                <View style={viewForAdmission}>
                    <Text style={admissionCapacityText}>
                        {items.item.admissionCapacity}
                    </Text>
                </View>
                <View style={viewForAdmission}>
                    <Text style={hospitalBedText}>{items.item.hospitalBeds} </Text>
                </View>
            </View>
        );
    };

    commonFlatList = (tempData, isModal, isState) => {
        const {
            viewForAdmission,
            viewForName,

            mainFlatListStyle,
            headerFlatListText,

            headerFlatListView,
        } = styles;
        return (
            <View style={{width: '100%', height: '100%'}}>
                {isModal ? (
                    <View style={headerFlatListView}>
                        <Text style={[headerFlatListText, {alignSelf: 'center'}]}>
                            {isState ? 'Please Select State' : 'Please Select City'}
                        </Text>
                    </View>
                ) : (
                    <View style={headerFlatListView}>
                        <View style={viewForName}>
                            <Text style={headerFlatListText}>Name of Health Center</Text>
                        </View>
                        <View style={viewForAdmission}>
                            <Text style={headerFlatListText}>Admission Capacity</Text>
                        </View>
                        <View style={viewForAdmission}>
                            <Text style={headerFlatListText}>Hospital Beds</Text>
                        </View>
                    </View>
                )}
                <FlatList
                    style={mainFlatListStyle}
                    data={tempData}
                    ref={ref => {
                        this.flatListRef = ref;
                    }}
                    keyExtractor={(item, index) => item + index}
                    renderItem={items =>
                        isModal
                            ? this.stateListView(items, isState)
                            : this.renderHealthView(items)
                    }
                />
            </View>
        );
    };

    listForState() {
        const data = this.medicalData.filter(
            item => item.state === this.state.selectedState,
        );
        const tempData = data.filter(
            (elem, index, self) =>
                self.findIndex(t => {
                    return t.name === elem.name;
                }) === index,
        );
        tempData.sort((a, b) => a.name > b.name);
        return this.commonFlatList(tempData);
    }
    listForAll() {
        const tempData = this.medicalData.filter(
            (elem, index, self) =>
                self.findIndex(t => {
                    return t.name === elem.name;
                }) === index,
        );
        tempData.sort((a, b) => a.name.trim() > b.name.trim());
        return this.commonFlatList(tempData);
    }

    listForCity() {
        const data = this.medicalData.filter(
            item => item.city === this.state.selectedCity,
        );
        const tempData = data.filter(
            (elem, index, self) =>
                self.findIndex(t => {
                    return t.name === elem.name;
                }) === index,
        );
        tempData.sort((a, b) => a.name > b.name);
        return this.commonFlatList(tempData);
    }

    checkView = () => {
        if (this.state.isStateModelOpen) {
            return this.stateModal();
        } else if (this.state.isCityModelOpen) {
            return this.cityModal();
        } else if (
            this.state.selectedState === '' ||
            (this.state.selectedState === 'ALL' && this.state.selectedCity === '')
        ) {
            return this.listForAll();
        } else if (
            this.state.selectedCity === '' ||
            this.state.selectedCity === 'ALL'
        ) {
            return this.listForState();
        } else {
            return this.listForCity();
        }
    };
    shouldComponentUpdate(
        nextProps: Readonly<P>,
        nextState: Readonly<S>,
        nextContext: any,
    ): boolean {
        console.log(nextState);
        if (
            (nextState.isStateModelOpen === true ||
                nextState.isCityModelOpen === true ||
                nextState.selectedState !== '') &&
            nextState.selectedIndex === null
        ) {
            this.flatListRef &&
            this.flatListRef.scrollToOffset({animated: false, offset: 0});
        }
        return true;
    }

    render() {
        const {
            safeAreaView,
            mainView,
            containerView,
            headingView,
            headingButton,
            headingText,
            headingDisabledButton,
            disabledHeadingText,
            buttonImageView,
            buttonImageStyle,
            buttonTextView,
        } = styles;
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={safeAreaView}>
                    <ActivityIndicator size={'large'} />
                    <Text>Please wait</Text>
                </SafeAreaView>
            );
        }
        return (
            <SafeAreaView style={safeAreaView}>
                <AppHeader
                    title={'Help Center'}
                    onPress={() => this.props.navigation.openDrawer()}
                />
                <View style={mainView}>
                    {/*<View style={navigationView}>*/}

                    {/*</View>*/}
                    <ImageBackground
                        source={require('../Images/assets/screen_bg.png')}
                        resizeMode={'cover'}
                        style={{width: width, height: height}}>
                        <View style={headingView}>
                            <TouchableOpacity
                                style={[
                                    headingButton,
                                    {
                                        backgroundColor: this.state.isStateModelOpen
                                            ? color.red
                                            : color.purple,
                                    },
                                ]}
                                onPress={() => {
                                    this.setState({
                                        isStateModelOpen: true,
                                        isCityModalOpen: false,
                                        selectedState: '',
                                    });
                                }}>
                                <View style={buttonImageView}>
                                    <Image
                                        source={require('../Images/assets/state.png')}
                                        resizeMode={'contain'}
                                        style={buttonImageStyle}
                                    />
                                </View>
                                <View style={buttonTextView}>
                                    <Text style={headingText}>
                                        {this.state.selectedState === '' ||
                                        this.state.isStateModelOpen
                                            ? 'Select State/UTs'
                                            : this.state.selectedState.replace(/[^a-zA-Z ]/g, '')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({isCityModelOpen: true});
                                }}
                                style={
                                    this.state.selectedState === ''
                                        ? headingDisabledButton
                                        : [
                                            headingButton,
                                            {
                                                backgroundColor: this.state.isCityModelOpen
                                                    ? color.red
                                                    : color.purple,
                                            },
                                        ]
                                }
                                disabled={this.state.selectedState === ''}>
                                <View style={buttonImageView}>
                                    <Image
                                        source={
                                            this.state.selectedState === ''
                                                ? require('../Images/assets/city.png')
                                                : require('../Images/assets/city_white.png')
                                        }
                                        resizeMode={'contain'}
                                        style={buttonImageStyle}
                                    />
                                </View>
                                <View style={buttonTextView}>
                                    <Text
                                        style={
                                            this.state.selectedState === ''
                                                ? disabledHeadingText
                                                : headingText
                                        }>
                                        {this.state.selectedCity === '' ||
                                        this.state.isCityModelOpen
                                            ? 'Select City'
                                            : this.state.selectedCity.replace(/[^a-zA-Z ]/g, '')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={containerView}>{this.checkView()}</View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainView: {
        flex: 1,
        alignItems: 'center',
    },

    headingView: {
        marginRight: width * 0.02,
        marginLeft: width * 0.02,
        width: width * 0.9,
        height: '22%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    containerView: {
        width: '100%',
        height:
            isIOS === true
                ? height * 0.66 - SafeAreaInsets.safeAreaInsetsBottom
                : height * 0.65,
    },
    headingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        height: '65%',
        borderWidth: 1,
        borderRadius: width * 0.02,
        backgroundColor: color.purple,
    },

    headingDisabledButton: {
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        height: '65%',
        borderWidth: 1,
        borderRadius: width * 0.02,
    },
    buttonImageView: {
        height: '70%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextView: {
        height: '30%',
        width: '100%',
        alignItems: 'center',
    },
    buttonImageStyle: {
        width: '40%',
        height: '70%',
    },
    headingText: {
        fontSize: normalize(16),
        fontWeight: '500',
        color: color.white,
    },
    disabledHeadingText: {
        fontSize: normalize(16),
        fontWeight: '500',
        color: 'gray',
    },
    selectHeadingText: {
        fontSize: normalize(18),
        fontWeight: '500',
        color: color.purple,
    },
    highlightSelectHeadingText: {
        fontSize: normalize(18),
        fontWeight: '500',
        color: color.white,
    },
    modalView: {
        width,
        marginTop: height * 0.05,
        height: height * 0.95,
    },
    cancelButton: {
        fontWeight: '400',
        fontSize: height * 0.024,
        color: 'blue',
        marginTop: 10,
        marginLeft: 10,
    },
    innerModalHeadingView: {
        width,
        height: '10%',
        borderBottomWidth: 1,
    },
    innerModalView: {
        height: '85%',
        width,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    modalFlatListStyle: {
        width: '100%',
        height: '100%',
    },
    mainFlatListStyle: {
        width: '100%',
        height: '92%',
    },
    headerFlatListView: {
        width: '100%',
        height: '8%',
        backgroundColor: color.red,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listView: {
        width: width * 0.75,
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: color.lightGray,
        borderRadius: height * 0.01,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 5,
    },
    highlightListView: {
        width: width * 0.75,
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: color.red,
        borderRadius: height * 0.01,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 5,
    },
    listText: {
        fontSize: normalize(14),
        fontWeight: '500',
    },
    viewForStateList: {
        width,
        height: height * 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewForName: {
        width: '60%',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    viewForAdmission: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerFlatListText: {
        fontSize: normalize(13),
        fontWeight: '700',
        color: color.white,
    },
    collegeNameText: {
        fontSize: normalize(12),
        fontWeight: '500',
    },
    admissionCapacityText: {
        color: 'red',
        fontSize: normalize(12),
        fontWeight: '500',
    },
    hospitalBedText: {
        fontSize: normalize(12),
        fontWeight: '500',
        color: 'green',
    },
});
