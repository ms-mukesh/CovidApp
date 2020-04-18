import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    Modal,
    TouchableOpacity, ActivityIndicator, ScrollView, Platform,ImageBackground
} from 'react-native';
import YouTube from 'react-native-youtube';

import axios from 'axios';
import { withNavigationFocus } from 'react-navigation'
import AppHeader from '../Component/appHeader';
const {width, height} = Dimensions.get('window');
let tempForScreen=0;
export class MediaPlayer extends Component {
    constructor(props) {
        super(props);
        this.link = '';
        this.state = {
            patienceData: [],
            isModalOpen: false,
            renderFlag:true
        };
    }

    getInformation=()=>{
        return new Promise((resolve=>{
            axios.get('https://covidapi123.herokuapp.com/covid/api/getRecoverPatients')
                .then((res)=>{
                    return resolve(res);
                });
        }))
    }
    componentDidMount(): void {
        this.getInformation().then((res)=>{
            this.setState({patienceData:res.data})
            this.setState({renderFlag:false})
            console.log(this.state.patienceData)
        })
    }
    moveTOHome=()=>{
        console.log("called")
            this.setState({isModalOpen:false})
            tempForScreen=0;
    }

    modal() {
        const {innerModalHeadingView, cancelButton, modalView} = styles;
        return (
            <Modal
                visible={this.state.isModalOpen}
                animationType={'slide'}
                onRequestClose={() => this.setState({isModalOpen: false})}>
                <View style={modalView}>
                    <View style={innerModalHeadingView}>
                        <TouchableOpacity
                            onPress={() => this.setState({isModalOpen: false})}>
                            <Text style={cancelButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <YouTube
                        apiKey={'AIzaSyACC6bLl_ZOutsLShSbh8jVPje_e74Lqsc'}
                        videoId={this.link.toString()} // The YouTube video ID*/}
                        play // control playback of video with true/false
                        fullscreen= {Platform.OS === 'android'} // control whether the video should play in fullscreen or inline
                        onReady={e => this.setState({isReady: true})}
                        onChangeState={e => this.setState({status: e.state})}
                        onChangeQuality={e => this.setState({quality: e.quality})}
                        onError={e => console.log(e)}
                        style={{alignSelf: 'stretch', height: 300}}
                        resumePlayAndroid={false}
                        controls={1}
                        onChangeFullscreen={Platform.OS==='android'?()=>tempForScreen==0?tempForScreen=tempForScreen+1:this.moveTOHome():console.log('called')}
                    />
                </View>
            </Modal>
        );
    }
    renderView(item) {
        const {
            imageView,
            containerStyle,
            detailView,
            imageStyle,
            lengthText,
            lengthView,
            titleText,
            titleView,
        } = styles;
        return (
            // <View>
            //     <Text>{item.link}</Text>
            // </View>
            <TouchableWithoutFeedback
                onPress={() => {
                    this.link = item.link;
                    this.setState({isModalOpen: true});

                }}>
                <View style={containerStyle}>
                    <View style={imageView}>
                        <Image style={imageStyle} source={{uri: item.image}} />
                    </View>
                    <View style={detailView}>
                        <View style={titleView}>
                            <Text ellipsizeMode={'tail'} numberOfLines={2} style={titleText}>{item.title}</Text>
                        </View>
                        <View style={lengthView}>
                            <Text style={lengthText}>{item.length}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    render() {
        const {
            safeAreaView,
            mainView,
            headingText,
            headingView,
            flatListView,
        } = styles;

        return (
            <SafeAreaView style={safeAreaView}>
                <AppHeader title={'Patients Expereince'} onPress={()=>this.props.navigation.openDrawer()}/>
                <ImageBackground source={require('../Images/assets/screen_bg.png')} style={{flex:1}}>
                <View style={mainView}>
                    <View style={headingView}>
                        <Text style={headingText}>Experience of Recovered Patients</Text>
                    </View>
                    <View style={flatListView}>
                        <FlatList
                            style={flatListView}
                            data={this.state.patienceData}
                            renderItem={({item}) => this.renderView(item)}
                        />
                    </View>
                    {this.modal()}
                    { this.state.renderFlag &&
                    <Modal visible={true} animated={false} transparent={true}>
                        <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="black" animating={this.state.renderFlag}  />
                        </SafeAreaView>
                    </Modal>
                    }
                </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    mainView: {
        flex: 1,
    },
    headingView: {
        width,
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },
    flatListView: {
        width,
        height: '90%',
    },
    containerStyle: {
        width:width-30,
        height: height * 0.40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: height*.0017,
        marginTop: '3%',
        marginBottom: '3%',
        padding:height*.010,
        alignSelf:'center'
    },
    imageView: {
        width:width-50,
        height: '80%',
        alignSelf: 'center'
    },
    imageStyle: {
        width:width-50,
        height: '100%',
        borderRadius:10
    },
    detailView: {
        width:width-50,
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleView: {
        width: '80%',
        height: '100%',
        justifyContent: 'center',
    },
    lengthView: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: width * 0.04,
        fontWeight: '500',
    },
    lengthText: {
        fontSize: width * 0.035,
        fontWeight: '400',
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
        marginRight: 10,
    },
    innerModalHeadingView: {
        width,
        height: '10%',
        borderBottomWidth: 5,
        alignItems: 'flex-end',
    },
});

export default MediaPlayer;
