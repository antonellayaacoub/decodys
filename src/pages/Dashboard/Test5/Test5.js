import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test5Form from './components/Test5Form';

export default function Test5() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
  
      <Test5Form />
    </Container>
  );
}
