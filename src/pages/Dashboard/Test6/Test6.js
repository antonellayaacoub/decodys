import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test6Form from './components/Test6Form';

export default function Test6() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
  
      <Test6Form />
    </Container>
  );
}
