import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import DecodysButton from '../../../../Components/DecodysButton';
import {Overlay} from 'react-native-elements';
import { useNavigation,useFocusEffect,useRoute} from '@react-navigation/native';
import { styles } from '../styles'
export default function MiniTests() {
  
  const navigation = useNavigation();
  return (
    <>

        <ScrollView
          style={styles.bottomSection}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
           
            <DecodysButton
              buttonFunction={() => navigation.navigate('Test1')}
              bgcolor="#fff"
              text="Test 1"
              color={'#0ACBC5'}
              outline={true}
            />
            <DecodysButton
              buttonFunction={() => navigation.navigate('Test2')}
              bgcolor="#fff"
              text="Test 2"
              color={'#0ACBC5'}
              outline={true}
            />
              <DecodysButton
              buttonFunction={() => navigation.navigate('Test4')}
              bgcolor="#fff"
              text="Test 4"
              color={'#0ACBC5'}
              outline={true}
            />
          </View>
        </ScrollView>
     
    </>
  );
}



