import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '../Components/Text';
import Input from '../Components/Input';
import NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import i18n from '../i18n';
import {scale} from '../Utils/Scaling';
import validate from '../Utils/Validate';
import Mixpanel from '../Services/Mixpanel';
import API from '../Services/Api';
import mainStyles from '../Config/style';
import colors from '../Config/colors';
import Toast from '../Components/Toast';
import {setLoader, signOut} from '../Actions';
import Button from '../Components/Button';

class ChangePassword extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: i18n.t('changePassword.title'),
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
      currentPassword: undefined,
      currentPasswordError: undefined,
      newPassword: undefined,
      newPasswordError: undefined,
      _newPassword: undefined,
      _newPasswordError: undefined,
    };
    _setLoader(false);
  }

  componentDidMount = () => {
    Mixpanel.track('settings_to_changepassword');
  };

  handleChangePassword = async () => {
    const api = API.createApi();
    const {_setLoader, token, email} = this.props;
    const {currentPassword, newPassword, _newPassword} = this.state;
    const pan = undefined;
    if (!this.isFormValid()) return;
    _setLoader(true);
    await api
      .changePassword(token, currentPassword, newPassword, pan, _newPassword)
      .then(async (result) => {
        const {problem} = result;
        if (!problem) {
          const {ResultCode} = result.data;
          if (ResultCode === 20001) {
            this.signOutAsync();
            return;
          }
          _setLoader(false);
          if (ResultCode !== 0) {
            Mixpanel.track(`${ResultCode}`);
            Toast(i18n.t(`apiResponses.${ResultCode}`));
          } else {
            Mixpanel.track(`changePassword_${ResultCode}`);
            await Keychain.setGenericPassword(email, newPassword);
            Toast(i18n.t(`apiResponses.${ResultCode}`));
            NavigationService.navigate('Settings');
          }
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
    const {currentPassword, newPassword, _newPassword} = this.state;
    const currentPasswordError = validate('password', currentPassword);
    const newPasswordError = validate('password', newPassword);
    // eslint-disable-next-line no-underscore-dangle
    const _newPasswordError = validate('confirmPassword', [
      _newPassword,
      newPassword,
    ]);
    this.setState({
      currentPasswordError,
      newPasswordError,
      _newPasswordError,
    });
    if (currentPasswordError || newPasswordError || _newPasswordError) {
      return false;
    }
    return true;
  }

  render() {
    const {
      currentPassword,
      currentPasswordError,
      newPassword,
      newPasswordError,
      _newPassword,
      _newPasswordError,
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
                    title={i18n.t(
                      'changePassword.current-password-placeholder',
                    )}
                    validationError={currentPasswordError}
                    value={currentPassword}
                    onChangeText={(text) =>
                      this.setState({currentPassword: text})
                    }
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.viewStyle}>
                  <Input
                    title={i18n.t('changePassword.new-password-placeholder')}
                    validationError={newPasswordError}
                    value={newPassword}
                    onChangeText={(text) => this.setState({newPassword: text})}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.viewStyle}>
                  <Input
                    title={i18n.t(
                      'changePassword.confirm-new-password-placeholder',
                    )}
                    validationError={_newPasswordError}
                    value={_newPassword}
                    onChangeText={(text) => this.setState({_newPassword: text})}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
                <View style={{marginTop: 10,}}>
                <Button
                  onPress={() => {
                    Keyboard.dismiss();
                    this.handleChangePassword();
                  }}
                   buttonText={i18n.t('changePassword.confirm-button')}></Button>
                </View>
              
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
    height: 80,
    borderRadius: 7,
    backgroundColor: '#464968',
    marginVertical: 5,
  },
});

const mapStateToProps = (state) => ({
  token: state.accountInfo.token,
  email: state.accountInfo.email,
});

const mapDispatchToProps = (dispatch) => ({
  _setLoader: (payload) => dispatch(setLoader(payload)),
  _signOut: (payload) => dispatch(signOut(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
