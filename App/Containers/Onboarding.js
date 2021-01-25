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
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';
import colors from '../Config/colors';
import Button from '../Components/Button';
import mainStyles from '../Config/style';

export default class Onboarding extends React.Component {
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
            <StatusBar
              backgroundColor={colors.pageBgColor}
              barStyle="light-content"
            />

            <View
              style={{
                height: '25%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
              }}>
              <Logo />
            </View>

            <View style={{height: '25%'}}>
              <Text style={[styles.hosgeldiniz, {fontSize: 25, color: '#fff'}]}>
                Hoşgeldiniz! {'\n'} {'\n'}
                {'\n'}{' '}
              </Text>
              <Text style={styles.hosgeldiniz}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod.
              </Text>
            </View>

            <View
              style={{
                height: '25%',
                flex: 1,
              }}>
              <Button
                style={{marginTop: 15, borderRadius: 15}}
                onPress={() =>
                  NavigationService.navigate('OnboardingHesapOlustur')
                }
                buttonText="Yeni hesap oluştur"></Button>
              <Button
                buttonText="Hesap oluşturmadan devam et"
                style={[
                  mainStyles.button1,
                  {marginTop: 15, borderColor: '#fff', borderRadius: 15},
                ]}
                textStyle={[
                  mainStyles.buttonTitleStyle1,
                  {color: '#fff'},
                ]}></Button>

              <Text style={styles.hesabimVar}>
                Hesabım var
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('Login')}>
                  <Text style={styles.login}>Giriş Yap</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    );
  }
}

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
  hesabimVar: {
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.31,
    color: '#bec1db',
    textAlign: 'center',
    marginTop: 20,
  },
  login: {
    paddingLeft: 10,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
