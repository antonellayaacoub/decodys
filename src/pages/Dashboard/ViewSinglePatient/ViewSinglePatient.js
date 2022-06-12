 import React from 'react'
 import {Container} from 'native-base'
 import Header from './components/Header'
import PatientDetails from './components/PatientDetails'

 

 export default function ViewSinglePatient() 
  {
    
     return (
         <Container>
           <Header
 style={{
              backgroundColor:'#0ACBC5'
            }}
/>
           <PatientDetails/>
         </Container>
     )
 }
 