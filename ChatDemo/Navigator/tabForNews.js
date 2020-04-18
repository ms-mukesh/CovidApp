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
import IndiaNewsTemp from '../Component/indiaNews3'

import AppHeader from '../Component/appHeader';
import {color,normalize,screenWidth,screenHeight} from '../Helper/themeHelper'

const Tab = createMaterialTopTabNavigator();

const tabs=({ state, descriptors, navigation, position })=>{
    return(
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = Animated.interpolate(position, {
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                });

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <Animated.Text style={{ opacity }}>
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

function App() {
    return (


            <Tab.Navigator tabBarOptions={{
                activeTintColor: 'red',
                style:{backgroundColor:color.purple},
                labelStyle: {fontSize: normalize(15),color:'white',fontWeight:'bold',backgroundColor: 'red',padding:screenHeight*0.01,width:screenWidth*0.4,  },
                tabStyle:{borderRadius: 100}
            }}>
                <Tab.Screen style={{backgroundColor:'red'}} name="India News" component={IndiaNewsTemp} />
                <Tab.Screen name="Global News" component={WorldNewsTemp} />
            </Tab.Navigator>

    );
}

export default App;
