import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import homePage from '../Component/homePage';
import loginPage from '../Component/LoginPage'
import RegisterPage from '../Component/RegisterPage'
import ChatPage from '../Component/ChatPage'
import ChatPage1 from '../Component/ChatPage1'
import rnFecthDemo from '../Component/rnFecthDemo';
import barChartDemo from '../Component/barChartDemo';

import Drawer from '../Navigator/DrawerNavigation'
import Tabs from '../Navigator/tabForHOmePage'

import DrawerTemp from '../Navigator/DrawerTemp'
import DeathDataDemo from '../Component/deathDataDemo'

import MapDemo from '../Component/mapDemo'

import StatInfo from '../Component/stateDetailsPage'


import HelpCenter from '../Component/helpCenterDetail'
import IndiaNews from '../Component/indiaNews'
import WorldNews from '../Component/worldNews'
import NewsPage from '../Component/newsPage'

import WoroldNewsTemp2 from '../Component/worldNews2'
import ResponseRecovery from '../Component/recoveryResponse'
import IndiaNews2 from '../Component/indiaNews2'
import IndiaNews3 from '../Component/indiaNews3'
import safetyPage from '../Component/safetyFromCorona'
import LiveCoverage from '../Component/liveCoverage'

const stack = createStackNavigator({
    DrawerTemp,LiveCoverage,safetyPage,IndiaNews3,IndiaNews2,ResponseRecovery,WoroldNewsTemp2,NewsPage,WorldNews,IndiaNews,HelpCenter,MapDemo,Drawer,Tabs,loginPage,barChartDemo,rnFecthDemo,homePage, ChatPage,RegisterPage,ChatPage1,StatInfo
},{
    headerMode:'none',

    navigationOptions:{
        headerVisible:false,

    }
})
const AppContainer = createAppContainer(stack);
export default AppContainer;
