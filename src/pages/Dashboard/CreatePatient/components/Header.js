import React from 'react'
import {Header as CreatePatientHeader, Left, Body, Right, Title } from 'native-base'
import Options from '../../../../layout/Dashboard/Options'


export default function Header() {
    return (
        <CreatePatientHeader style={{
          backgroundColor:'#0ACBC5'
        }}>
          <Left/>
          <Body>
            <Title>Create Patient</Title>
          </Body>
          <Right>
            <Options/>
            </Right>
        </CreatePatientHeader>
    )
}
