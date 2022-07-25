import React, {useState, useEffect} from 'react';
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
import data from '../../../../data/Test1Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

export default function Test1() {
  const routeParams = useRoute();
  const {miniTestId} = routeParams.params;
  const navigation = useNavigation();
  const singleResponse = useSelector(
    state => state.miniTestReducer.getSingleMiniTestState,
  );
  const [grade1, setGrade1] = useState(0);
  const dispatch = useDispatch();
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctOption, setCorrectOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPlayButton, setShowPLayButton] = useState(false);
  const [answer, setAnswer] = useState([]);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let pass = true;
  let numberOfTabs = 0;
  let timeTabs = [];
  let intervalTabs = [];
  let text = '';
  intervalTabs[0] = 2000;
  Sound.setCategory('Playback');

  useEffect(() => {
    if (singleResponse != '' || singleResponse != 'loading') {
      if (singleResponse.hasOwnProperty('data')) {
        const data = {
          test_id: singleResponse.data.test_id,
          name: singleResponse.data.name,
          grade: grade1,
          done:true,
          answers: answer,
        };
        dispatch(GetSingleTestAction(singleResponse.data.test_id, grade1,singleResponse.data.grade));
        dispatch(EditMiniTestAction(data, miniTestId));
      }
    }
  }, [singleResponse]);

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      pass = true;

      if (numberOfTabs == allQuestions[currentQuestionIndex]?.correct_option) {
        for (var i = 2; i < intervalTabs.length; i++) {
          if (i % 2 === 0) {
            console.log(i);
            console.log(
              'pattern',
              allQuestions[currentQuestionIndex]?.pattern[i],
            );
            console.log('user tabs', intervalTabs[i]);
            console.log(allQuestions[currentQuestionIndex]?.pattern[i]);
            if (allQuestions[currentQuestionIndex]?.pattern[i] == 5000) {
              console.log(
                'in 5000',
                allQuestions[currentQuestionIndex]?.pattern[i],
              );
              if (intervalTabs[i] < 1500) {
                console.log('FALSEEEEE');
                pass = false;
              }
            }
          }
        }
      } else {
        console.log('WORNGGGG TABS');
        pass = false;
      }
      if (pass && allQuestions[currentQuestionIndex]?.graded) {
        console.log('GradeEEEEEEEEEEEEEEEE previous: ', grade1);
        setGrade1(grade1 + 1);
        console.log('Grade11111111111111111111111111111111: ', grade1);
      }

      console.log('NAVIGATEEEEEEEE', grade1);
      dispatch(GetSingleMiniTestAction(miniTestId));
      navigation.goBack();
    } else {
      pass = true;

      if (numberOfTabs == allQuestions[currentQuestionIndex]?.correct_option) {
        for (var i = 2; i < intervalTabs.length; i++) {
          if (i % 2 === 0) {
            console.log(i);
            console.log(
              'pattern',
              allQuestions[currentQuestionIndex]?.pattern[i],
            );
            console.log('user tabs', intervalTabs[i]);
            if (allQuestions[currentQuestionIndex]?.pattern[i] == 2000) {
              if (intervalTabs[i] < 1500) {
                console.log('FALSEE');
                pass = false;
              }
            }
          }
        }
      } else {
        pass = false;
      }
      if (pass && allQuestions[currentQuestionIndex]?.graded) {
        console.log('GradeEEEEEEEEEEEEEEEE previous: ', grade1);
        setGrade1(grade1 + 1);
        console.log('Grade11111111111111111111111111111111: ', grade1);
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
    if (allQuestions[currentQuestionIndex]?.graded) {
      setAnswer([...answer, pass]);
    }
  };

  const handleTabs = () => {
    let current = new Date();
    console.log(current.getTime());
    numberOfTabs = numberOfTabs + 1;
    timeTabs[numberOfTabs - 1] = current;
    if (numberOfTabs == 1) {
      intervalTabs[numberOfTabs] = 2000;
    } else {
      let differentTime =
        current.getTime() - timeTabs[numberOfTabs - 2].getTime();
      console.log('differentTime: ', differentTime);
      intervalTabs[numberOfTabs] = differentTime;

      intervalTabs[numberOfTabs + 1] = 2000;
    }
    console.log('Number of Tabs:', numberOfTabs);
  };

  const soundEffect = async () => {
    console.log('ENTERRRRR');
    if (!showNextButton) {
      numberOfTabs = 0;
      let i;
      for (i = 0; i < allQuestions[currentQuestionIndex]?.pattern.length; i++) {
        console.log('i: ', i);
        if (i % 2 === 0) {
          console.log('even: ', i);
          let time = allQuestions[currentQuestionIndex]?.pattern[i];
          await sleep(time);
        } else {
          let sound = new Sound('beep.mp3', Sound.MAIN_BUNDLE, error => {
            if (error) {
              console.log('failed to load the sound', error);
            } else {
              console.log('odd: ', i);
              sound.play(); // have to put the call to play() in the onload callback
            }
          });
        }
      }
      if (i == allQuestions[currentQuestionIndex]?.pattern.length) {
        setShowNextButton(true);
        setShowPLayButton(true);
      }
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
        {renderPlayButton()}
      </View>
    );
  };
  const renderPlayButton = () => {
    if (showPlayButton) {
      return (
        <TouchableOpacity
          onPress={handleTabs}
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
          <MaterialIcons name="touch-app" size={100} color="#fff" />
        </TouchableOpacity>
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
