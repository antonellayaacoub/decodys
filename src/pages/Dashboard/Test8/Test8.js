import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test8Form from './components/Test8Form';

export default function Test8() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
  
      <Test8Form />
    </Container>
  );
}
