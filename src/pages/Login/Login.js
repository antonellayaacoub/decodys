import React, {useEffect} from 'react';
import LoginForm from './components/LoginForm';
import {Container} from 'native-base';
import {styles} from './styles';
import {View} from 'react-native';
export default function Login() {
  return (
    <Container style={styles.body}>
      <LoginForm />
    </Container>
  );
}
