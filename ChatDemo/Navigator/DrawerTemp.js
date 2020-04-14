import * as React from 'react';
import {
    Button,
    View,
    Text,
    TouchableOpacity,
    Image, AsyncStorage,
    ScrollView, StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';



import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {hp, normalize, wp, color, font, isANDROID, headerColorArray} from '../Helper/themeHelper';
import {center, shadowStyle} from '../Helper/styles';
const Drawer = createDrawerNavigator();

import WebViewDemo from '../Component/webViewDemo';
import coronaMeterTemp from '../Component/coronaMeterTemp';
import coronaMeterIndiaTemp from '../Component/coronaMeterIndiaTemp';
import IndiaGraphPage from '../Component/indiaGraphPage';
import HelpCentre from '../Component/helpCenterDetail'
import StateInfo from '../Component/stateDetailsPage'
// import StateInfo from '../Component/stateDetailsPageTemp'
import IndiaMap from '../Component/mapDemo'

import NewsTab from '../Navigator/tabForNews'
import NewsPage from '../Component/newsPage';


import SafeAreaView from 'react-native-safe-area-view';
import {NavigationContainer} from '@react-navigation/native';

const DrawerItems = [{
    IconTag: AntDesign, icon: 'flag', title: 'Corona Meter(India)', urlToPage:'Corona meter(INDIA)'
}, {
    IconTag: Fontisto, icon: 'world-o', title: 'Corona Meter(Global)', urlToPage:'Corona meter(Global)'
},
    {
        IconTag: FontAwesome5, icon: 'hospital', title: 'Help Centers',urlToPage:'HelpCentre'
    },
    ,
    {
        IconTag: Entypo, icon: 'news', title: 'News',urlToPage:'NewsPage'
    },
    {
        IconTag: Entypo, icon: 'bar-graph', title: 'Chart-Graph',urlToPage:'Graph'
    },

    {
        IconTag: Entypo, icon: 'location', title: 'Map View(India)',urlToPage:'IndiaMap'
    },
    {
        IconTag: Fontisto, icon: 'earth', title: 'Globe',urlToPage:'World map'
    },
];

let temp=0;
const renderRow = (props, index) => {
    const {drawerRow, rowText} = style;
    const {IconTag,icon, title,urlToPage} = props;
    return(
        <>
            <TouchableOpacity key={index} style={drawerRow} onPress={() => {
                props.navigation.navigate(urlToPage)
                temp=index
            }}>
                <View style={{ backgroundColor: index===temp?color.gray:color.white, paddingLeft: wp(6), paddingRight: wp(3),
                    marginVertical: hp(0.3), paddingVertical: hp(0.8), borderBottomRightRadius: wp(5), borderTopRightRadius: wp(5)}}>
                    <IconTag name={icon} size={hp(3)} color={color.blue}/>
                </View>
                <Text style={rowText}>{title}</Text>
            </TouchableOpacity>
            {/*{(index === DrawerItems.length - 2) && <View style={{flex: 1}}/>}*/}
        </>
    )
}
const DrawerContent = props => {
    const {headerText, drawerRow, rowText} = style;
    return (
        <SafeAreaView style={{flex:1, overflow: 'hidden', backgroundColor: 'lightblue'}} forceInset={{ top: 'always', bottom: 'never' }}>
            <View style={{...center, paddingVertical: hp(2), backgroundColor: 'lightblue'}}>
                <Image style={{height:hp(10),width:hp(10),borderRadius:hp(5),
                    borderWidth: wp(0), backgroundColor: color.lightGray, borderColor: color.lightBlue
                }} source={require('../Images/virusIcon.png')}/>
                <Text style={headerText}>Covid Counter</Text>
                <Text style={{fontSize:normalize(15),color:'orange',fontWeight:'bold'}}>From Lanet Team</Text>
            </View>
            <View style={{flexDirection: 'row', height: hp(1),backgroundColor:'white'}}>
            </View>
            <View style={{flex: 1, backgroundColor: color.white, paddingVertical: hp(5)}}>
                {DrawerItems.map((item, index) => renderRow({...props, ...item}, index))}
            </View>
        </SafeAreaView>
    );
};
const DrawerNavigation = (props) => {
    return (
        <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
                          drawerStyle={{width: wp(65)}}
                          backBehavior={'history'}
        >
            <Drawer.Screen name="Corona meter(INDIA)" component={coronaMeterIndiaTemp} />
            <Drawer.Screen name="Corona meter(Global)" component={coronaMeterTemp} />
            <Drawer.Screen name="World map" component={WebViewDemo} />
            <Drawer.Screen name="Graph" component={IndiaGraphPage} />
            <Drawer.Screen name="StateInfo" component={StateInfo} />
            <Drawer.Screen name="IndiaMap" component={IndiaMap} />
            <Drawer.Screen name="HelpCentre" component={HelpCentre} />
            <Drawer.Screen name="NewsPage" component={NewsPage} />

        </Drawer.Navigator>
        </NavigationContainer>

    );
};

const style = StyleSheet.create({
    headerText: {
        fontSize: normalize(18),

        marginTop: hp(2),
        color: color.white
    },
    drawerRow: {
        backgroundColor: color.white,
        flexDirection: 'row',marginTop: hp(.5), ...center, justifyContent: 'flex-start'
    },
    rowText: {
        color: color.blue,
        fontSize: normalize(14),

        marginLeft: wp(5)
    }
})

export default DrawerNavigation;
