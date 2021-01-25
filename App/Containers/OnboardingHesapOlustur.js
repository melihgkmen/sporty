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
} from 'react-native';
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import {AppColors} from '../Assets/AppColors';
import Logo from '../Assets/Images/logo.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';
import { Header } from 'react-navigation-stack';


export default class OnboardingHesapOlustur extends React.Component {
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
<View
            style={{
              height: 50,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginLeft:-10
            }}>
            <TouchableOpacity onPress={()=>NavigationService.back()} style={{
                width: 40,
                height: 40,
                flexDirection:"row",
                alignSelf: 'flex-end',
                alignItems:"center",
                justifyContent:"center"
              }}>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                opacity: 0.1,
                backgroundColor: '#ffffff',
                position:"absolute",
              }}>
              </View>
                <Icon name="chevron-left" color="#fff" size={20}></Icon>
         
            </TouchableOpacity> 
            </View>
            <View
              style={{
                height: '25%',
                alignItems: 'center',
                justifyContent:"center",
                marginTop:100-Header.HEIGHT,
              }}>
              <Logo />
            </View>
            <View style={{height: '25%'}}>
              <Text style={[styles.hosgeldiniz, {fontSize: 25, color: '#fff'}]}>
                Yeni hesap oluştur {'\n'} 
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
              <TouchableOpacity style={styles.buttonstyle} onPress={()=>NavigationService.navigate("YeniHesapOlustur")}>
                <Icon
                  name="envelope-o"
                  size={18}
                  style={styles.iconStyle}></Icon>
                <Text style={styles.textStyle}>E-mail ile kayıt ol</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonstyle,
                  {backgroundColor: '#3b5998', borderColor: 'transparent'},
                ]}>
                <Icon
                  name="facebook-f"
                  size={18}
                  style={[styles.iconStyle, {color: '#fff'}]}></Icon>
                <Text style={[styles.textStyle, {color: '#fff'}]}>
                  Facebook ile devam et
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonstyle,
                  {backgroundColor: '#dc4e41', borderColor: 'transparent'},
                ]}>
                <Icon
                  name="google"
                  size={18}
                  style={[styles.iconStyle, {color: '#fff'}]}></Icon>
                <Text style={[styles.textStyle, {color: '#fff'}]}>
                  Google ile devam et
                </Text>
              </TouchableOpacity>
              <Text
                style={styles.hesabimVar}>
                Hesabım var
                <TouchableOpacity onPress={()=>NavigationService.navigate("Login")}>
                  <Text
                    style={styles.login}>
                    Giriş Yap
                  </Text>
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
  buttonstyle: {
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
  iconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  textStyle: {
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
  hesabimVar:{
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.31,
    color: '#bec1db',
    textAlign: 'center',
    marginTop: 10,
  },
  login:{
    paddingLeft: 10,
    color: '#fff',
    textDecorationLine: 'underline',
  }
});
