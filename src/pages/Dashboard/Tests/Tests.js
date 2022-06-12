import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import TestsForm from './components/TestsForm';

export default function Tests() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
      <TestsForm />
    </Container>
  );
}
