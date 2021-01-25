import React, { Component } from 'react';
import {
  ActivityIndicator,
  
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from './Services/NavigationService';
import colors from './Config/colors';
import { color } from 'react-native-reanimated';

export default class Auth extends Component {
  constructor() {
    super();
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const isIntroduced = await AsyncStorage.getItem('isIntroduced');
    const isIntroducedVal = JSON.parse(isIntroduced);
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    const isLoggedInVal = JSON.parse(isLoggedIn);
    const biometricLogin = await AsyncStorage.getItem('biometricLogin');
    const biometricLoginVal = JSON.parse(biometricLogin);
    const biometricResulted = await AsyncStorage.getItem('biometricResulted');
    const biometricResultedVal = JSON.parse(biometricResulted);
    if (isLoggedInVal) {
      NavigationService.navigate('App');
    } else { 
      NavigationService.navigate(biometricLoginVal && biometricResultedVal ? 'BiometricAuth' : 'Auth'); 
    } 
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" backgroundColor={colors.headerColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },
});
