import React from 'react'
import { Container } from 'native-base'
import Header from './components/Header'
import CreateForm from './components/CreateForm'

export default function CreatePatient() {
    return (
       <Container>
           <Header/>
           <CreateForm/>
       </Container>
    )
}   


