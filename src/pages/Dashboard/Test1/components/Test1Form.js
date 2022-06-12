import React, {useState} from 'react';
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
export default function Test1() {
  const navigation = useNavigation();
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctOption, setCorrectOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPlayButton, setShowPLayButton] = useState(false);
  const [grade, setGrade] = useState(0);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let pass = true;
  let numberOfTabs = 0;
  let timeTabs = [];
  let intervalTabs = [];
  intervalTabs[0] = 2000;
  Sound.setCategory('Playback');
  const handleNext = () => {
    pass = true;
    console.log('Grade previous: ', grade);
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
    if (pass) {
      setGrade(grade + 1);
      console.log('Grade: ', grade);
    }

    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      //setShowScoreModal(true);
      console.log('NAVIGATE');
      navigation.navigate('Tests');
    } else {
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
          Play the sample, tap the button below to record your answer.
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
    inputRange: [0, allQuestions.length],
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
