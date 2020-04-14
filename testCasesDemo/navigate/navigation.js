import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// import {createStackNavigator} from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import counterDemo from '../components/counterDemo';
import loginPage from '../components/loginPage';
import AddTodo from '../components/AddTodo';
import updateAsyn from '../components/updateAsyn';
import test1 from '../components/test1';
const stack = createStackNavigator({
    test1,loginPage,AddTodo,counterDemo,updateAsyn
})
const AppContainer = createAppContainer(stack);
export default AppContainer;

