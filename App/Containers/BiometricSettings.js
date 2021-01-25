//
//  OnboardingHesapOlustur
//  LoginLimon
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import {AppColors} from '../Assets/AppColors';
import Logo from '../Assets/Images/logo.svg';
import BiyometrikImage from '../Assets/Images/biometrik.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';
import { connect } from 'react-redux';
import { setLoader } from '../Actions';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../Config/colors';

class BiometricSettings extends React.Component {
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
  }
  handleButtonPress = async (result) => {
    const { _setLoader } = this.props;
    _setLoader(true);
    await AsyncStorage.setItem('biometricResulted', JSON.stringify(true));
    _setLoader(false);
    if (result) {
      NavigationService.navigate('BiometricAuth');
    } else {
      NavigationService.navigate('App');
    }
  }
  componentDidMount() {}

  render() {
    return (
      <ImageBackground source={onboardingbg} style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'transparent', margin: 40}}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              padding: 10,
            }}>
              <StatusBar backgroundColor={colors.pageBgColor} barStyle="light-content" />

            <View
              style={{
                height: '25%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
              }}>
              <Logo />
            </View>

            <View style={{height: '25%',
                justifyContent: 'center',
                alignItems: 'center',}}>
        
              <BiyometrikImage />
            </View>
              <View>
              <Text style={[styles.hosgeldiniz, {fontSize: 20, color: '#fff'}]}>
              {i18n.t('biometricSettings.biometric-question')} {'\n'} 
              </Text>
              <Text style={[styles.hosgeldiniz, {fontSize: 14, color: '#fff'}]}>
              {i18n.t('biometricSettings.biometric-sub-text')}
              </Text>
              </View>
              <View style={{marginTop: 20,flexDirection:"row"}}>
            <View style={{width: '48%'}}>
              <TouchableOpacity style={[styles.buttonstyle,{backgroundColor:"#757aa5"}]}  onPress={() => { this.handleButtonPress(true);}}>
                <Text style={[styles.buttontTextStyle, {color: '#fff'}]}>
                {i18n.t('biometricSettings.biometric-confirm')} 
                </Text>
              </TouchableOpacity>
</View>
              <View style={{width: '4%'}}></View>
              <View style={{width: '48%'}}>
              <TouchableOpacity style={styles.buttonstyle} onPress={() => { this.handleButtonPress(false); }}>
                <Text style={[styles.buttontTextStyle, {color: '#32354e'}]}>
                {i18n.t('biometricSettings.biometric-deny')}
                </Text>
              </TouchableOpacity>
              </View>
            </View> 
          </SafeAreaView>
        </View>
      </ImageBackground>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  _setLoader: payload => dispatch(setLoader(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(BiometricSettings);

const styles = StyleSheet.create({
  hosgeldiniz: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
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
  iconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  textStyle: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.34,
    color: "#32354e"
  },
  hesabimVar:{
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.31,
    color: '#bec1db',
    textAlign: 'center',
    marginTop: 20,
  },
  girisYap:{
    paddingLeft: 10,
    color: '#fff',
    textDecorationLine: 'underline',
  }
});

