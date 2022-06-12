import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test1Form from './components/Test1Form';

export default function Test1() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
      <Test1Form />
    </Container>
  );
}
