import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import Test7Form from './components/Test7Form';

export default function Test7() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
  
      <Test7Form />
    </Container>
  );
}
