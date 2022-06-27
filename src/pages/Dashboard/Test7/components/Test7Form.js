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
  const [result7, setResult7] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let result77 = [];
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
        dispatch(GetSingleTestAction(singleResponse.data.test_id, grade7));
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
    if (String(text)) {
      console.log('text : ', text);
      setResult7(text);
      console.log('speech result handler', e, typeof e);
      result77.push(text);
      console.log('result87777 ', result77);
      setResult7(result77);
      console.log('resultttttttttttttt', result7);
    }
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

      for (var i = 0; i < result7.length; i++) {
        console.log('result7 in : ', result7[i]);
        for (
          var j = 0;
          j < allQuestions[currentQuestionIndex]?.correct_option.length;
          j++
        ) {
          var text1 = result7[i];
          var text2 = allQuestions[currentQuestionIndex]?.correct_option[j];
          console.log('result7[i]', text1);
          console.log(
            'allQuestions[currentQuestionIndex]?.correct_option[j]',
            text2,
          );
          console.log(text1.includes(text2));
          if (text1.includes(text2)) {
            setGrade7(grade7 + 1);
            allQuestions[currentQuestionIndex]?.correct_option.splice(j, 1);
          }
        }
      }

      console.log('NAVIGATEEEEEEEE', grade7);
      dispatch(GetSingleMiniTestAction(miniTestId));
      navigation.goBack();
    } else {
      pass = true;
      console.log('result7 result7', result7);
      console.log('result7 length', result7.length);
      for (var i = 0; i < result7.length; i++) {
        console.log('result7 in : ', result7[i]);
        for (
          var j = 0;
          j < allQuestions[currentQuestionIndex]?.correct_option.length;
          j++
        ) {
          var text1 = result7[i];
          var text2 = allQuestions[currentQuestionIndex]?.correct_option[j];
          console.log('result7[i]', text1);
          console.log(
            'allQuestions[currentQuestionIndex]?.correct_option[j]',
            text2,
          );
          console.log(text1.includes(text2));
          if (text1.includes(text2)) {
            setGrade7(grade7 + 1);
            allQuestions[currentQuestionIndex]?.correct_option.splice(j, 1);
          }
        }
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
          value={result7}
          placeholder="your text"
          style={{color: '#000'}}
          onChangeText={text => setResult7(text)}
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
