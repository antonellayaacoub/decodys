import React from 'react'
import { Container } from 'native-base'
import Header from './components/Header'
import EditForm from './components/EditForm'

export default function EditPatient() {
    return (
       <Container>
           <Header
 style={{
              backgroundColor:'#0ACBC5'
            }}
/>
           <EditForm/>
       </Container>
    )
}
