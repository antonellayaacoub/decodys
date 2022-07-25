import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreatePatient from '../CreatePatient';
import ViewPatient from '../ViewPatient';
import PatientSearch from '../PatientSearch';
import ViewSinglePatient from '../ViewSinglePatient';
import ViewSingleTest from '../ViewSingleTest';
import EditPatient from '../EditPatient';
import Tests from '../Tests';
import MiniTests from '../MiniTests';
import Test1 from '../Test1';
import Test2 from '../Test2';
import Test3 from '../Test3';
import Test4 from '../Test4';
import Test5 from '../Test5';
import Test6 from '../Test6';
import Test7 from '../Test7';
import Test8 from '../Test8';
import Test9 from '../Test9';
import Test10 from '../Test10';
import Test11 from '../Test11';
import {HttpInterceptor} from '../../../HttpInterceptor';
import {useNavigation} from '@react-navigation/native';
import {
  cleanUpData,
  instantiateAbort,
} from '../../../helpers/componentHelperFunc';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {resetTokenExpirationValue} from '../../../store/actions/AuthAction';
import {COLORS, SIZES} from '../../../constants';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function tabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingBottom: 10,
          height: 65,
          backgroundColor: COLORS.primary,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.accent,
      }}>
      <Tab.Screen
        name="CreatePatient"
        options={{
          tabBarLabel: 'New Patient',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-add-circle" color={color} size={26} />
          ),
        }}
        component={CreatePatient}
      />

      <Tab.Screen
        name="ViewPatient"
        options={{
          tabBarLabel: 'View Patient',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-eye" color={color} size={26} />
          ),
        }}
        component={ViewPatient}
      />
    </Tab.Navigator>
  );
}

export default function Home() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const tokenExpirationState = useSelector(
    state => state.authReducer.tokenExpired,
  );

  const abortEffect = instantiateAbort();

  useEffect(() => {
    if (tokenExpirationState == true) {
      Alert.alert('Token Expired', 'Oops! your token has expired', [
        {
          text: 'OK',
          onPress: () => console.log('token expired'),
        },
      ]);
      dispatch(resetTokenExpirationValue());
      navigation.navigate('Login');
      EditPatient;
    }
    return () => {
      cleanUpData(abortEffect);
    };
  }, [tokenExpirationState]);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabs" component={tabNavigation} />
        <Stack.Screen name="SearchPatientModal" component={PatientSearch} />
        <Stack.Screen name="ViewSinglePatient" component={ViewSinglePatient} />
        <Stack.Screen name="EditPatient" component={EditPatient} />
        <Stack.Screen name="Tests" component={Tests} />
        <Stack.Screen name="MiniTests" component={MiniTests} />
        <Stack.Screen name="Test1" component={Test1} />
        <Stack.Screen name="Test2" component={Test2} />
        <Stack.Screen name="Test3" component={Test3} />
        <Stack.Screen name="Test4" component={Test4} />
        <Stack.Screen name="Test5" component={Test5} />
        <Stack.Screen name="Test6" component={Test6} />
        <Stack.Screen name="Test7" component={Test7} />
        <Stack.Screen name="Test8" component={Test8} />
        <Stack.Screen name="Test9" component={Test9} />
        <Stack.Screen name="Test10" component={Test10} />
        <Stack.Screen name="Test11" component={Test11} />
        <Stack.Screen name="ViewSingleTest" component={ViewSingleTest} />
      </Stack.Navigator>
    </>
  );
}
