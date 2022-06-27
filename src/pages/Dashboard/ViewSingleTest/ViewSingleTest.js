import React from 'react';
import {Container} from 'native-base';
import Header from './components/Header';
import ViewSingleTestForm from './components/ViewSingleTestForm';

export default function ViewSingleTest() {
  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#0ACBC5',
        }}
      />
      <ViewSingleTestForm />
    </Container>
  );
}
