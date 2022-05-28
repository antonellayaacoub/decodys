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
} from 'react-native';
import DecodysButton from '../Components/DecodysButton';
import Logo from '../Components/Logo';
import {Overlay} from 'react-native-elements';
import PopUp from '../Components/PopUp';
import Loader from '../Components/Loader';

const LoginScreen = ({navigation}) => {
  const [overlay, setOverlay] = useState(false);
  const [OverlayText, setOverlayText] = useState('');
  const [popUpErr, setpopUpErr] = useState(false);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [loader, setLoader] = useState(false);

  const signIn = () => {};
  const validate = () => {
    // if (email == '' && password == '') {
    //   showErr(true, true, 'Unable to sign in \n please fill in all fields');
    // } else if (email == '') {
    //   showErr(true, true, 'Unable to sign in \n please enter your email');
    // } else if (password == '') {
    //   showErr(true, true, 'Unable to sign in \n please enter your password');
    // } else {
    //   setOverlay(false);
    //   setLoader(true);
    //   signIn();
    // }
    navigation.navigate('Home');
  };
  const showErr = (show_overlay, show_popup, overlay_text) => {
    setOverlay(show_overlay);
    setpopUpErr(show_popup);
    setOverlayText(overlay_text);
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.body}>
        <View style={styles.topSection}>
          <Logo />
        </View>

        <ScrollView
          style={styles.bottomSection}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <View style={{width: '80%', marginBottom: 20}}>
              <TextInput
                value={email}
                onChangeText={text => onChangeEmail(text)}
                style={{
                  height: 52,
                  width: '100%',
                  color: '#BAD4CB',
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: '#BAD4CB',
                  paddingLeft: 10,
                }}
                placeholderTextColor="#BAD4CB"
                placeholder="Email"
              />
              <TextInput
                value={password}
                onChangeText={text => onChangePassword(text)}
                secureTextEntry={true}
                style={{
                  height: 52,
                  width: '100%',
                  color: '#BAD4CB',
                  borderRadius: 25,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: '#BAD4CB',
                  paddingLeft: 10,
                }}
                placeholderTextColor="#BAD4CB"
                placeholder="Password"
              />
            </View>
            <DecodysButton
              buttonFunction={() => validate()}
              bgcolor="#0ACBC5"
              text="Sign in"
              color={'white'}
              outline={false}
            />
            <TouchableOpacity
            // onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text
                style={{
                  marginTop: 20,
                  color: '#6C7594',
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 60,
                marginBottom: 10,
                color: '#6C7594',
              }}>
              New to Decodys?
            </Text>
            <DecodysButton
              buttonFunction={() => navigation.navigate('Registration')}
              bgcolor="#fff"
              text="Register"
              color={'#0ACBC5'}
              outline={true}
            />
          </View>
        </ScrollView>
      </View>
      <Overlay isVisible={overlay}>
        <PopUp
          errorBtn={() => setOverlay(false)}
          text={OverlayText}
          error={popUpErr}
        />
      </Overlay>
      <Overlay isVisible={loader}>
        <Loader text={'Signing you in, please wait..'} />
      </Overlay>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: '30%',
    marginLeft: '20%',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomSection: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
  },
});
