import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
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
import data from '../../../../data/Test7Data';
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
export default function Test7() {
  const routeParams = useRoute();
  const {miniTestId} = routeParams.params;
  const navigation = useNavigation();
  const singleResponse = useSelector(
    state => state.miniTestReducer.getSingleMiniTestState,
  );
  const [grade7, setGrade7] = useState(0);
  const dispatch = useDispatch();
  let text = '';
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPlayButton, setShowPLayButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [result7, setresult7] = useState({});
  let pass = true;
  let numberOfTabs = 0;
  let timeTabs = [];
  let intervalTabs = [];
  Sound.setCategory('Playback');

  useEffect(() => {
    if (singleResponse != '' || singleResponse != 'loading') {
      if (singleResponse.hasOwnProperty('data')) {
        const data = {
          test_id: singleResponse.data.test_id,
          name: singleResponse.data.name,
          grade: grade7,
        };
        dispatch(EditMiniTestAction(data, miniTestId));
      }
    }
  }, [singleResponse]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
    console.log('start handler==>>>', e);
  };
  const onSpeechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setResult(text);
    console.log('speech result handler', e, typeof e);
    setResult7(e);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('fr-FR');
      
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };
  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      pass = true;

      var id = result7.value[0];
      var last1 = id.substr(id.length - 1);
      var last2 = id.substr(id.length - 2);
      var last3 = id.substr(id.length - 3);
      console.log('id', id, last1, last2, last3);
      if (
        result7.value.includes(
          allQuestions[currentQuestionIndex]?.correct_option,
        )
      ) {
        console.log('result7', result7);
        console.log(
          'VALLUEEEE',
          allQuestions[currentQuestionIndex]?.correct_option,
        );
      } else {
        pass = false;
      }
      if (pass && allQuestions[currentQuestionIndex]?.graded) {
        console.log('GradeEEEEEEEEEEEEEEEE previous: ', grade7);
        setGrade7(grade7 + 1);
        console.log('Grade71111111111111111111111111111111: ', grade7);
      }

      console.log('NAVIGATEEEEEEEE', grade7);
      dispatch(GetSingleMiniTestAction(miniTestId));
      navigation.goBack();
    } else {
      pass = true;

      var id = result7.value[0];
      var last1 = id.substr(id.length - 1);
      var last2 = id.substr(id.length - 2);
      var last3 = id.substr(id.length - 3);
      console.log('id', id, last1, last2, last3);
      if (
        result7.value.includes(
          allQuestions[currentQuestionIndex]?.correct_option,
        )
      ) {
        console.log('result7', result7);
        console.log(
          'VALLUEEEE',
          allQuestions[currentQuestionIndex]?.correct_option,
        );
      } else {
        pass = false;
      }
      if (pass && allQuestions[currentQuestionIndex]?.graded) {
        console.log('GradeEEEEEEEEEEEEEEEE previous: ', grade7);
        setGrade7(grade7 + 1);
        console.log('Grade71111111111111111111111111111111: ', grade7);
      }

      if (currentQuestionIndex != allQuestions.length - 1) {
        console.log('CHANGE TABS');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      Animated.timing(progress, {
        toValue: currentQuestionIndex + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      setShowNextButton(false);
      setShowPLayButton(false);
    }
  };
  const soundEffect = async () => {
    console.log('ENTERRRRR');
    if (!showNextButton) {
 
      setShowNextButton(true);
      setShowPLayButton(true);
    }
  };
  const renderOptions = () => {
    soundEffect();
    allQuestions[currentQuestionIndex]?.graded
      ? (text = '')
      : (text = 'Essais: ');
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 40,
            color: COLORS.secondary,
            marginBottom: '5%',
            marginTop: '5%',
          }}>
          MARIE
        </Text>
        <Text
          style={{
            fontSize: 30,
            color: COLORS.secondary,
            marginBottom: '5%',
            marginTop: '5%',
          }}>
          Marie est une petite fille. Elle ne va pas encore à l'école. En été,
          Marie joue dans le bois avec sa maman et son papa. Marie regarde sa
          maison, le toit rouge, la haute cheminée, la porte basse, la large
          fenêtre.
        </Text>
        <Text
          style={{
            fontSize: 30,
            color: COLORS.secondary,
            marginBottom: '5%',
            marginTop: '5%',
          }}>
          Parfois, la petite, Marie va faire une belle promenade dans la cour et
          dans le grand jardin : elle joue, elle saute et court dans la prairie.
        </Text>
        <Text
          style={{
            fontSize: 30,
            color: COLORS.secondary,
            marginBottom: '5%',
            marginTop: '5%',
          }}>
          Dans le ciel bleu, la fillette voit un gentil moineau brun; il vole
          vers la branche du cerisier.
        </Text>
        <TextInput
          value={result}
          placeholder="your text"
          style={{color: '#000'}}
          onChangeText={text => setResult(text)}
        />
        {renderPlayButton()}
      </View>
    );
  };
  const renderPlayButton = () => {
    if (showPlayButton) {
      return (
        <>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0ACBC5" />
          ) : (
            <TouchableOpacity
              onPress={startRecording}
              style={{
                marginLeft: '50%',
                marginRight: '50%',
                width: 200,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 100,
                backgroundColor: COLORS.primary,
              }}>
              <FontAwesome name="microphone" size={100} color="#fff" />
            </TouchableOpacity>
          )}
        </>
      );
    } else {
      return null;
    }
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: '30%',
            backgroundColor: COLORS.primary,
            padding: 20,
            borderRadius: 25,
          }}>
          <Text
            style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length - 1],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#00000020',
        }}>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.primary,
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: 'relative',
        }}>
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
      </View>
    </SafeAreaView>
  );
}
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StatusBar,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   SafeAreaView,
//   Animated,
//   Modal,
//   ActivityIndicator,
// } from 'react-native';
// import DecodysButton from '../../../../Components/DecodysButton';
// import {Overlay} from 'react-native-elements';
// import {
//   useNavigation,
//   useFocusEffect,
//   useRoute,
// } from '@react-navigation/native';
// import {styles} from '../styles';
// import {COLORS, SIZES} from '../../../../constants';
// import data from '../../../../data/Test7Data';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Voice from '@react-native-voice/voice';
// import Sound from 'react-native-sound';
// import {useSelector, useDispatch} from 'react-redux';
// import {
//   clearEditMiniTestState,
//   GetSingleMiniTestAction,
//   EditMiniTestAction,
// } from '../../../../store/actions/MiniTestsAction';
// import * as tf from '@tensorflow/tfjs';
// import {
//   fetch,
//   decodeJpeg,
//   bundleResourceIO,
// } from '@tensorflow/tfjs-react-native';
// export default function Test7() {
//   const modelJson = require('../../../../../assets/model/model.json');
//   // const modelWeights = require('../../../../../assets/model/weights.bin');
//   const audio = require('../../../../../assets/audio/fabo1.wav');
//   // Use the bundleResorceIO IOHandler to load the model
//   const [prediction, setPrediction] = useState(null);
//   const model = tf.loadLayersModel(modelJson);
//   model.then(
//     async function (res) {
//       console.log('in');
//       setPrediction(await res.predict(audio));
//       console.log(prediction);
//     },
//     function (err) {
//       console.log('errrrr', err);
//       console.log('pred', prediction);
//     },
//   );

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
//       <View
//         style={{
//           flex: 1,
//           paddingVertical: 40,
//           paddingHorizontal: 16,
//           backgroundColor: COLORS.background,
//           position: 'relative',
//         }}></View>
//     </SafeAreaView>
//   );
// }