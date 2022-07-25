import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Modal,
  ActivityIndicator,
  TextInput,
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
import data from '../../../../data/Test10Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
export default function Test10() {
  const routeParams = useRoute();
  const {miniTestId} = routeParams.params;
  const navigation = useNavigation();
  const singleResponse = useSelector(
    state => state.miniTestReducer.getSingleMiniTestState,
  );
  const [grade10, setGrade10] = useState(0);
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
  const [result2, setResult2] = useState({});
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
          grade: grade10,
        };
        dispatch(GetSingleTestAction(singleResponse.data.test_id, grade10));
        dispatch(EditMiniTestAction(data, miniTestId));
      }
    }
  }, [singleResponse]);

  

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      pass = true;

      if (result == allQuestions[currentQuestionIndex]?.correct_option) {
        console.log('result', result);
        console.log(
          'VALLUEEEE',
          allQuestions[currentQuestionIndex]?.correct_option,
        );
      } else {
        pass = false;
      }
      if (pass) {
        console.log('GradeEEEEEEEEEEEEEEEE previous: ', grade10);
        setGrade10(grade10 + 1);
        console.log('Grade101111111111111111111111111111111: ', grade10);
      }

      console.log('NAVIGATEEEEEEEE', grade10);
      dispatch(GetSingleMiniTestAction(miniTestId));
      navigation.goBack();
    } else {
      pass = true;

      if (result == allQuestions[currentQuestionIndex]?.correct_option) {
        console.log('result', result);
        console.log(
          'VALLUEEEE',
          allQuestions[currentQuestionIndex]?.correct_option,
        );
      } else {
        pass = false;
      }
      if (pass) {
        console.log('GradeEEEEEEEEEEEEEEEE previous: ', grade10);
        setGrade10(grade10 + 1);
        console.log('Grade101111111111111111111111111111111: ', grade10);
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
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {renderPlayButton()}
      </View>
    );
  };
  const renderPlayButton = () => {
    if (showPlayButton) {
      return (
        <>
          <TextInput
            placeholder="Enter your Result"
            keyboardType="numeric"
            onChangeText={text => setResult(text)}
          />
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
