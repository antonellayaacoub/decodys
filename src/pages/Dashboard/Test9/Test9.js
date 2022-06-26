import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test9Form from './components/Test9Form';

export default function Test9() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
  
      <Test9Form />
    </Container>
  );
}
