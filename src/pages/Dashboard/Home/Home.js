import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreatePatient from '../CreatePatient';
import ViewPatient from '../ViewPatient';
import PatientSearch from '../PatientSearch';
import ViewSinglePatient from '../ViewSinglePatient';
import EditPatient from '../EditPatient';
import Tests from '../Tests';
import MiniTests from '../MiniTests';
import Test1 from '../Test1';
import Test2 from '../Test2';
import Test4 from '../Test4';
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
        tabBarInactiveTintColor:COLORS.accent,
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
        <Stack.Screen name="Test4" component={Test4} />
      </Stack.Navigator>
    </>
  );
}
