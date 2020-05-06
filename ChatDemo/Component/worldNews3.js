import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Image,
    PixelRatio,
    Modal,
} from 'react-native';
import axios from 'axios';
import index from 'rn-fetch-blob';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
import {color} from '../Helper/themeHelper';

const scale = w / 375;

const normalize = size => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
export default class worldnewslist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            newsHeading: [],
            opacity: 0,
            url: [],
            newsContentArray: [],
            showDetailNewsFlag: false,
            scrollIndex: 0,
        };
    }
    getNews = () => {
        return new Promise(resolve => {
            axios.get('https://covidapi123.herokuapp.com/covid/api/getNewsHeadingWorld').then(res => {
                return resolve(res);
            });
        });
    };

    getNewsTitle = dataArray => {
        const data = {pageUrl: dataArray};

        return new Promise(resolve => {
            axios
                .post('https://covidapi123.herokuapp.com/covid/api/getNewsTitleWorld', data)
                .then(res => {
                    return resolve(res);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    };
    getNewsContetnt = url => {
        let finalurl = 'https://covidapi123.herokuapp.com/covid/api/getNewsContentWorld'
        const data = {pageUrl: url};
        console.log(url)
        return new Promise(resolve => {
            axios
                .post(finalurl, data)
                .then(res => {
                    return resolve(res);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    };

    showDetailNews = index => {
        this.getNewsContetnt(this.state.url[index]).then(res => {
            this.setState({newsContentArray: []});
            this.setState({newsContentArray: res.data});
            this.setState({showDetailNewsFlag: true});
        }).catch((err)=>{
            console.log(err)
        });
    };
    componentDidMount(): void {
        this.getNews().then((res)=>{
            this.setState({url: res.data});
            this.getNewsTitle(res.data).then((resp)=>{
                this.setState({newsHeading: resp.data});
            })
        })
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View
                        style={{
                            height: h * 0.3,
                            width: w,
                            marginTop: h * 0.02,
                            alignSelf: 'center',
                        }}>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            ref={node => (this.scroll = node)}
                            scrollEventThrottle={16}
                            nestedScrollEnabled={true}
                            pagingEnabled={true}
                            onMomentumScrollEnd={event => {
                                let i = event.nativeEvent.contentOffset.x / w;
                                this.setState({...this.state, scrollIndex: i});
                            }}
                            horizontal={true}>
                            <View style={{flex: 1, width: w, height: null}}>
                                <Image
                                    style={{
                                        width: w - 40,
                                        height: h * 0.3,
                                        alignSelf: 'center',
                                        borderRadius: h * 0.01,
                                    }}
                                    source={require('../Images/whoImage1.jpeg')}
                                />
                            </View>
                            <View style={{flex: 1, width: w, height: null}}>
                                <Image
                                    style={{
                                        width: w - 40,
                                        height: h * 0.3,
                                        alignSelf: 'center',
                                        borderRadius: h * 0.01,
                                    }}
                                    source={require('../Images/whoImage2.jpeg')}
                                />
                            </View>
                            <View style={{flex: 1, width: w, height: null}}>
                                <Image
                                    style={{
                                        width: w - 40,
                                        height: h * 0.3,
                                        alignSelf: 'center',
                                        borderRadius: h * 0.01,
                                    }}
                                    source={require('../Images/whoImage3.jpeg')}
                                />
                            </View>
                            <View style={{flex: 1, width: w, height: null}}>
                                <Image
                                    style={{
                                        width: w - 40,
                                        height: h * 0.3,
                                        alignSelf: 'center',
                                        borderRadius: h * 0.01,
                                    }}
                                    source={require('../Images/whoImage4.jpeg')}
                                />
                            </View>
                            <View style={{flex: 1, width: w, height: null}}>
                                <Image
                                    style={{
                                        width: w - 40,
                                        height: h * 0.4,
                                        alignSelf: 'center',
                                        borderRadius: h * 0.01,
                                    }}
                                    source={require('../Images/whoImage5.jpeg')}
                                />
                            </View>
                        </ScrollView>
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                position: 'absolute',
                                alignSelf: 'center',
                                bottom: h * 0.02,
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.scroll.scrollTo({x: 0});
                                }}>
                                <View
                                    style={{
                                        height: h * 0.015,
                                        backgroundColor:
                                            this.state.scrollIndex === 0 ? 'red' : 'gray',
                                        width: h * 0.015,
                                        borderRadius: h * 0.0075,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.scroll.scrollTo({x: w});
                                }}>
                                <View
                                    style={{
                                        height: h * 0.015,
                                        backgroundColor:
                                            this.state.scrollIndex === 1 ? 'red' : 'gray',
                                        width: h * 0.015,
                                        borderRadius: h * 0.0075,
                                        marginLeft: w * 0.03,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.scroll.scrollTo({x: w * 2});
                                }}>
                                <View
                                    style={{
                                        height: h * 0.015,
                                        backgroundColor:
                                            this.state.scrollIndex === 2 ? 'red' : 'gray',
                                        width: h * 0.015,
                                        borderRadius: h * 0.0075,
                                        marginLeft: w * 0.03,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.scroll.scrollTo({x: w * 3});
                                }}>
                                <View
                                    style={{
                                        height: h * 0.015,
                                        backgroundColor:
                                            this.state.scrollIndex === 3 ? 'red' : 'gray',
                                        width: h * 0.015,
                                        borderRadius: h * 0.0075,
                                        marginLeft: w * 0.03,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.scroll.scrollTo({x: w * 4});
                                }}>
                                <View
                                    style={{
                                        height: h * 0.015,
                                        backgroundColor:
                                            this.state.scrollIndex === 4 ? 'red' : 'gray',
                                        width: h * 0.015,
                                        borderRadius: h * 0.0075,
                                        marginLeft: w * 0.03,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>



                    <Text
                        style={{
                            fontSize: normalize(18),
                            color: color.purple,
                            fontWeight: 'bold',
                            marginTop: h * 0.01,
                            marginLeft: w * 0.02,
                        }}>
                        News Headlines
                    </Text>
                    <ScrollView style={{flex: 1}}>
                        <View style={{flex: 1, padding: h * 0.01}}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{flex: 1}}
                                nestedScrollEnabled={true}>

                                {this.state.newsHeading.map((data, index) => {

                                    return (
                                        <TouchableOpacity
                                            onPress={() => this.showDetailNews(index)}>
                                            <View
                                                key={index}
                                                style={{
                                                    height: h * 0.15,
                                                    width: w - 40,
                                                    alignSelf: 'center',
                                                    marginTop: h * 0.01,
                                                    backgroundColor: 'lightgray',
                                                    borderRadius: 5,
                                                }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        height: h * 0.05,
                                                        marginTop: 5,
                                                        marginLeft: 5,
                                                    }}>
                                                    <Image
                                                        source={require('../Images/whoLogo.png')}
                                                        style={{
                                                            height: h * 0.05,
                                                            width: h * 0.05,
                                                            borderRadius: h * 0.025,
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: normalize(15),
                                                            fontWeight: 'bold',
                                                            marginTop: h * 0.01,
                                                            marginLeft: 10,
                                                        }}>
                                                        Coronavirus
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        height: h * 0.04,
                                                        width: w - 80,
                                                        marginLeft: 30,
                                                        paddingHorizontal: 10,
                                                    }}>
                                                    <Text
                                                        numberOfLines={2}
                                                        ellipsizeMode={'tail'}
                                                        style={{
                                                            fontSize: normalize(14),
                                                            textAlign: 'left',
                                                        }}>
                                                        {/*{data}*/}
                                                        {/*{console.log(data)}*/}

                                                        {data.replace(/[^a-zA-Z ]/g, '').trim()}
                                                    </Text>
                                                </View>
                                                <Text
                                                    style={{
                                                        alignSelf: 'flex-end',
                                                        color: 'blue',
                                                        marginTop: 8,
                                                        marginRight: 5,
                                                        fontSize: normalize(12),
                                                    }}>
                                                    Read More
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>

                            <Text
                                style={{
                                    textAlign: 'right',
                                    fontSize: normalize(15),
                                    padding: h * 0.02,
                                    fontWeight: '500',
                                }}>
                                Source:-WHO(World health organization)
                            </Text>

                            {this.state.showDetailNewsFlag && (
                                <Modal visible={true} animated={true} transparent={false}>
                                    <SafeAreaView style={{flex: 1}}>
                                        <View style={{flex: 1}}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    padding: h * 0.005,
                                                }}>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({showDetailNewsFlag: false})
                                                    }>
                                                    <Text style={{fontSize: normalize(16),fontWeight:'600'}}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View
                                                style={{
                                                    flex: 9,
                                                    borderTopWidth: h * 0.001,
                                                    padding: 10,
                                                }}>
                                                <ScrollView style={{flex: 1}}>
                                                    {this.state.newsContentArray.map((data, index) => {
                                                        if (index < 7) {
                                                            return (
                                                                <View style={{marginTop: h * 0.0001}}>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: normalize(15),
                                                                            textAlign: 'left',
                                                                        }}>
                                                                        {data}

                                                                        {/*{data.replace(/[^a-zA-Z ]/g, '').trim()}*/}
                                                                    </Text>
                                                                </View>
                                                            );
                                                        }
                                                    })}
                                                </ScrollView>
                                            </View>
                                        </View>
                                    </SafeAreaView>
                                </Modal>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({});
