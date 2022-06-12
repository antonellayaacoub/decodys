import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test4Form from './components/Test4Form';

export default function Test4() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
      <Test4Form />
    </Container>
  );
}
