import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Title,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Animated,
  Modal,
  ActivityIndicator,
  Button,
} from 'react-native';
import DecodysButton from '../../../../Components/DecodysButton';
import {Overlay} from 'react-native-elements';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {styles} from '../styles';
import {COLORS, SIZES} from '../../../../constants';
import data from '../../../../data/Test9Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
import Sound from 'react-native-sound';
import {useSelector, useDispatch} from 'react-redux';
import {
  clearEditMiniTestState,
  GetSingleMiniTestAction,
  EditMiniTestAction,
} from '../../../../store/actions/MiniTestsAction';
import {
  clearEditTestState,
  GetSingleTestAction,
  EditTestAction,
} from '../../../../store/actions/TestsAction.js';
import axios from 'axios';
import AudioRecord from 'react-native-audio-record';
import * as RNFS from 'react-native-fs';
export default function Test10() {
  const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'test.wav', // default 'audio.wav'
  };

  AudioRecord.init(options);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const startRecord = async () => {
    console.log('1');
    AudioRecord.start();
    await sleep(1000);
    console.log('2');
    stopRecord();
  };
  const stopRecord = async () => {
    // or to get the wav file path
    AudioRecord.stop().then(r => {
      RNFS.readFile(r, 'base64') // r is the path to the .wav file on the phone
        .then(async data => {
          // console.log(typeof uploaded_file);
          console.log('3');
          const config = {
            headers: {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          };
          let formdata = new FormData();
          formdata.append('uploaded_file', {
            uri: 'file://' +r,
            type: 'audio/wav',
            name: 'test'
          });
          console.log(r);
          const response = await axios
            .post(
              `http://192.168.1.5:5000/net/voice/prediction/`,
              formdata,
              config,
             
            )
            .then(response => response)
            .then(result => console.log('RESULT: ',  result.request._response))
            .catch(error => {
              console.log('error', error);
             
            });
        });
    });
  };
  // fetch('http://localhost:5000/net/voice/prediction/', {
  //   // Your POST endpoint
  //   method: 'POST',
  //   headers: {
  //     // Content-Type may need to be completely **omitted**
  //     // or you may need something
  //     'Content-Type': 'application/json',
  //   },
  //   body: uploaded_file, // This is your file object
  // })
  // .then(
  //   response => response.json(), // if the response is a JSON object
  // )
  // .then(
  //   success => console.log('SUCCCESSS',success), // Handle the success response object
  // )
  // .catch(
  //   error => console.log('ERROOORRR: ',error), // Handle the error response object
  // );
  //}
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <Button
          title="StartRecord"
          mode="contained"
          icon="record"
          onPress={() => startRecord()}>
          RECORD
        </Button>
      </View>
    </>
  );
}
