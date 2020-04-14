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
} from 'react-native';
import axios from 'axios';
import AppHeader from '../Component/appHeader'
import Icon from 'react-native-vector-icons/AntDesign';



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
        this.state = {
            selectedState: '',
            selectedCity: '',
            isStateModelOpen: false,
            isCityModelOpen: false,
            isLoading: true,
        };
    }

    componentDidMount(): void {
        this.fetchDataFromServer();
    }

    stateListView(items, isState) {
        const {headingText, listView} = styles;
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    if (isState) {
                        this.setState({selectedState: items.item});
                        this.setState({isStateModelOpen: false});
                        this.setState({selectedCity: ''});
                    } else {
                        this.setState({selectedCity: items.item});
                        this.setState({isCityModelOpen: false});
                    }
                }}>
                <View style={listView}>
                    <Text style={headingText}>{items.item}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    stateModal() {
        const {
            modalView,
            cancelButton,
            innerModalHeadingView,
            innerModalView,
            modalFlatListStyle,
        } = styles;
        return (
            <Modal
                visible={this.state.isStateModelOpen}
                animationType={'slide'}
                onRequestClose={() => this.setState({isStateModelOpen: false})}>
                <View style={modalView}>
                    <View style={innerModalHeadingView}>
                        <TouchableOpacity
                            onPress={() => this.setState({isStateModelOpen: false})}>
                            <Text style={cancelButton}>Cancel</Text>
                        </TouchableOpacity>
                        <Text
                            style={{alignSelf: 'center', fontSize: normalize(16), fontWeight: 'bold',marginTop:-(height*.020)}}>
                            Please Select State
                        </Text>
                    </View>
                    <View style={innerModalView}>
                        <FlatList
                            style={modalFlatListStyle}
                            data={this.states}
                            keyExtractor={item => item}
                            renderItem={items => this.stateListView(items, true)}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    cityModal() {
        const {
            modalView,
            cancelButton,
            innerModalHeadingView,
            innerModalView,
            modalFlatListStyle,
        } = styles;
        if (this.state.selectedState !== '') {
            const cityObj = this.cities.find(o => o.key === this.state.selectedState);
            return (
                <Modal
                    visible={this.state.isCityModelOpen}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({isCityModelOpen: false})}>
                    <View style={modalView}>
                        <View style={innerModalHeadingView}>
                            <TouchableOpacity
                                onPress={() => this.setState({isCityModelOpen: false})}>
                                <Text style={cancelButton}>Cancel</Text>
                            </TouchableOpacity>
                            <Text
                                style={{alignSelf: 'center', fontSize: normalize(16), fontWeight: '700',marginTop:-(height*.020)}}>
                                Please Select City
                            </Text>
                        </View>
                        <View style={innerModalView}>
                            <FlatList
                                style={modalFlatListStyle}
                                data={cityObj.data.sort()}
                                keyExtractor={item => item}
                                renderItem={items => this.stateListView(items, false)}
                            />
                        </View>
                    </View>
                </Modal>
            );
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

    listForState() {
        const {
            viewForAdmission,
            viewForName,
            viewForStateList,
            mainFlatListStyle,
            headerFlatListText,
            hospitalBedText,
            collegeNameText,
            headerFlatListView,
        } = styles;
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
        return (
            <View>
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
                <FlatList
                    style={mainFlatListStyle}
                    data={tempData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={items => (
                        <View style={viewForStateList}>
                            <View style={viewForName}>
                                <Text style={collegeNameText}>{items.item.name}</Text>
                            </View>
                            <View style={viewForAdmission}>
                                <Text style={collegeNameText}>
                                    {items.item.admissionCapacity}
                                </Text>
                            </View>
                            <View style={viewForAdmission}>
                                <Text style={hospitalBedText}>{items.item.hospitalBeds} </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }

    listForCity() {
        const {
            viewForAdmission,
            viewForName,
            viewForStateList,
            mainFlatListStyle,
            headerFlatListView,
            headerFlatListText,
            collegeNameText,
            hospitalBedText,
        } = styles;
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
        return (
            <View>
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

                <FlatList
                    style={mainFlatListStyle}
                    data={tempData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={items => (
                        <View style={viewForStateList}>
                            <View style={viewForName}>
                                <Text style={collegeNameText}>{items.item.name}</Text>
                            </View>
                            <View style={viewForAdmission}>
                                <Text style={collegeNameText}>
                                    {items.item.admissionCapacity}
                                </Text>
                            </View>
                            <View style={viewForAdmission}>
                                <Text style={hospitalBedText}>{items.item.hospitalBeds}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
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
                <AppHeader title={'Help Center '} onPress={()=>this.props.navigation.openDrawer()}/>

                <View style={mainView}>
                    <View style={headingView}>
                        <TouchableOpacity
                            style={headingButton}
                            onPress={() => {
                                this.setState({isStateModelOpen: true});
                            }}>
                            <Text style={headingText}>
                                {this.state.selectedState === ''
                                    ? 'Select State'
                                    : this.state.selectedState}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({isCityModelOpen: true});
                            }}
                            style={
                                this.state.selectedState === ''
                                    ? headingDisabledButton
                                    : headingButton
                            }
                            disabled={this.state.selectedState === ''}>
                            <Text
                                style={
                                    this.state.selectedState === ''
                                        ? disabledHeadingText
                                        : headingText
                                }>
                                {this.state.selectedCity === ''
                                    ? 'Select City'
                                    : this.state.selectedCity}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {this.stateModal()}
                    {this.cityModal()}
                    <View style={containerView}>
                        {this.state.selectedState === '' &&
                        this.state.selectedCity === '' ? (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width,
                                    height: '100%',
                                }}>
                                <Icon name={'search1'} size={height*.07}/>
                                <Text style={{fontWeight:'bold'}}>Select State to get result</Text>
                            </View>
                        ) : this.state.selectedCity === '' ? (
                            this.listForState()
                        ) : (
                            this.listForCity()
                        )}
                    </View>
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
    },
    headingView: {
        marginRight: width * 0.02,
        marginLeft: width * 0.02,
        width: width * 0.96,
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'green',
        alignSelf: 'center',
    },
    containerView: {
        marginHorizontal: width * 0.02,
        width: '98%',
        height: '92%',
    },
    headingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.45,
        height: '60%',
        borderWidth: 1,
        borderRadius: width * 0.02,
    },
    headingDisabledButton: {
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.45,
        height: '60%',
        borderWidth: 1,
        borderRadius: width * 0.02,
    },
    headingText: {
        fontSize: height * 0.02,
        fontWeight: '500',
    },
    disabledHeadingText: {
        fontSize: height * 0.02,
        fontWeight: '300',
        color: 'gray',
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
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'center',
    },
    listView: {
        width: width - 40,
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40,
        marginRight: 40,
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: height * 0.01,
    },
    listText: {
        fontSize: height * 0.02,
        fontWeight: '500',
    },
    viewForStateList: {
        width,
        height: height * 0.07,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    viewForName: {
        width: '60%',
        height: height * 0.07,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    viewForAdmission: {
        width: '20%',
        height: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerFlatListText: {
        fontSize: width * 0.037,
        fontWeight: '700',
    },
    collegeNameText: {
        fontSize: width * 0.033,
        fontWeight: '500',
    },
    hospitalBedText: {
        fontSize: width * 0.033,
        fontWeight: '500',
        color: 'green',
    },
});
