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
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import {AppColors} from '../Assets/AppColors';
import Logo from '../Assets/Images/logo.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';
import {CheckBox, Button} from 'react-native-elements';
import i18n from '../i18n';
import Mixpanel from '../Services/Mixpanel';
import API from '../Services/Api';
import { TextInputMask } from 'react-native-masked-text';
import validate from '../Utils/Validate';
import Toast from '../Components/Toast';

export default class SifremiUnuttum extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerShown: false,
      headerLeft: ()=> null,
      headerRight: ()=> null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      phoneNumber: undefined,
      phoneNumberError: undefined
    };
  }

  componentDidMount = () => {
    Mixpanel.track('signin_to_forgotpassword');
  }

  sendResetPassword = async () => {
    const api = API.createApi();
    const { phoneNumber } = this.state;
    if (!this.isFormValid()) return;
    this.setState({ isLoading: true });
    await api.forgotPassword(phoneNumber.replace(/\s/g, ''))
      .then((result) => {
        const { problem } = result;
        if (!problem) {
          const { ResultCode } = result.data;
          if (ResultCode !== 0) {
            Mixpanel.track(`${ResultCode}`);
            this.setState({ isLoading: false });
            Toast(i18n.t(`apiResponses.${ResultCode}`));
          } else {
            Mixpanel.track(`forgotPassword_${ResultCode}`);
            Toast(i18n.t(`apiResponses.${ResultCode}`));
            NavigationService.navigate('Login');
          }
        } else {
          Mixpanel.track(problem);
          this.setState({ isLoading: false });
          Toast(i18n.t(`apiErrors.${problem}`));
        }
      });
  }
  isFormValid() {
    const { phoneNumber } = this.state;
    const phoneNumberError = validate('phoneNumber', phoneNumber);
    this.setState({ phoneNumberError });
    if (phoneNumberError) return false;
    return true;
  }
  render() {
    const { isLoading, phoneNumber, phoneNumberError } = this.state;
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
            <Text
              style={styles.headerText}>
              {i18n.t('forgotPassword.title').toUpperCase()}
            </Text>
            <TouchableOpacity
              onPress={() => NavigationService.back()}
              style={styles.headerButton}>
              <View
                style={styles.headerIconView}></View>
              <Icon name="times" color="#fff" size={20}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.viewStyle}>
            <View style={{marginTop: 20}}>
              <Text style={styles.textStyle}>{i18n.t('forgotPassword.phone-number')}</Text>
              <TextInputMask style={styles.inputStyle} placeholder="(_ _ _) _ _ _ _ _  _ _"
              value={phoneNumber} onChangeText={text => this.setState({ phoneNumber: text })}
              type="custom" options={{mask:"999 999 99 99"}} maxLength={13} keyboardType="numeric" returnKeyType="done" editable={!isLoading}></TextInputMask>
              {phoneNumberError ? (
              <Text
                style={{
                  color: "#c44b44",
                  marginBottom: 10
                }}
              >
                {phoneNumberError}
              </Text>
            ) : null}
            </View>
            <View style={{marginTop: 20}}>
              <Button loading={isLoading} title={i18n.t('forgotPassword.confirm-button')}
               buttonStyle={styles.buttonstyle}  onPress={()=> { Keyboard.dismiss(); this.sendResetPassword(); }}
               titleStyle={[styles.buttontTextStyle, {color: '#fff'}]}>

              </Button>
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
    height: 44,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffffff',
    flexDirection: 'row',
    padding: 10,
    marginTop: 15,
  },
  checkboxTextStyle:{
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
    headerText:{
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
      headerButton:{
        width: 40,
        height: 40,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      },
      headerIconView:{
        width: 40,
        height: 40,
        borderRadius: 20,
        opacity: 0.1,
        backgroundColor: '#ffffff',
        position: 'absolute',
      }
});
