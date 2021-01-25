import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '../Components/Text';
import Input from '../Components/Input';
import Picker from '../Components/Picker';
import NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from '../Utils/Scaling';
import {connect} from 'react-redux';
import i18n, {currentLang} from '../i18n';
import validate from '../Utils/Validate';
import Mixpanel from '../Services/Mixpanel';
import API from '../Services/Api';
import mainStyles from '../Config/style';
import colors from '../Config/colors';
import Toast from '../Components/Toast';
import {setLoader, signOut, setNameSurname} from '../Actions';
import Button from '../Components/Button';
class ProfileSettings extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: i18n.t('profile.title-settings'),
      headerStyle: {
        backgroundColor: colors.headerColor,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => NavigationService.back()}>
          <Icon
            name="chevron-left"
            color="#fff"
            size={20}
            style={{marginLeft: 15}}></Icon>
        </TouchableOpacity>
      ),
      headerRight: () => null,
    };
  };

  constructor(props) {
    super(props);
    const {_setLoader} = this.props;
    this.state = {
      pickerLoading: false,
      nameSurname: undefined,
      nameSurnameError: undefined,
      phoneNumber: undefined,
      mailAddress: undefined,
      address: undefined,
      addressError: undefined,
      province: undefined,
      provinceError: undefined,
      selectedDistrictId: undefined,
      districtList: [{label: 'INITIAL_STATE', value: '999'}],
      districtId: undefined,
      districtIdError: undefined,
    };
    _setLoader(true);
  }

  componentWillMount = () => {
    this.getProfileInfo();
  };

  componentDidMount = () => {
    Mixpanel.track('settings_to_profile');
  };

  getProfileInfo = async () => {
    const api = API.createApi();
    const {_setLoader, token} = this.props;
    await api.getProfileInfo(token).then((result) => {
      const {problem} = result;
      if (!problem) {
        const {ResultCode, response} = result.data;
        if (ResultCode === 20001) {
          this.signOutAsync();
          return;
        }
        const {NameSurname, Email, Phone, Il, Ilce, Street} = response;
        this.setState({
          nameSurname: NameSurname,
          phoneNumber: Phone,
          mailAddress: Email,
          address: Street,
          selectedDistrictId: Ilce,
          province: Il,
        });
        _setLoader(false);
      } else {
        Mixpanel.track(problem);
        _setLoader(false);
        Toast(i18n.t(`apiErrors.${problem}`));
      }
    });
  };

  getDistricts = async (provinceId, selectedDistrict = undefined) => {
    if (provinceId === null) {
      this.setState({districtList: [{label: 'INITIAL_STATE', value: '999'}]});
      return;
    }

    const api = API.createApi();
    this.setState({pickerLoading: true});
    await api.getDistricts(provinceId, currentLang).then((result) => {
      const {problem} = result;
      if (!problem) {
        const {ResultCode, response} = result.data;
        if (ResultCode === 20001) {
          this.signOutAsync();
          return;
        }
        const resultArray = response.disctrictList.map((elm) => ({
          label: elm.DisctrictName,
          value: elm.DisctrictID,
        }));
        this.setState({districtList: resultArray});
        if (selectedDistrict) {
          this.setState({
            districtId: selectedDistrict,
            selectedDistrictId: undefined,
          });
        }
        this.setState({pickerLoading: false});
      } else {
        Mixpanel.track(problem);
        this.setState({pickerLoading: false});
        Toast(i18n.t(`apiErrors.${problem}`));
      }
    });
  };

  updateProfileInfo = async () => {
    if (!this.isFormValid()) return;

    const api = API.createApi();
    const {_setLoader, token, _setNameSurname} = this.props;
    const {
      nameSurname,
      phoneNumber,
      mailAddress,
      address,
      province,
      districtId,
    } = this.state;
    _setLoader(true);
    await api
      .editProfile(
        token,
        nameSurname,
        phoneNumber,
        mailAddress,
        address,
        province,
        districtId,
      )
      .then((result) => {
        const {problem} = result;
        if (!problem) {
          const {ResultCode} = result.data;
          if (ResultCode === 20001) {
            this.signOutAsync();
            return;
          }
          _setLoader(false);
          Toast(i18n.t(`apiResponses.${ResultCode}`));
          _setNameSurname(nameSurname);
          Mixpanel.track(`editprofile_${ResultCode}`);
          NavigationService.navigate('Profile');
        } else {
          Mixpanel.track(problem);
          _setLoader(false);
          Toast(i18n.t(`apiErrors.${problem}`));
        }
      });
  };

  signOutAsync = async () => {
    const {_signOut} = this.props;
    _signOut();
  };

  isFormValid() {
    const {nameSurname, address, province, districtId} = this.state;
    const nameSurnameError = validate('nameSurname', nameSurname);
    const addressError = validate('address', address);
    const provinceError = validate('province', province);
    const districtIdError = validate('district', districtId);
    this.setState({
      nameSurnameError,
      addressError,
      provinceError,
      districtIdError,
    });
    if (nameSurnameError || addressError || provinceError || districtIdError) {
      return false;
    }
    return true;
  }

  render() {
    const {
      pickerLoading,
      nameSurname,
      nameSurnameError,
      phoneNumber,
      mailAddress,
      address,
      addressError,
      province,
      provinceError,
      selectedDistrictId,
      districtList,
      districtId,
      districtIdError,
    } = this.state;
    return (
      <ImageBackground style={{flex: 1, backgroundColor: colors.pageBgColor}}>
        <SafeAreaView style={{backgroundColor: 'transparent'}} />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            padding: 10,
          }}>
          <ScrollView>
            <KeyboardAvoidingView
              style={{margin: 20, justifyContent: 'center'}}
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              enabled>
              <View>
                <View style={styles.viewStyle}>
                  <Input
                    title={i18n.t('profile.name-surname-placeholder')}
                    validationError={nameSurnameError}
                    value={nameSurname}
                    onChangeText={(text) => this.setState({nameSurname: text})}
                    autoCapitalize="words"
                  />
                </View>
                <View style={styles.viewStyle}>
                  <Input
                    title="Telefon Numarası"
                    value={phoneNumber}
                    pattern="999 999 99 99"
                    editable={false}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <Input
                    title="Mail Adresi"
                    value={mailAddress}
                    editable={false}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <Picker
                    title={i18n.t('profile.province-placeholder')}
                    placeholder={i18n.t('profile.province-placeholder')}
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
                    value={province}
                    onValueChange={(value) => {
                      this.setState({province: value});
                      this.getDistricts(
                        value,
                        selectedDistrictId !== undefined
                          ? selectedDistrictId
                          : null,
                      );
                    }}
                    validationError={provinceError}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <Picker
                    title={i18n.t('profile.district-placeholder')}
                    placeholder={i18n.t('profile.district-placeholder')}
                    items={districtList}
                    value={districtId}
                    onValueChange={(value) => {
                      this.setState({
                        districtId: value,
                      });
                    }}
                    disabled={districtList[0].label === 'INITIAL_STATE'}
                    loading={pickerLoading}
                    validationError={districtIdError}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <Input
                    title={i18n.t('profile.address-placeholder')}
                    validationError={addressError}
                    value={address}
                    onChangeText={(text) => this.setState({address: text})}
                  />
                </View>
              </View>
              <View style={{marginTop: 10}}>
              <Button
                onPress={() => {
                  Keyboard.dismiss();
                  this.updateProfileInfo();
                }}
                 buttonText={i18n.t('profile.save-button')}></Button>
              

              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    padding: 20,
    height: 100,
    borderRadius: 7,
    backgroundColor: '#464968',
    marginVertical: 5,
  },

  button: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#f8b716',
    height: 44,
    marginTop: 10,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.42,
    textAlign: 'right',
    color: '#32354e',
  },
});

const mapStateToProps = (state) => ({
  token: state.accountInfo.token,
});

const mapDispatchToProps = (dispatch) => ({
  _setLoader: (payload) => dispatch(setLoader(payload)),
  _signOut: (payload) => dispatch(signOut(payload)),
  _setNameSurname: (payload) => dispatch(setNameSurname(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
