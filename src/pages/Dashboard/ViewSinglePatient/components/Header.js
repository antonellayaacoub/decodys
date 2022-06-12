import React from 'react'
import {Header as ViewSinglePatientHeader, Left, Body, Right, Title,Icon } from 'native-base'
import Options from '../../../../layout/Dashboard/Options'
import {useNavigation} from '@react-navigation/native';
import { Platform } from 'react-native';



export default function Header() {

  const navigation = useNavigation();

 const goBack = () =>
  {
    navigation.goBack();
  }

    return (
        <ViewSinglePatientHeader   style={{
          backgroundColor:"#0ACBC5"
        }}>
          <Left>
            {
              Platform.OS=='ios'?
              <Icon name="ios-arrow-back" onPress={goBack} />
              :
              <Icon name="ios-arrow-back" style={{color:'white'}} onPress={goBack} />
            }
          
            </Left>
          <Body>
            <Title>Patient Me</Title>
          </Body>
          <Right>
            <Options/>
            </Right>
        </ViewSinglePatientHeader>
    )
}
