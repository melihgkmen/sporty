import React , { Component } from "react"
import { 
	Image, 
	StyleSheet, 
	View, 
	SafeAreaView, 
	ImageBackground,
	TouchableOpacity,
	Switch,
	Share,
    Linking,
    Platform,
} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import i18n, { currentLang } from '../i18n';
import Avatar from '../Components/Avatar';
import colors from '../Config/colors';
import Text from '../Components/Text';
import NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale } from '../Utils/Scaling';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import TouchID from 'react-native-touch-id';
import Mixpanel from '../Services/Mixpanel';
import API from '../Services/Api';
import mainStyles from '../Config/style';
import {
  localBuildNumber, shareURL, helpURL, rateURL
} from '../Config/Settings';
import {
  setLoader, signOut
} from '../Actions';

export class Profile extends React.Component {

	static navigationOptions = ({ navigation }) => {
		const  {params} = navigation.state
		return {
			headerShown: true,
			headerTintColor:"white",
			headerTitle: i18n.t('profile.title'),
			headerStyle:{
			  backgroundColor: colors.headerColor,
			  shadowRadius: 0,
			  shadowOffset: {
				  height: 0,
			  },
			},
			headerLeft: () => null,
			headerRight: () => null,
		  };
	}

	constructor(props) {
		super(props);
		const { _setLoader } = this.props;
		this.state = {
		  biometryType: undefined,
		  isBiometricActive: false,
		  isNotificationsActive: false
		};
		_setLoader(true);
	  }

	componentDidMount() {
	
	}

	componentWillMount = async () => {
		const { _setLoader } = this.props;
		const optionalConfigObject = {
		  unifiedErrors: false,
		  passcodeFallback: false
		};
		TouchID.isSupported(optionalConfigObject)
		  .then((_biometryType) => {
			this.setState({ biometryType: _biometryType }, async () => {
			  if (_biometryType) {
				const isBiometricActive = await AsyncStorage.getItem('biometricLogin');
				this.setState({ isBiometricActive: JSON.parse(isBiometricActive) });
			  }
			});
		  }).catch((error) => {
			// eslint-disable-next-line no-console
			console.log(error);
		  });
		const isNotificationsActive = await AsyncStorage.getItem('receiveNotifications');
		this.setState({ isNotificationsActive: JSON.parse(isNotificationsActive) });
		_setLoader(false);
	  }

	  capitilizeSurname = (nameSurname) => {
		if (!nameSurname) return null;
		const surnameIndex = nameSurname.lastIndexOf(' ');
		if (surnameIndex === -1) return nameSurname;
		const n = nameSurname.split(' ');
		const surnameToUpperCase = n[n.length - 1].toUpperCase();
		const finalNameSurname = `${nameSurname.slice(0, surnameIndex)} ${surnameToUpperCase}`;
		return finalNameSurname;
	  }
	
	  reformatPhoneNumber = (phoneNumber) => {
		if (!phoneNumber) return null;
		return `${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6, 8)} ${phoneNumber.substring(8, 10)}`;
	  }
	
	  reformatLastLogin = (lastLogin) => {
		if (!lastLogin) return null;
		return `${i18n.t('settings.last-login-text')} ${lastLogin.substring(0, 10)}`;
	  }
	
	  renderSeparator = () => (
		<View
		  style={{
			height: 1,
			backgroundColor: '#CED0CE',
			marginLeft: scale(10),
			marginRight: scale(10)
		  }}
		/>
	  );

	  handleSelectedOption = (type) => {
		switch (type) {
		  case 'PROFILE_SETTINGS':
			this.showProfileSettings();
			break;
		  case 'CHANGE_PASSWORD':
			this.showChangePassword();
			break;
		  case 'CARD_PROCESS':
			this.showCreditCards();
			break;
		  case 'REFER_FRIEND':
			this.shareApp();
			break;
		  case 'HELP':
			this.help();
			break;
		  case 'RATE_APP':
			this.rateApp();
			break;
		  case 'APP_EXIT':
			this.signOutAsync();
			break;
		  default:
			break;
		}
	  };
	
	  handleBiometricToggle = async (state) => {
		const { _setLoader, email } = this.props;
		_setLoader(true);
		const isPinCodeSet = await AsyncStorage.getItem('isPinCodeSet');
		const isPinCodeSetVal = JSON.parse(isPinCodeSet);
		const isPinCode4Digit = await AsyncStorage.getItem('pinCode4Digit');
		const isPinCode4DigitVal = JSON.parse(isPinCode4Digit);
		const rememberMe = await AsyncStorage.getItem('rememberMe');
		const rememberMeVal = JSON.parse(rememberMe);
		const rememberMeSetBySettings = await AsyncStorage.getItem('rememberMeSetBySettings');
		const rememberMeSetBySettingsVal = JSON.parse(rememberMeSetBySettings);
		if (state && !rememberMeVal) {
		  await AsyncStorage.multiSet([['userName', email], ['rememberMe', JSON.stringify(true)], ['biometricLogin', JSON.stringify(state)], ['rememberMeSetBySettings', JSON.stringify(true)]]);
		} else if (state && rememberMeVal) {
		  await AsyncStorage.setItem('biometricLogin', JSON.stringify(state));
		} else if (!rememberMeSetBySettingsVal) {
		  AsyncStorage.multiRemove(['rememberMeSetBySettings', 'biometricLogin']);
		} else {
		  AsyncStorage.multiRemove(['userName', 'rememberMe', 'rememberMeSetBySettings', 'biometricLogin']);
		}
		if (!isPinCodeSetVal || !isPinCode4DigitVal) {
		  NavigationService.navigate('BiometricAuth');
		}
		_setLoader(false);
	  }
	
	  handleNotificationsToggle = async (state) => {
		const { _setLoader } = this.props;
		_setLoader(true);
		await this.toggleNotification(state);
		_setLoader(false);
	  }
	
	  toggleNotification = async (state) => {
		const api = API.createApi();
		const userToken = await AsyncStorage.getItem('userToken');
		const devicePlatform = Platform.OS === 'ios' ? 'Apple' : 'Chrome';
		await api.toggleNotifications(userToken, devicePlatform, state)
		  .then(async () => {
			await AsyncStorage.setItem('receiveNotifications', JSON.stringify(state));
		  });
	  }
	
	  showProfileSettings = () => {
		Mixpanel.timeEvent('settings_to_profile');
		NavigationService.navigate('ProfileSettings');
	  }
	
	  showChangePassword = () => {
		Mixpanel.timeEvent('settings_to_changepassword');
		NavigationService.navigate('ChangePassword');
	  }
	
	  showCreditCards = () => {
		Mixpanel.timeEvent('settings_to_creditcards');
		NavigationService.navigate('CreditCards');
	  }

	  shareApp = async () => {
		try {
		  const result = await Share.share(
			{
			  title: i18n.t('appName'),
			  message: i18n.t('settings.share-message-text', { shareURL })
			},
			{
			  excludedActivityTypes: [
				'com.apple.UIKit.activity.Print',
				'com.apple.UIKit.activity.AssignToContact',
				'com.apple.UIKit.activity.SaveToCameraRoll',
				'com.apple.UIKit.activity.AddToReadingList',
				'com.apple.UIKit.activity.AirDrop',
				'com.apple.UIKit.activity.OpenInIBooks',
				'com.apple.UIKit.activity.MarkupAsPDF',
				'com.apple.reminders.RemindersEditorExtension',
				'com.apple.mobilenotes.SharingExtension',
				'com.apple.mobileslideshow.StreamShareService'
			  ]
			}
		  );
	
		  if (result.action === Share.sharedAction) {
			if (result.activityType) {
			  // shared with activity type of result.activityType
			} else {
			  // shared
			}
		  } else if (result.action === Share.dismissedAction) {
			// dismissed
		  }
		} catch (error) {
		  console.log(error);
		}
	  }
	
	  help = () => {
		Linking.canOpenURL(helpURL)
		  .then(supported => supported && Linking.openURL(helpURL),
			err => console.log(err));
	  }
	
	  rateApp = () => {
		Linking.canOpenURL(rateURL)
		  .then(supported => supported && Linking.openURL(rateURL),
			err => console.log(err));
	  }
	
	  signOutAsync = async () => {
		const { _signOut } = this.props;
		_signOut('userAction');
	  };



	render() {
		const {
			biometryType,
			isBiometricActive,
			isNotificationsActive
		  } = this.state;
		  const {
			nameSurname, phoneNumber, email, lastLogin
		  } = this.props;
		return(
		<View style={{flex: 1, backgroundColor: colors.pageBgColor}}>	
		<ImageBackground style={{flex: 1, backgroundColor: "#464968",}}>
		<SafeAreaView style={{backgroundColor: 'transparent'}} />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}>
				
		<ScrollView>
		<ImageBackground
		source={require("../Assets/Images/profile-main-image.png")}
		style={styles.profileMainImage}
		>
          <View style={{marginTop:60,alignItems: 'center',marginRight:20,marginLeft:30}}>
            <Avatar
              circleColor={colors.warning}
              backgroundColor={colors.success}
              fontColor={colors.white}
			  size={150}
              text={nameSurname}
            />
          <View style={{ alignItems: 'center'}}>
            <Text style={{ alignItems: 'center',fontSize:18,fontWeight: "bold",marginTop:20}}>
			{this.capitilizeSurname(nameSurname)}
            </Text>
            <Text style={{ alignItems: 'center',fontSize:15,marginTop:20}}>
			{email}
            </Text>
            <Text style={{ alignItems: 'center' ,fontSize:15}}>{this.reformatPhoneNumber(phoneNumber)}</Text>
            <Text style={{ alignItems: 'center',fontSize:15,marginTop:20}}>{this.reformatLastLogin(lastLogin)}</Text>
          </View>
		  </View>
        </ImageBackground>
		<View style={{marginTop:80}}>
		{biometryType ? this.renderSeparator() : null}
          {biometryType
            ? (
			<TouchableOpacity>
			<View style={{flexDirection: 'row',borderBottomColor: '#757aa5',width:'90%',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:20,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/biometrik-login-icon.png")}
				style={styles.maskFourImage}/>
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.biometric-text')}</Text>
				<Switch
					style={{ justifyContent: 'flex-end' ,width:'20%', marginLeft:40,marginTop:10}}
					value={isBiometricActive}
                    onValueChange={(value) => {
                      this.handleBiometricToggle(value);
                      this.setState({ isBiometricActive: value });
                    }}
                  />
			</View>
			</TouchableOpacity>
			) : null}
			<TouchableOpacity>
			<View style={{flexDirection: 'row',borderBottomColor: '#757aa5',width:'90%',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:0,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/notification-icon.png")}
				style={styles.maskFourImage}/>
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.notifications-text')}</Text>
				<Switch
					style={{ alignItems: 'flex-end' ,width:'20%', marginLeft:40,marginTop:10}}
					value={isNotificationsActive}
               		 onValueChange={(value) => {
                 	 this.handleNotificationsToggle(value);
                  	this.setState({ isNotificationsActive: !isNotificationsActive });
                }}
                  />
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=>NavigationService.navigate("ProfileSettings")}>
			<View style={{flexDirection: 'row',width:'90%',borderBottomColor: '#757aa5',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:0,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/profile-icon.png")}
				style={styles.maskFourImage}/>
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.profile-settings-text')}</Text>
				<View  style={{alignItems: 'flex-end',width:'25%'}}>
				<Icon name="chevron-right" color={colors.light} style={{justifyContent: 'flex-end', marginLeft:70,marginTop:20}}/>
				</View>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=>NavigationService.navigate("ChangePassword")}>
			<View style={{flexDirection: 'row',width:'90%',borderBottomColor: '#757aa5',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:0,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/password-icon.png")}
				style={styles.maskFourImage}/>
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.change-password-text')}</Text>
				<View  style={{alignItems: 'flex-end',width:'25%'}}>
				<Icon name="chevron-right" color={colors.light} style={{justifyContent: 'flex-end', marginLeft:70,marginTop:20}}/>
				</View>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=>NavigationService.navigate("CreditCards")}>
			<View style={{flexDirection: 'row',width:'90%',borderBottomColor: '#757aa5',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:0,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/card-icon.png")}
				style={styles.maskFourImage}/>
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.credit-card-text')}</Text>
				<View  style={{alignItems: 'flex-end',width:'25%'}}>
				<Icon name="chevron-right" color={colors.light} style={{justifyContent: 'flex-end', marginLeft:70,marginTop:20}}/>
				</View>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => this.shareApp()}>
			<View style={{flexDirection: 'row',width:'90%',borderBottomColor: '#757aa5',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:0,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/suggestion-icon.png")}
				style={styles.maskFourImage}/>
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.refer-a-friend-text')}</Text>
				<View  style={{alignItems: 'flex-end',width:'25%'}}>
				<Icon name="chevron-right" color={colors.light} style={{justifyContent: 'flex-end', marginLeft:70,marginTop:20}}/>
				</View>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => this.help()}>
			<View style={{flexDirection: 'row',width:'90%',borderBottomColor: '#757aa5',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:0,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/question-icon.png")}
				style={styles.maskFourImage}/>
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.help-text')}</Text>
				<View  style={{alignItems: 'flex-end',width:'25%'}}>
				<Icon name="chevron-right" color={colors.light} style={{justifyContent: 'flex-end', marginLeft:70,marginTop:20}}/>
				</View>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => this.rateApp()}>
			<View style={{flexDirection: 'row',width:'90%',borderBottomColor: '#757aa5',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:0,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/suggestion-icon.png")}
				style={styles.maskFourImage}/>
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.rate-us-text')}</Text>
				<View  style={{alignItems: 'flex-end',width:'25%'}}>
				<Icon name="chevron-right" color={colors.light} style={{justifyContent: 'flex-end', marginLeft:70,marginTop:20}}/>
				</View>
			</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => this.signOutAsync()}>
			<View style={{flexDirection: 'row',width:'90%',borderBottomColor: '#757aa5',borderBottomWidth: 1,marginRight: 20,marginLeft:20,marginTop:0,marginBottom:20}}>
			<Image
				source={require("../Assets/Images/log-out-icon.png")}
				style={styles.maskFourImage}/>
			
				<Text style={styles.elektrikFaturasıText}>{i18n.t('settings.exit-text')}</Text>
				<View  style={{alignItems: 'flex-end',width:'25%'}}>
				<Icon name="chevron-right" color={colors.light} style={{justifyContent: 'flex-end', marginLeft:70,marginTop:20}}/>
				</View>
			</View>
			</TouchableOpacity>
		</View>
		<View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: scale(10),
            marginBottom: scale(10)
          }}
          >
            <Text style={{ opacity: 0.70, fontSize: 15, fontWeight: '400' ,marginBottom:30}}>{`${i18n.t('settings.version-text')} ${localBuildNumber}`}</Text>
          </View>
		</ScrollView>
			</SafeAreaView>
			</ImageBackground>
			</View>
   		);
	}
}
		

const styles = StyleSheet.create({
	profileMainImage: {
		flex: 1,
		height:'120%',
		width:'100%'
	},
	selectIcon: {
		width: 3,
		height: 6,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: '#757aa5'
	  },
	kurumTipiSecinView: {
		backgroundColor: "white",
		flex: 1,
	},
	bgView: {
		backgroundColor: "rgb(50, 53, 78)",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 620,
	},
	rectangleView: {
		backgroundColor: "rgb(50, 53, 78)",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 620,
	},
	topView: {
		backgroundColor: "rgb(40, 42, 60)",
		height: 72,
	},
	combinedShapeTwoImage: {
		backgroundColor: "transparent",
		left: 17,
		width: 16,
		top:20,
		height: 21,
	},
	kurumTipiSecinText: {
		backgroundColor: "transparent",
		opacity: 0.9,
		color: "white",
		fontFamily: "Poppins-SemiBold",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		lineHeight: 28,
		position: "absolute",
		alignSelf: "center",
		top: 25,
	},
	textText: {
		color: "white",
		fontFamily: "Poppins-SemiBold",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		letterSpacing: 0,
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		marginLeft: 69,
		marginTop: 49,
	},
	elektrikView: {
		backgroundColor: "transparent",
		height: 80,
		marginLeft: 16,
		marginRight: 15,
		marginTop: 40,
	},
	maskCopyImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		shadowColor: "rgba(40, 42, 60, 0.7)",
		shadowRadius: 10,
		shadowOpacity: 1,
		width: null,
		height: 80,
	},
	maskFourImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 55,
		height: 55,
		marginBottom:10,
		width:'20%'
	},
	elektrikFaturasıText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Poppins-SemiBold",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		letterSpacing: 0,
		marginLeft: 16,
		marginTop:15,
		width:200,
		width:'50%'
	},
	combinedShapeCopy2TwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "flex-start",
		width: 14,
		height: 16,
		marginTop: 20,
	},
	dogalgazView: {
		backgroundColor: "transparent",
		height: 80,
		marginLeft: 16,
		marginRight: 15,
		marginTop: 16,
	},
	maskCopy2ThreeImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		shadowColor: "rgba(40, 42, 60, 0.7)",
		shadowRadius: 10,
		shadowOpacity: 1,
		width: null,
		height: 80,
	},
	maskThreeImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 48,
		height: 48,
	},
	dogalgazFaturasıText: {
		color: "white",
		fontFamily: "Poppins-SemiBold",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		letterSpacing: 0,
		backgroundColor: "transparent",
		marginLeft: 16,
	},
	combinedShapeCopy2Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 14,
		height: 16,
	},
	pathImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 16,
		height: 24,
		marginLeft: 32,
	},
	telekomukynView: {
		backgroundColor: "transparent",
		height: 80,
		marginLeft: 16,
		marginRight: 15,
		marginTop: 16,
	},
	maskCopy2TwoImage: {
		backgroundColor: "transparent",
		shadowColor: "rgba(40, 42, 60, 0.7)",
		shadowRadius: 10,
		shadowOpacity: 1,
		resizeMode: "cover",
		width: null,
		height: 80,
	},
	maskTwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 48,
		height: 48,
	},
	telekomunikasyonText: {
		color: "white",
		fontFamily: "Poppins-SemiBold",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		letterSpacing: 0,
		backgroundColor: "transparent",
		marginLeft: 16,
	},
	combinedShapeCopyTwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 14,
		height: 16,
	},
	digerView: {
		backgroundColor: "transparent",
		height: 80,
		marginLeft: 16,
		marginRight: 15,
		marginBottom: 56,
	},
	maskCopy2Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		shadowColor: "rgba(40, 42, 60, 0.7)",
		shadowRadius: 10,
		shadowOpacity: 1,
		width: null,
		height: 80,
	},
	maskImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 48,
		height: 48,
	},
	digerText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Poppins-SemiBold",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		letterSpacing: 0,
		marginLeft: 16,
	},
	combinedShapeCopyImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 14,
		height: 16,
	},
	iconCopyImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 15,
		height: 21,
		marginLeft: 33,
	},
	ovalView: {
		backgroundColor: "rgb(86, 90, 124)",
		borderRadius: 6.5,
		borderWidth: 1,
		borderColor: "rgb(237, 241, 247)",
		borderStyle: "solid",
		position: "absolute",
		left: 42,
		width: 13,
		top: 45,
		height: 13,
	},
	textTwoText: {
		color: "rgb(237, 241, 247)",
		fontFamily: "Poppins-SemiBold",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		lineHeight: 16,
		letterSpacing: 1.2,
		backgroundColor: "transparent",
		position: "absolute",
		left: 45,
		top: 38,
	},
	tabBottomView: {
		backgroundColor: "transparent",
		height: 59,
	},
	bgTwoView: {
		backgroundColor: "rgb(23, 24, 31)",
		opacity: 0.31,
		shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowRadius: 45,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 47,
	},
	bgThreeView: {
		backgroundColor: "rgb(40, 42, 60)",
		shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowRadius: 45,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50,
	},
	homePageImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 21,
		height: 20,
		marginTop: 3,
	},
	groupImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 18,
		height: 23,
		marginLeft: 53,
		marginTop: 1,
	},
	harcamalarımImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 23,
		height: 24,
		marginRight: 55,
	},
	profileImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 15,
		height: 20,
		marginTop: 2,
	},
	bgFourView: {
		backgroundColor: "rgb(248, 183, 22)",
		borderRadius: 25.5,
		borderWidth: 5,
		borderColor: "rgb(40, 42, 60)",
		borderStyle: "solid",
		position: "absolute",
		alignSelf: "center",
		width: 51,
		top: 0,
		height: 51,
	},
	combinedShapeThreeImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 18,
		top: 17,
		height: 18,
	},
	suFaturasıView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 16,
		right: 15,
		top: 88,
		height: 80,
	},
	maskFiveImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		shadowColor: "rgba(40, 42, 60, 0.7)",
		shadowRadius: 10,
		shadowOpacity: 1,
		width: null,
		height: 80,
	},
	maskSixImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 48,
		height: 48,
	},
	suFaturasıText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Poppins-SemiBold",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		letterSpacing: 0,
		marginLeft: 14,
	},
	combinedShapeImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 14,
		height: 16,
	},
	shapeImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 15,
		height: 20,
		marginLeft: 33,
	},
	basketImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		right: 20,
		width: 22,
		top: 30,
		height: 22,
	},
})


const mapStateToProps = state => ({
	nameSurname: state.accountInfo.nameSurname,
	email: state.accountInfo.email,
	phoneNumber: state.accountInfo.phoneNumber,
	lastLogin: state.accountInfo.lastLogin
  });
  
  const mapDispatchToProps = dispatch => ({
	_setLoader: payload => dispatch(setLoader(payload)),
	_signOut: payload => dispatch(signOut(payload))
  });
  
  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(Profile);