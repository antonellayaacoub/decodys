import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test10Form from './components/Test10Form';

export default function Test10() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
  
      <Test10Form />
    </Container>
  );
}
