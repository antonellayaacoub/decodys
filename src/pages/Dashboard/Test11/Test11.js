import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test11Form from './components/Test11Form';

export default function Test11() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
      <Test11Form />
    </Container>
  );
}
