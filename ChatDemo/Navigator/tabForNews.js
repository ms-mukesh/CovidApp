import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator } from '@react-navigation/drawer';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



import rnFecthDemo from '../Component/rnFecthDemo';
import barChartDemo from '../Component/barChartDemo';

import indiaStatus from '../Component/indiaStatus';
import gujStatus from '../Component/gujStatus';
import coronaMeter from '../Component/coronaMeter';

import WebViewDemo from '../Component/webViewDemo';

import coronaMeterIndia from '../Component/coronaMeterIndia';

import IndiaNews from '../Component/indiaNews'
import WorldNews from '../Component/worldNews'
import WorldNewsTemp from '../Component/worldNews2'
import AppHeader from '../Component/appHeader';

const Tab = createMaterialTopTabNavigator();

function App() {
    return (

            <Tab.Navigator>
                <Tab.Screen name="India News" component={IndiaNews} />
                <Tab.Screen name="Global News" component={WorldNewsTemp} />
            </Tab.Navigator>

    );
}

export default App;
