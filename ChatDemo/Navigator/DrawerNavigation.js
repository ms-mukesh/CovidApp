import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import rnFecthDemo from '../Component/rnFecthDemo';
import barChartDemo from '../Component/barChartDemo';

import indiaStatus from '../Component/indiaStatus';
import gujStatus from '../Component/gujStatus';
import coronaMeter from '../Component/coronaMeter';

import WebViewDemo from '../Component/webViewDemo';

import coronaMeterIndia from '../Component/coronaMeterIndia';

import coronaMeterTemp from '../Component/coronaMeterTemp';
import coronaMeterIndiaTemp from '../Component/coronaMeterIndiaTemp';

import IndiaGraphPage from '../Component/indiaGraphPage';

import StateInfo from '../Component/stateDetailsPage';
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="coronaMeterIndiaTemp">
        <Drawer.Screen
          name="Corona meter(INDIA)"
          component={coronaMeterIndiaTemp}
        />
        <Drawer.Screen
          name="Corona meter(Global)"
          component={coronaMeterTemp}
        />
        <Drawer.Screen name="World map" component={WebViewDemo} />
        <Drawer.Screen name="Graph" component={IndiaGraphPage} />
        <Drawer.Screen name="StateInfo" component={StateInfo} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
