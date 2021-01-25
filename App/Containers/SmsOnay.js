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
} from 'react-native';
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';
import { Button} from 'react-native-elements';
import i18n from '../i18n';
import Mixpanel from '../Services/Mixpanel';
import API from '../Services/Api';
import Toast from '../Components/Toast';

export default class SmsOnay extends React.Component {
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
      isRequestLoading: false,
      isConfirmLoading: false,
      confirmationCode: undefined,
      secondsLeft: 120,
      secondsLeftShown: false
    };
  }

  componentDidMount() {
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.clockCall);
  }
  decrementClock = () => {
    const { secondsLeft } = this.state;
    this.setState(prevstate => ({ secondsLeft: prevstate.secondsLeft - 1 }), () => {
      if (secondsLeft === 1) {
        clearInterval(this.clockCall);
        this.setState({ secondsLeftShown: false });
      }
    });
  };
  cancel = () => {
    NavigationService.navigateAndReset('Login');
  }
  confirm = async () => {
    const api = API.createApi();
    const { confirmationCode } = this.state;
    const { tempToken } = this.props;
    if (confirmationCode === undefined || confirmationCode.length !== 4) {
      Toast(i18n.t('infoMessages.90008'));
      return;
    }
    this.setState({ isConfirmLoading: true });
    await api.validateOTP(tempToken, confirmationCode)
      .then((result) => {
        const { problem } = result;
        if (!problem) {
          const { ResultCode } = result.data;
          if (ResultCode !== 0) {
            Mixpanel.track(`${ResultCode}`);
            this.setState({ isConfirmLoading: false });
            Toast(i18n.t(`apiResponses.${ResultCode}`));
          } else {
            Mixpanel.track('account_activated');
            NavigationService.navigateAndReset('Login');
          }
        } else {
          Mixpanel.track(problem);
          this.setState({ isConfirmLoading: false });
          Toast(i18n.t(`apiErrors.${problem}`));
        }
      });
  }
  requestCode = async () => {
    const { tempToken } = this.props;
    const api = API.createApi();
    const { secondsLeft } = this.state;
    if (secondsLeft > 0) {
      this.setState({ secondsLeftShown: true });
      return;
    }
    this.setState({ secondsLeftShown: false, isRequestLoading: true });
    await api.getOTP(tempToken)
      .then((result) => {
        const { problem } = result;
        if (!problem) {
          const { ResultCode } = result.data;
          this.setState({ isRequestLoading: false });
          Toast(ResultCode === 0 ? i18n.t('infoMessages.90011') : i18n.t(`apiResponses.${ResultCode}`));
        } else {
          Mixpanel.track(problem);
          this.setState({ isRequestLoading: false });
          Toast(i18n.t(`apiErrors.${problem}`));
        }
      });
  }
  render() {
    const {
      isRequestLoading,
      isConfirmLoading,
      confirmationCode,
      secondsLeft,
      secondsLeftShown
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
            <Text
              style={styles.headerText}>
              SMS ONAY
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
              <Text style={styles.textStyle}>{i18n.t('signUpConfirmation.information-text')}
              {secondsLeftShown ? `\n${secondsLeft} ${i18n.t('signUpConfirmation.information-sub-text')}` : null}</Text>
              <TextInput style={styles.inputStyle} placeholder="_ _ _ _"
              value={confirmationCode} onChangeText={text => this.setState({ confirmationCode: text })} maxLength={4} keyboardType="number-pad"></TextInput>
            </View>
            <View style={{marginTop: 20,flexDirection:"row"}}>
            <View style={{width: '48%'}}>
              <Button titleStyle={[styles.buttontTextStyle, {color: '#fff'}]}
              buttonStyle={[styles.buttonstyle,{backgroundColor:"#757aa5"}]} onPress={() => this.cancel()}
              title={i18n.t('signUpConfirmation.cancel-button')}>

              </Button>
</View>
              <View style={{width: '4%'}}></View>
              <View style={{width: '48%'}}>
                <Button buttonStyle={styles.buttonstyle} loading={isConfirmLoading} onPress={() => this.confirm()}
                titleStyle={[styles.buttontTextStyle, {color: '#fff'}]} title={i18n.t('signUpConfirmation.confirm-button')}>
                  
                </Button>
              </View>
            </View> 
            <View style={{flexDirection:"row",marginTop:20}}>
            <Button title={i18n.t('signUpConfirmation.send-button')} loading={isRequestLoading} onPress={() => this.requestCode()}
            buttonStyle={{width:"65%",backgroundColor:"transparent"}}
  titleStyle={{textDecorationLine:"underline",textAlign:"left",
  paddingLeft:10,
  fontFamily: "Poppins",
  fontSize: 14,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#757aa5",}}
  icon={            <Icon name="refresh" color="#757aa5" size={22}></Icon>
}>

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
