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
import data from '../../../../data/Test2Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
export default function Test2() {
  const navigation = useNavigation();
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [grade, setGrade] = useState(0);
  let pass = true;
  let numberOfTabs = 0;
  let timeTabs = [];
  let intervalTabs = [];
  intervalTabs[0] = 1000;

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
    console.log('RESULTT: ', result);
    console.log('stop handler', e);
  };

  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setResult(text);
    console.log('speech result handler', e);
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

  const renderOptions = () => {
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
        <TextInput
          value={result}
          placeholder="your text"
          style={{ color:'#000'}}
          onChangeText={text => setResult(text)}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="red" />
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
      </View>
    );
  };
  const renderNextButton = () => {
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
        <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>
          Next
        </Text>
      </TouchableOpacity>
    );
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
