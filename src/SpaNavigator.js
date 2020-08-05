import React, { Component } from 'react';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { enableScreens } from 'react-native-screens';
import OnBoarding from './components/OnBoarding';
import HomeTab from './components/HomeTab';

const Stack = createStackNavigator();
enableScreens();

//const config = {
//  config: {
//    duration: 150
//  }
//}

//export default function SpaNavigator() {
//  return (
//    <NavigationContainer>
//      <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ transitionSpec: {
//        open: config,
//        close: config
//      } }}>
//        <Stack.Screen name="OnBoarding" component={OnBoarding} />
//        <Stack.Screen name="Home" component={HomeTab} />
//      </Stack.Navigator>
//    </NavigationContainer>
//  );
//
//}

const SpaNavigator = () => {
    return (
        <OnBoarding/>
    );
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: SpaNavigator
  }
});

export default createAppContainer(AppNavigator);
