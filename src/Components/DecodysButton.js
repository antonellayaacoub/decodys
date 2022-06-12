import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const DecodysButton = props => {
  if (props.outline == true) {
    return (
      <TouchableOpacity
        onPress={props.buttonFunction}
        style={{
          height: 52,
          borderWidth: 5,
          borderColor: '#0ACBC5',
          borderRadius: 25,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 45,
          paddingRight: 45,
        }}>
        <Text style={{color: props.color}}>{props.text}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
       disabled={props.disabled}
        onPress={props.buttonFunction}
        style={{
          width: '100%',
          height: 52,
          backgroundColor: props.bgcolor,
          borderRadius: 25,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: props.color}}>{props.text}</Text>
      </TouchableOpacity>
    );
  }
};
export default DecodysButton;
