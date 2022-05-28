import React from 'react';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from 'react-native';

//Duration of the vibration
const DURATION = 1000;
const PATTERN = [1000, 1000, 3000,1000];
//waits 1s vibrates 1s wait 3s vibrate 1s
// Android: vibrate for 10s
// iOS: duration is not configurable, vibrate for fixed time (about 500ms)


const HomeScreen = () => {
  const startVibration = () => {
    //To start the vibration for the defined Duration
    Vibration.vibrate(DURATION);

  };
  const startVibrationPatern = () => {
    //To start the vibration for the defined Pattern
    Vibration.vibrate(PATTERN);

  };

  const stopVibration = () => {
    //To Stop the vibration
    Vibration.cancel();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>
          React Native Vibration | Start Stop Device Vibration in React Native
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={startVibration}>
          <Text style={styles.buttonTextStyle}>Start Vibration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={startVibrationPatern}>
          <Text style={styles.buttonTextStyle}>Start Vibration Patern</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={stopVibration}>
          <Text style={styles.buttonTextStyle}>Stop Vibration</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});
