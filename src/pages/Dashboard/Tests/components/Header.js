import React from 'react';
import {
  Header as TestsHeader,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Text,
} from 'native-base';
import Options from '../../../../layout/Dashboard/Options';
import {useNavigation,useRoute} from '@react-navigation/native';
import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {
  CreateTestAction,
  GetTestActions,
  DeleteTestAction,
} from '../../../../store/actions/TestsAction';
import {DevSettings} from 'react-native';
export default function Header() {
  const navigation = useNavigation();
  const routeParams = useRoute();
  const { patientId } = routeParams.params;
  const dispatch = useDispatch();
  const addTest = () => {
    console.log('Test')
    const data =  {
     patient_id: patientId,
     grade:0,
   };

    dispatch(CreateTestAction(data));
  };
  const goBack = () =>
  {
    navigation.goBack();
  }

  return (
    <TestsHeader
      style={{
        backgroundColor: '#0ACBC5',
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
        <Title>View Tests</Title>
      </Body>
      <Right>
      <Text 
        style={{marginRight: 10, color: 'white'}}>Add Test</Text>
          <Ionicons
            name="add-circle-outline"
            onPress={addTest}
            style={{marginRight: 10, fontSize: 20, color: 'white'}}
          />

        <Options />
      </Right>
    </TestsHeader>
  );
}
