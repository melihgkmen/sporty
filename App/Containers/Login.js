import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import {AppColors} from '../Assets/AppColors';
import Logo from '../Assets/Images/logo.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';
import {CheckBox} from 'react-native-elements';
import Toast from '../Components/Toast';
import i18n from '../i18n';
import API from '../Services/Api';
import {setTempToken} from '../Actions';
import Mixpanel from '../Services/Mixpanel';
import {localBuildNumber, deviceType, oneSignalKey} from '../Config/Settings';
import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import RegisterInput from '../Components/RegisterInput';
import Button from '../Components/Button';

class Login extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerShown: false,
      headerLeft: () => null,
      headerRight: () => null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      rememberMe: false,
      isLoginLoading: false,
      userName: undefined,
      password: undefined,
      isBiometrySupported: false,
    };
  }

  componentDidMount = async () => {
    Mixpanel.timeEvent('application_load');
    OneSignal.init(oneSignalKey, {kOSSettingsKeyAutoPrompt: true});

    const userName = await AsyncStorage.getItem('userName');
    const rememberMe = await AsyncStorage.getItem('rememberMe');
    this.setState({userName, rememberMe: JSON.parse(rememberMe)});

    Mixpanel.track('application_load');
    this.initializeBiometricLogin();
  };

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.savePlayerId);
  }

  initializeBiometricLogin = () => {
    const optionalConfigObject = {
      unifiedErrors: false,
      passcodeFallback: false,
    };
    TouchID.isSupported(optionalConfigObject)
      .then((isBiometrySupported) => {
        this.setState({isBiometrySupported});
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  signInAsync = async () => {
    const {userName, password, rememberMe} = this.state;
    if (!userName || !password) {
      Toast(i18n.t('infoMessages.90007'));
      return;
    }
    const api = API.createApi();
    this.setState({isLoginLoading: true});
    await api
      .signIn(userName, password, localBuildNumber, deviceType)
      .then(async (result) => {
        console.log("signin",result)
        const {problem} = result;
        if (!problem) {
          const {ResultCode, response} = result.data;
          if (ResultCode === 20004) {
            this.handleConfirmation(response.UserID);
            return;
          }

          if (ResultCode !== 0) {
            Mixpanel.track(`${ResultCode}`);
            this.setState({isLoginLoading: false});
            Toast(i18n.t(`apiResponses.${ResultCode}`));
          } else {
            Mixpanel.track(`signin_${ResultCode}`);
            const prevUserName = await AsyncStorage.getItem('prevUserName');
            if (prevUserName !== userName) {
              await AsyncStorage.clear();
              await AsyncStorage.setItem(
                'receiveNotifications',
                JSON.stringify(true),
              );
              //await AsyncStorage.setItem('isIntroduced', JSON.stringify(true));
            }
            await Keychain.setGenericPassword(userName, password);
            await AsyncStorage.multiSet([
              ['prevUserName', userName],
              ['userToken', response.userToken],
              ['isLoggedIn', JSON.stringify(true)],
            ]);
            if (rememberMe) {
              await AsyncStorage.multiSet([
                ['userName', userName],
                ['rememberMe', JSON.stringify(rememberMe)],
              ]);
            }
            if (!rememberMe) {
              await AsyncStorage.multiRemove(['userName', 'rememberMe']);
            }
            // OneSignal.configure();
            OneSignal.addEventListener('ids', this.savePlayerId);
          }
        } else {
          Mixpanel.track(problem);
          this.setState({isLoginLoading: false});
          Toast(i18n.t(`apiErrors.${problem}`));
        }
      });
  };
  handleConfirmation = (tempToken) => {
    const {_setTempToken} = this.props;
    this.getOTP(tempToken);
    _setTempToken(tempToken);
    NavigationService.navigateAndReset('SignUpConfirmation');
  };
  getOTP = async (tempToken) => {
    const api = API.createApi();
    await api.getOTP(tempToken);
  };
  savePlayerId = async (device) => {
    console.log('saveplayerid');
    const api = API.createApi();
    const {isBiometrySupported} = this.state;
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      return;
    }
    const devicePlatform = Platform.OS === 'ios' ? 'Apple' : 'Chrome';
    const devicePlayerId = device.userId;
    await api
      .savePlayerId(userToken, devicePlayerId, devicePlatform)
      .then(async () => {
        const biometricPrompt = await AsyncStorage.getItem('biometricResulted');
        if (!biometricPrompt && isBiometrySupported) {
          Mixpanel.timeEvent('signin_to_home');
          NavigationService.navigate('BiometricSettings');
        } else {
          Mixpanel.timeEvent('signin_to_home');
          NavigationService.navigate('AuthLoading');
        }
      });
  };
  showForgotPassword = async () => {
    Mixpanel.timeEvent('signin_to_forgotpassword');
    NavigationService.navigate('SifremiUnuttum');
  };
  render() {
    const {rememberMe, isLoginLoading, userName, password} = this.state;
    return (
      <ImageBackground source={onboardingbg} style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} />

          <View
            style={{
              height: 50,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '20%',
              }}></View>
            <Text style={styles.headerText}>{i18n.t('signIn.title')}</Text>
            <TouchableOpacity
              onPress={() => NavigationService.back()}
              style={styles.headerButton}>
              <View style={styles.headerIconView}></View>
              <Icon name="times" color="#fff" size={20}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.viewStyle}>
            <View style={{marginTop: 20}}>
              <Text style={styles.textStyle}>
                {i18n.t('signIn.email-or-phoneNumber')}
              </Text>
              <RegisterInput
                  style={styles.inputStyle}
                  theme="signup"
                  value={userName}
                  onChangeText={(text) => this.setState({userName: text})}
                  placeholder={i18n.t('signIn.mail-placeholder')}
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  editable={!isLoginLoading}
                />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.textStyle}>
                {i18n.t('signIn.password-placeholder')}
              </Text>
              <RegisterInput
                  style={styles.inputStyle}
                  theme="signup"
                  value={password}
                  onChangeText={(text) => this.setState({password: text})}
                  placeholder="****"
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!isLoginLoading}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                checked={rememberMe}
                onPress={() => this.setState({rememberMe: !rememberMe})}
                title={
                  <Text style={styles.checkboxTextStyle}>
                    {i18n.t('signIn.rememberMe-text')}
                  </Text>
                }
                containerStyle={{
                  marginLeft: -10,
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  width: '50%',
                }}
                checkedColor="#b7bec9"
              />
              <Text
                onPress={() => this.showForgotPassword()}
                style={styles.forgotPassword}>
                {i18n.t('signIn.forgotPassword-text')}
              </Text>
            </View>

            <View style={{marginTop: 20}}>
            <Button
                style={{borderRadius: 15}}
                onPress={() => {
                  Keyboard.dismiss();
                  this.signInAsync();
                }}
                buttonText={i18n.t('signIn.login-button')}
                disabled={isLoginLoading}
                isLoading={isLoginLoading}
                textStyle={{color: '#fff'}}></Button>
         
            </View>
            <View style={{marginTop: 60, flexDirection: 'row'}}>
              <View
                style={{width: '1%', backgroundColor: 'transparent'}}></View>
              <View
                style={{
                  height: 1,
                  width: '39%',
                  backgroundColor: 'black',
                }}></View>
              <Text style={{width: '20%', textAlign: 'center', marginTop: -5}}>
                {i18n.t('signIn.or')}
              </Text>
              <View
                style={{
                  height: 1,
                  width: '39%',
                  backgroundColor: 'black',
                }}></View>
              <View
                style={{width: '1%', backgroundColor: 'transparent'}}></View>
            </View>
            <View
              style={{
                height: '25%',
                flex: 1,
                marginTop: 30,
              }}>
              <TouchableOpacity
                style={[
                  styles.buttonstyle2,
                  {backgroundColor: '#3b5998', borderColor: 'transparent'},
                ]}>
                <Icon
                  name="facebook-f"
                  size={18}
                  style={[styles.iconStyle, {color: '#fff'}]}></Icon>
                <Text style={[styles.butontextStyle, {color: '#fff'}]}>
                  {i18n.t('signIn.continue-with-facebook')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonstyle2,
                  {backgroundColor: '#dc4e41', borderColor: 'transparent'},
                ]}>
                <Icon
                  name="google"
                  size={18}
                  style={[styles.iconStyle, {color: '#fff'}]}></Icon>
                <Text style={[styles.butontextStyle, {color: '#fff'}]}>
                  {i18n.t('signIn.continue-with-google')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 10,
    padding: 20,
    flex: 1,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#fff',
    height: '100%',
  },
  textStyle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#464968',
  },
  inputStyle: {
    paddingLeft: 10,
    marginTop: 10,
    height: 44,
    opacity: 0.75,
    borderRadius: 15,
    backgroundColor: '#f2f4f7',
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },

  buttontTextStyle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.34,
    color: '#464968',
    width: '90%',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: -20,
  },
  buttonstyle: {
    width: '100%',
    height: 44,
    borderRadius: 15,
    backgroundColor: '#f8b716',
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
  },
  buttonstyle2: {
    width: '100%',
    height: 48,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffffff',
    flexDirection: 'row',
    padding: 10,
    marginTop: 15,
  },
  checkboxTextStyle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: '#32354e',
  },
  iconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  butontextStyle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.34,
    color: '#464968',
    width: '90%',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: -20,
  },
  headerText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.34,
    color: '#ffffff',
    textAlign: 'center',
    width: '60%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  headerButton: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  headerIconView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.1,
    backgroundColor: '#ffffff',
    position: 'absolute',
  },
    forgotPassword:{
      marginTop: 15,
      width: '50%',
      textDecorationLine: 'underline',
      justifyContent: 'flex-end',
      textAlign: 'right',
      fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 20,
      letterSpacing: 0,
      color: '#32354e',
    }
});
const mapDispatchToProps = (dispatch) => ({
  _setTempToken: (payload) => dispatch(setTempToken(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
