import React, { useState,useEffect } from 'react'
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Dashboard/Home/Home';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-lottie-splash-screen';
import { instantiateAbort, cleanUpData } from './helpers/componentHelperFunc';
import LoadingScreen from './pages/LoadingScreen/LoadingScreen';

import {StatusBar} from 'react-native';
import { COLORS } from "./constants";



const Stack = createStackNavigator();

export default function Main() {

  const abortEffect = instantiateAbort(); 


  useEffect(() => {
   SplashScreen.hide();
  }, []);


    

    return (
        <NavigationContainer>
         <StatusBar backgroundColor={COLORS.primary} />
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
       <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
       <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login"     component={Login} />  
      <Stack.Screen name="Dashboard"     component={Home} />
     
    </Stack.Navigator>
  </NavigationContainer>
    )
}
