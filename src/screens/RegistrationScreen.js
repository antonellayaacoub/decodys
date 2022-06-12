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

const RegistrationScreen = ({navigation}) => {
  const [overlay, setOverlay] = useState(false);
  const [OverlayText, setOverlayText] = useState('');
  const [popUpErr, setpopUpErr] = useState(false);
  const [email, onChangeEmail] = useState('');
  const [fullName, onChangeFullName] = useState('');
  const [password, onChangePassword] = useState('');
  const [loader, setLoader] = useState(false);

  const Registration = () => {};
  const validate = () => {
    if (email == '' && password == '') {
      showErr(true, true, 'Unable to sign in \n please fill in all fields');
    } else if (email == '') {
      showErr(true, true, 'Unable to sign in \n please enter your email');
    } else if (password == '') {
      showErr(true, true, 'Unable to sign in \n please enter your password');
    } else {
      setOverlay(false);
      setLoader(true);
      Registration();
    }
  };
  const showErr = (show_overlay, show_popup, overlay_text) => {
    setOverlay(show_overlay);
    setpopUpErr(show_popup);
    setOverlayText(overlay_text);
  };

  return (
    <>
      {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
      <View style={styles.body}>
        <View style={styles.topSection}>
          <Logo />
        </View>

        <ScrollView
          style={styles.bottomSection}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View
            style={{
              marginTop: 30,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#6C7594',
              }}>
              Sign up to DecoDys and start helping kids today!
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <View style={{width: '80%', marginBottom: 20}}>
              <TextInput
                value={fullName}
                onChangeText={text => onChangeFullName(text)}
                style={{
                  height: 52,
                  width: '100%',
                  color: '#BAD4CB',
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: '#BAD4CB',
                  paddingLeft: 10,
                  marginTop: 10,
                }}
                placeholderTextColor="#BAD4CB"
                placeholder="Full Name"
              />
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
                  marginTop: 10,
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
              text="Register"
              color={'white'}
              outline={false}
            />

            <Text
              style={{
                marginTop: 10,
                color: '#6C7594',
              }}>
              Already a member?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  marginTop: 10,
                  color: '#0ACBC5',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
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
        <Loader text={' Please wait..'} />
      </Overlay>
    </>
  );
};

export default RegistrationScreen;

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
