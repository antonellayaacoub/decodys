import React,{useEffect} from 'react'
import Main from './src/Main'
import { Provider } from 'react-redux';
import { store } from './src/CreateStore';
import {Root} from 'native-base';
import { COLORS } from "./src/constants";

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StatusBar} from 'react-native';

import SplashScreen from 'react-native-lottie-splash-screen';

AntDesign.loadFont().then();
Ionicons.loadFont().then();
Feather.loadFont().then();
MaterialIcons.loadFont().then()


// @TODO: This is to hide a Warning caused by NativeBase after upgrading to RN 0.62
import { YellowBox } from 'react-native'


YellowBox.ignoreWarnings([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
])
// ------- END OF WARNING SUPPRESSION
console.disableYellowBox = true;
export default function App() {

  React.useEffect(() => {
    SplashScreen.hide(); // here
  }, []);

  return (
    <Provider store={store}>
      <Root>
    <Main/>
    </Root>
    </Provider>
  )
}
