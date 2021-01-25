import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import i18n from '../i18n';
import { scale } from '../Utils/Scaling';
import CustomIcons from '../Assets/Icons/CustomIcons';
import colors from './colors';
import { createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthLoadingScreen from '../auth';
/*import IntroductionScreen from '../Containers/Introduction';
import SignInScreen from '../Containers/SignIn';
import BiometricLoginScreen from '../Containers/BiometricLogin';
import ResetPinScreen from '../Containers/ResetPin';
import SignUpConfirmationScreen from '../Containers/SignUpConfirmation';
import BillListScreen from '../Containers/BillList';
import PaymentInfoScreen from '../Containers/PaymentInfo';
import ThreeDSecureScreen from '../Containers/ThreeDSecure';
*/
import OnboardingScreen from '../Containers/Onboarding';
import OnboardingHesapOlusturScreen from '../Containers/OnboardingHesapOlustur';
import YeniHesapOlusturScreen from '../Containers/YeniHesapOlustur';
import LoginScreen from '../Containers/Login';
import SifremiUnuttumScreen from '../Containers/SifremiUnuttum';
import SmsOnayScreen from '../Containers/SmsOnay';
import TebriklerScreen from '../Containers/Tebrikler';
import BiometricSettingsScreen from '../Containers/BiometricSettings';
import HomeScreen from '../Containers/Home';
import ProfileScreen from '../Containers/Profile';
import ProfileSettingsScreen from '../Containers/ProfileSettings';
import NotificationsScreen from '../Containers/Notifications';
import ChangePasswordScreen from '../Containers/ChangePassword';
import CreditCardsScreen from '../Containers/CreditCards';
import PayBillScreen from '../Containers/PayBill';
import PaidBillsScreen from '../Containers/PaidBills';
import OutgoingsScreen from '../Containers/Outgoings';
import BasketScreen from '../Containers/Basket';
import { SafeAreaView } from 'react-native';
import YaklasanFaturalarScreen from '../Containers/YaklasanFaturalar';
import ChoseBillTypeScreen from '../Containers/ChoseBillType';
import PayBillDetailScreen from '../Containers/PayBillDetail';
import SavedBillsScreen from '../Containers/SavedBills';
import SavedBillDetailScreen from '../Containers/SavedBillDetail';
import BillTypePageScreen from '../Containers/BillTypePage';
import FaturaOdemeScreen from '../Containers/FaturaOdeme';
import FaturaGoruntulemeScreen from '../Containers/FaturaGoruntuleme';
import TalimatDegisiklikScreen from '../Containers/TalimatDegisiklik';
import FaturaGoruntulemeScreen2 from '../Containers/FaturaGoruntuleme2';
import TalimatIptalOnayScreen from '../Containers/TalimatIptalOnay';
import TalimatOnayScreen from '../Containers/TalimatOnay';
import BillTypeInfoScreen from '../Containers/BillTypeInfo';
import TalimatDetayScreen from '../Containers/TalimatDetay';
import FaturaOdemeOnayScreen from '../Containers/FaturaOdemeOnay';

import CreditCardsSelectScreen from '../Containers/CreditCardsSelect';


const AuthStack = createStackNavigator({
  Onboarding:OnboardingScreen,
  OnboardingHesapOlustur:OnboardingHesapOlusturScreen,
  YeniHesapOlustur:YeniHesapOlusturScreen,
  Login:LoginScreen,
  SifremiUnuttum:SifremiUnuttumScreen,
  SmsOnay:SmsOnayScreen,
  PayBill:PayBillScreen,
  Tebrikler:TebriklerScreen,
  BiometricSettings:BiometricSettingsScreen,
  /*SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ForgotPassword: ForgotPasswordScreen,
  SignUpConfirmation: SignUpConfirmationScreen,
  BiometricSettings: BiometricSettingsScreen*/
}, { headerLayoutPreset: 'center' });

/*const BiometricAuthStack = createStackNavigator({
  BiometricLogin: BiometricLoginScreen,
  ResetPin: ResetPinScreen
}, { headerLayoutPreset: 'center' });
*/

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: NotificationsScreen },
  YaklasanFaturalar: { screen: YaklasanFaturalarScreen },
  //BillList: { screen: BillListScreen },
  //PaymentInfo: { screen: PaymentInfoScreen },
  //ThreeDSecure: { screen: ThreeDSecureScreen }
}, { headerLayoutPreset: 'center' });

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('home.tabbar-label')
};

const PaidBillsStack = createStackNavigator({
  PaidBills:{ screen: PaidBillsScreen }
}, { headerLayoutPreset: 'center' });


const PayBillStack = createStackNavigator({
  PayBill: { screen: PayBillScreen },
  Basket:{ screen: BasketScreen },
  ChoseBillType:{ screen: ChoseBillTypeScreen },
  PayBillDetail: { screen: PayBillDetailScreen },
  SavedBills: { screen: SavedBillsScreen },
  SavedBillDetail: { screen: SavedBillDetailScreen },
  BillTypePage: { screen: BillTypePageScreen },
  FaturaOdeme: { screen: FaturaOdemeScreen },
  FaturaGoruntuleme: { screen: FaturaGoruntulemeScreen },
  FaturaGoruntuleme2: { screen: FaturaGoruntulemeScreen2 },
  TalimatDegisiklik: { screen: TalimatDegisiklikScreen },
  TalimatIptalOnay: { screen: TalimatIptalOnayScreen },
  TalimatOnay: { screen: TalimatOnayScreen },
  BillTypeInfo: { screen: BillTypeInfoScreen },
  TalimatDetay: { screen: TalimatDetayScreen },
  FaturaOdemeOnay: { screen: FaturaOdemeOnayScreen },

  CreditCardsSelect: { screen: CreditCardsSelectScreen }
}, {headerLayoutPreset: 'center' });

PayBillStack.navigationOptions = {
  tabBarLabel: i18n.t('paidBills.tabbar-label')
};

const OutgoingsStack = createStackNavigator({
  Outgoings: { screen: OutgoingsScreen },

}, { headerLayoutPreset: 'center' });

const ProfileStack = createStackNavigator({
  Profile:{ screen: ProfileScreen },
  ProfileSettings:{ screen: ProfileSettingsScreen },
  ChangePassword:{ screen: ChangePasswordScreen },
  CreditCards:{ screen: CreditCardsScreen }

}, { headerLayoutPreset: 'center' });


const SignedIn = createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    PaidBills: { screen: PaidBillsStack },
    PayBill: { screen: PayBillStack },
    Outgoings: { screen: OutgoingsStack },
    Profile:{ screen: ProfileStack },
  },
  { 
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused ? 'homeYellow' : 'home';
        } else if (routeName === 'PaidBills') {
          iconName = focused ? 'faturalar-mYellow' : 'faturalar-m';
        } else if (routeName === 'PayBill') {
          iconName = focused ? 'groupYellow' : 'group';
        } else if (routeName === 'Outgoings') {
          iconName = focused ? 'harcamalar-mYellow' : 'harcamalar-m';
        } else if (routeName === 'Profile') {
          iconName = focused ? 'profileYellow' : 'profile';
        }
        console.log("iconname",iconName)
        return <SafeAreaView><CustomIcons icon={iconName} size={scale(40)}/></SafeAreaView>;
      }
    }),
    tabBarOptions: {
      showLabel: false,
      //inactiveTintColor: '#f8b716',
      //activeBackgroundColor: 'transparent',
      //inactiveBackgroundColor: 'transparent',
      //activeTintColor: '#f8b716',
      keyboardHidesTabBar: true,
      style: {
        backgroundColor: colors.headerColor,
      }
    }
  }
));

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    //Introduction: IntroductionScreen,
    App: SignedIn,
    Auth: AuthStack,
    //BiometricAuth: BiometricAuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));