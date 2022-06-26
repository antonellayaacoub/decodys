import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test3Form from './components/Test3Form';

export default function Test3() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
      <Test3Form />
    </Container>
  );
}
