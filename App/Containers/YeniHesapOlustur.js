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
  ScrollView,
} from 'react-native';
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import {AppColors} from '../Assets/AppColors';
import Logo from '../Assets/Images/logo.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';
import {CheckBox} from 'react-native-elements';
import i18n, {currentLang} from '../i18n';
import Mixpanel from '../Services/Mixpanel';
import {connect} from 'react-redux';
import validate from '../Utils/Validate';
import API from '../Services/Api';
import {setTempToken} from '../Actions';
import Picker from '../Components/Picker';
import Agreement from '../Components/Agreement';
import Toast from '../Components/Toast';
import RegisterInput from '../Components/RegisterInput';
import RegisterPicker from '../Components/RegisterPicker';
import Button from '../Components/Button';

class YeniHesapOlustur extends React.Component {
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
      isLoading: false,
      pickerLoading: false,
      nameSurname: undefined,
      nameSurnameError: undefined,
      phoneNumber: undefined,
      phoneNumberError: undefined,
      mailaddress: undefined,
      mailaddressError: undefined,
      address: undefined,
      addressError: undefined,
      province: undefined,
      provinceError: undefined,
      districtList: [{label: 'INITIAL_STATE', value: '999'}],
      districtId: undefined,
      districtError: undefined,
      password: undefined,
      passwordError: undefined,
      _password: undefined,
      _passwordError: undefined,
      isAgreed: false,
    };
  }

  componentDidMount = () => {
    Mixpanel.track('signin_to_signup');
  };
  getDistricts = async (provinceId) => {
    if (provinceId === null) {
      this.setState({districtList: [{label: 'INITIAL_STATE', value: '999'}]});
      return;
    }

    const api = API.createApi();
    this.setState({pickerLoading: true});
    await api.getDistricts(provinceId, currentLang).then((result) => {
      const {problem} = result;
      if (!problem) {
        const {data} = result;
        const resultArray = data.response.disctrictList.map((elm) => ({
          label: elm.DisctrictName,
          value: elm.DisctrictID,
        }));
        this.setState({districtList: resultArray, pickerLoading: false});
      } else {
        Mixpanel.track(problem);
        this.setState({pickerLoading: false});
        Toast(i18n.t(`apiErrors.${problem}`));
      }
    });
  };

  showAgreement = () => {
    this.Agreement.showAgreement({
      callback: () => this.agreementConfirmed(),
    });
  };

  agreementConfirmed = () => {
    this.setState({isAgreed: true});
  };

  handleSignUp = async () => {
    const api = API.createApi();
    const {
      nameSurname,
      phoneNumber,
      mailaddress,
      address,
      province,
      districtId,
      password,
      isAgreed,
    } = this.state;
    if (!this.isFormValid()) {
      return;
    }
    if (!isAgreed) {
      this.showAgreement();
      return;
    }
    this.setState({isLoading: true});
    await api
      .signUp(
        nameSurname,
        phoneNumber.replace(/\s+/g, ''),
        province,
        districtId,
        address,
        mailaddress,
        password,
        password,
      )
      .then((result) => {
        const {problem} = result;
        if (!problem) {
          const {ResultCode, response} = result.data;
          if (ResultCode !== 0) {
            Mixpanel.track(`${ResultCode}`);
            this.setState({isLoading: false});
            Toast(i18n.t(`apiResponses.${ResultCode}`));
          } else {
            this.handleConfirmation(response.userID);
            Mixpanel.track('user_signed_up');
          }
        } else {
          Mixpanel.track(problem);
          this.setState({isLoading: false});
          Toast(i18n.t(`apiErrors.${problem}`));
        }
      });
  };

  handleConfirmation = (tempToken) => {
    const {_setTempToken} = this.props;
    _setTempToken(tempToken);
    NavigationService.navigateAndReset('SmsOnay');
  };

  isFormValid() {
    const {
      nameSurname,
      phoneNumber,
      mailaddress,
      address,
      province,
      districtId,
      password,
    } = this.state;
    const nameSurnameError = validate('nameSurname', nameSurname);
    const phoneNumberError = validate('phoneNumber', phoneNumber);
    const mailaddressError = validate('email', mailaddress);
    const addressError = validate('address', address);
    const provinceError = validate('province', province);
    const districtError = validate('district', districtId);
    const passwordError = validate('password', password);
    // eslint-disable-next-line no-underscore-dangle
    this.setState({
      nameSurnameError,
      phoneNumberError,
      mailaddressError,
      addressError,
      provinceError,
      districtError,
      passwordError,
    });
    if (
      nameSurnameError ||
      phoneNumberError ||
      mailaddressError ||
      addressError ||
      provinceError ||
      districtError ||
      passwordError
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {
      isLoading,
      pickerLoading,
      nameSurname,
      nameSurnameError,
      phoneNumber,
      phoneNumberError,
      mailaddress,
      mailaddressError,
      address,
      addressError,
      province,
      provinceError,
      districtList,
      districtId,
      districtError,
      password,
      passwordError,
      _password,
      _passwordError,
      isAgreed,
    } = this.state;
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
            <Text style={styles.headerStyle}>{i18n.t('signUp.title')}</Text>
            <TouchableOpacity
              onPress={() => NavigationService.back()}
              style={styles.headerButton}>
              <View style={styles.headerIconView}></View>
              <Icon name="times" color="#fff" size={20}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.viewStyle}>
            <ScrollView alwaysBounceVertical={false}>
              <View style={{marginTop: 20}}>
                <Text style={styles.textStyle}>
                  {i18n.t('signUp.nameSurname-placeholder')}
                </Text>
                <RegisterInput
                  style={styles.inputStyle}
                  keyboardType="email-address" 
                  autoCorrect={false} 
                  autoCapitalize="none"
                  theme="signup"
                  placeholder={i18n.t('signUp.nameSurname-placeholder')}
                  value={nameSurname}
                  onChangeText={(text) => this.setState({nameSurname: text})}
                  editable={!isLoading}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={styles.textStyle}>
                  {i18n.t('signUp.mail-placeholder')}
                </Text>
                <RegisterInput
                  style={styles.inputStyle}
                  keyboardType="email-address" 
                  autoCorrect={false} 
                  autoCapitalize="none"
                  theme="signup"
                  placeholder={i18n.t('signUp.mail-placeholder')}
                  value={mailaddress}
                  onChangeText={(text) => this.setState({mailaddress: text})}
                  editable={!isLoading}
                />
              
              </View>

              <View style={{marginTop: 20}}>
                <Text style={styles.textStyle}>
                  {i18n.t('signUp.phone-number-placeholder')}
                </Text>
                <RegisterInput
                  style={styles.inputStyle}
                  pattern="999 999 99 99" maxLength={13} keyboardType="numeric" returnKeyType="done"
                  autoCorrect={false} 
                  autoCapitalize="none"
                  theme="signup"
                  placeholder={i18n.t('signUp.phone-number-placeholder')}
                  value={phoneNumber}
                  onChangeText={(text) => this.setState({phoneNumber: text})}
                  editable={!isLoading}
                />
              </View>
              <View style={{marginTop: 20, flexDirection: 'row'}}>
                <View style={{width: '48%'}}>
                  <Text style={styles.textStyle}>
                    {i18n.t('signUp.province-placeholder')}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginTop: 10,
                      height: 44,
                      opacity: 0.75,
                      borderRadius: 15,
                      backgroundColor: '#f2f4f7',
                    }}>
                    <RegisterPicker
                      placeholder={i18n.t('signUp.province-placeholder')}
                      items={[
                        {
                          label: 'Lefkoşa',
                          value: 1,
                        },
                        {
                          label: 'Gazimağusa',
                          value: 2,
                        },
                        {
                          label: 'Girne',
                          value: 3,
                        },
                        {
                          label: 'Güzelyurt',
                          value: 4,
                        },
                        {
                          label: 'İskele',
                          value: 5,
                        },
                      ]}
                      validationError={provinceError}
                      value={province}
                      onValueChange={(value) => {
                        this.setState({province: value});
                        this.getDistricts(value);
                      }}
                      theme="signup"
                      disabled={isLoading}
                    />
                  </View>
                </View>
                <View style={{width: '4%'}}></View>
                <View style={{width: '48%'}}>
                  <Text style={styles.textStyle}>
                    {i18n.t('signUp.district-placeholder')}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginTop: 10,
                      height: 44,
                      opacity: 0.75,
                      borderRadius: 15,
                      backgroundColor: '#f2f4f7',
                    }}>
                    <RegisterPicker
                      placeholder={i18n.t('signUp.district-placeholder')}
                      items={districtList}
                      validationError={districtError}
                      value={districtId}
                      onValueChange={(value) => {
                        this.setState({
                          districtId: value,
                        });
                      }}
                      theme="signup"
                      loading={pickerLoading}
                      disabled={
                        districtList[0].label === 'INITIAL_STATE' || isLoading
                      }
                    />
                  </View>
                </View>
              </View>

              <View style={{marginTop: 20}}>
                <Text style={styles.textStyle}>
                  {i18n.t('signUp.password-placeholder')}
                </Text>
                <RegisterInput
                  style={styles.inputStyle}
                  secureTextEntry autoCapitalize="none"
                  theme="signup"
                  value={password}
                  onChangeText={(text) =>
                    this.setState({password: text})
                  }
                  editable={!isLoading}
                  placeholder="******"
                />
              </View>

              <View style={{marginTop: 10}}>
                <CheckBox
                  checked={this.state.isAgreed}
                  onPress={() =>
                    this.setState({isAgreed: !this.state.isAgreed})
                  }
                  title={
                    <Text
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 12,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 20,
                        letterSpacing: 0,
                        color: '#7a869a',
                      }}>
                      {i18n.t('signUp.terms-text')}
                      <Text
                        onPress={() => {
                          this.showAgreement();
                        }}
                        disabled={isLoading}
                        style={{
                          textDecorationLine: 'underline',
                          color: '#32354e',
                        }}>
                        {i18n.t('signUp.clickable-terms-text')}
                      </Text>
                    </Text>
                  }
                  containerStyle={{
                    marginLeft: -10,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                  checkedColor="#b7bec9"
                />
              </View>
              <View style={{marginTop: 20}}>
              <Button
                style={{borderRadius: 15}}
                onPress={() => {
                  Keyboard.dismiss();
                  this.handleSignUp();
                }}
                buttonText={i18n.t('signUp.signUp-button')}
                disabled={isLoading}
                isLoading={isLoading}
                textStyle={{color: '#fff'}}></Button>

              </View>
              <Agreement
                ref={(ref) => {
                  this.Agreement = ref;
                }}
              />
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  _setTempToken: (payload) => dispatch(setTempToken(payload)),
});

export default connect(null, mapDispatchToProps)(YeniHesapOlustur);

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
  headerStyle: {
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
});
