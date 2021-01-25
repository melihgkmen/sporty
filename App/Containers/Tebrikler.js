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
import TebriklerImage from '../Assets/Images/tebrikler.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationService from '../Services/NavigationService';
import colors from '../Config/colors';

export default class Tebrikler extends React.Component {
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
        
              <TebriklerImage />
            </View>
              <View>
              <Text style={[styles.hosgeldiniz, {fontSize: 25, color: '#fff'}]}>
              Tebrikler! {'\n'} 
              </Text>
              <Text style={[styles.hosgeldiniz, {fontSize: 14, color: '#fff'}]}>
              Üyeliğiniz oluşturuldu. 
              </Text>
              </View>
            <View
              style={{
                  marginTop:20,
                height: '25%',
                flex: 1,
              }}>
              <TouchableOpacity style={styles.buttonstyle} onPress={()=>NavigationService.navigate("BiometricSettings")}>
               
                <Text style={styles.textStyle}>Giriş Yap</Text>
              </TouchableOpacity>
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
  buttonstyle: {
    width: '100%',
    height: 44,
    borderRadius: 15,
    backgroundColor: '#f8b716',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    padding: 10,
    marginTop: 15,
    justifyContent:"center"
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

