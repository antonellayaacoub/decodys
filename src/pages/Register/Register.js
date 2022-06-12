import React from 'react';
import RegisterForm from './components/RegisterForm';
import {Container, Root} from 'native-base';
import {styles} from './styles';

export default function Register() {
  return (
    <Container style={styles.body}>
      <RegisterForm />
    </Container>
  );
}
