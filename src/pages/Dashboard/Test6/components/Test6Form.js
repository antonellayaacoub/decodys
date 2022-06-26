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
import data from '../../../../data/Test6Data';
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
export default function Test6() {
  const routeParams = useRoute();
  const {miniTestId} = routeParams.params;
  const navigation = useNavigation();
  const singleResponse = useSelector(
    state => state.miniTestReducer.getSingleMiniTestState,
  );
  const [grade4, setGrade4] = useState(0);
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
  const [result5, setresult5] = useState({});
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
          grade: grade4,
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
    setresult5(e);
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

      var id = result5.value[0];
      var last1 = id.substr(id.length - 1);
      var last2 = id.substr(id.length - 2);
      var last3 = id.substr(id.length - 3);
      console.log('id',id, last1, last2, last3)
      if (
        result5.value.includes(
          allQuestions[currentQuestionIndex]?.correct_option,
      ) {
        console.log('result5', result5);
        console.log(
          'VALLUEEEE',
          allQuestions[currentQuestionIndex]?.correct_option,
        );
      } else {
        pass = false;
      }
      if (pass && allQuestions[currentQuestionIndex]?.graded) {
        console.log('GradeEEEEEEEEEEEEEEEE previous: ', grade4);
        setGrade4(grade4 + 1);
        console.log('Grade41111111111111111111111111111111: ', grade4);
      }

      console.log('NAVIGATEEEEEEEE', grade4);
      dispatch(GetSingleMiniTestAction(miniTestId));
      navigation.goBack();
    } else {
      pass = true;

      var id = result5.value[0];
      var last1 = id.substr(id.length - 1);
      var last2 = id.substr(id.length - 2);
      var last3 = id.substr(id.length - 3);
      console.log('id',id, last1, last2, last3)
      if (
        result5.value.includes(
          allQuestions[currentQuestionIndex]?.correct_option,
      ) {
        console.log('result5', result5);
        console.log(
          'VALLUEEEE',
          allQuestions[currentQuestionIndex]?.correct_option,
        );
      } else {
        pass = false;
      }
      if (pass && allQuestions[currentQuestionIndex]?.graded) {
        console.log('GradeEEEEEEEEEEEEEEEE previous: ', grade4);
        setGrade4(grade4 + 1);
        console.log('Grade41111111111111111111111111111111: ', grade4);
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
      console.log(
        'allQuestions[currentQuestionIndex]?.pattern',
        allQuestions[currentQuestionIndex]?.pattern,
      );
      let sound = new Sound(
        allQuestions[currentQuestionIndex]?.pattern + '.mp3',
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
          } else {
            sound.play(); // have to put the call to play() in the onload callback
          }
        },
      );
      await sleep(allQuestions[currentQuestionIndex]?.sleep);
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
            fontSize: 20,
            color: COLORS.secondary,
            marginBottom: '5%',
            marginTop: '5%',
          }}>
          {text}
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
                marginTop: '50%',
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
