import React from "react"
import { 
	Image,
	StyleSheet,
	View,
	SafeAreaView,
	Button,
	ImageBackground,
	TouchableOpacity,
	Switch,
	Dimensions,
	FlatList,
} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import Avatar from '../Components/Avatar';
import colors from '../Config/colors';
import Text from '../Components/Text';
import NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../Config/style';
import { scale } from '../Utils/Scaling';
import API from '../Services/Api';
import Toast from '../Components/Toast';
import Mixpanel from '../Services/Mixpanel';
import i18n, {currentLang} from '../i18n';
import Picker from '../Components/Picker';
import LinearGradient from 'react-native-linear-gradient';
import { PieChart } from 'react-native-svg-charts'
import {
	setLoader,
	setToken,
	signOut,
	setNameSurname,
	setEmail,
	setPhoneNumber,
	setLastLogin,
	setNumberOfNotifications,
	setUnpaidBillsList,
	setBillTypes,
	setBillTypesExtraData,
	setCustomerNo,
	setBillTypeId,
	setCompanyId,
  } from '../Actions';
import SuImage from '../Assets/Images/suImage.svg';
import TelekominikasyonImage from '../Assets/Images/telekominikasyonImage.svg';
import DigerImage from '../Assets/Images/digerImage.svg';
import ElektrikImage from '../Assets/Images/elektrikImage.svg';
import GayrimenkulImage from '../Assets/Images/gayrimenkulImage.svg';
import TrafikImage from '../Assets/Images/trafikImage.svg';
import EgitimImage from '../Assets/Images/egitimImage.svg';
export class Outgoings extends React.Component {

	static navigationOptions = ({ navigation }) => {
		const  {params} = navigation.state
		return {
			headerShown: true,
			headerTintColor:"white",
			headerTitle:"Outgoings",
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
		const {_setLoader} = this.props;
		this.state = {
		  pageRefreshing: false,
		  paidBillList: [],
		  unpaidBillList: [],
		  ay: undefined,
		  countAy: 5,
		  aylar: [
			{
			  label: '1 Ay',
			  value: 1,
			  text: 'Ocak',
			  height: '30%',
			  barColor: '#464968',
			},
			{
			  label: '2 Ay',
			  value: 2,
			  text: 'Şub',
			  height: '40%',
			  barColor: '#464968',
			},
			{
			  label: '3 Ay',
			  value: 3,
			  text: 'Mar',
			  height: '100%',
			  barColor: '#464968',
			},
			{
			  label: '4 Ay',
			  value: 4,
			  text: 'Nis',
			  height: '50%',
			  barColor: '#464968',
			},
			{
			  label: '5 Ay',
			  value: 5,
			  text: 'May',
			  height: '90%',
			  barColor: '#464968',
			},
			{
			  label: '6 Ay',
			  value: 6,
			  text: 'Haz',
			  height: '80%',
			  barColor: '#464968',
			},
			{
			  label: '7 Ay',
			  value: 7,
			  text: 'Tem',
			  height: '90%',
			  barColor: '#464968',
			},
			{
			  label: '8 Ay',
			  value: 8,
			  text: 'Ağu',
			  height: '60%',
			  barColor: '#464968',
			},
			{
			  label: '9 Ay',
			  value: 9,
			  text: 'Eyl',
			  height: '10%',
			  barColor: '#464968',
			},
			{
			  label: '10 Ay',
			  value: 10,
			  text: 'Eki',
			  height: '30%',
			  barColor: '#464968',
			},
			{
			  label: '11 Ay',
			  value: 11,
			  text: 'Kas',
			  height: '30%',
			  barColor: '#464968',
			},
			{
			  label: '12 Ay',
			  value: 12,
			  text: 'Ara',
			  height: '30%',
			  barColor: '#464968',
			},
		  ],
		};
	
		_setLoader(true);
	  }

	  getHomePageInfo = async () => {
		const api = API.createApi();
		const {pageRefreshing} = this.state;
		const {_setLoader, token} = this.props;
		await api.getHomePageInfo(token, currentLang).then((result) => {
		  const {problem} = result;
		  if (!problem) {
			const {ResultCode, response} = result.data;
			if (ResultCode === 20001) {
			  this.signOutAsync();
			  return;
			}
			const {
			  Email,
			  LastFourPayment,
			  LastLogin,
			  PhoneNumber,
			  UnPaidSubscriberList,
			  Username,
			  NotificationCount,
			} = response;
			const {
			  _setNameSurname,
			  _setEmail,
			  _setPhoneNumber,
			  _setLastLogin,
			  _setNumberOfNotifications,
			} = this.props;
			this.setState({
			  paidBillList: LastFourPayment,
			  unpaidBillList: UnPaidSubscriberList,
			});
			if (!pageRefreshing) {
			  this.bringBillTypes();
			}
			this.props.navigation.setParams({ nameSurname: Username })
	
			_setNameSurname(Username);
			_setEmail(Email);
			_setPhoneNumber(PhoneNumber);
			_setLastLogin(LastLogin);
			_setNumberOfNotifications(NotificationCount);
		  } else {
			Mixpanel.track(problem);
			_setLoader(false);
			Toast(i18n.t(`apiErrors.${problem}`));
		  }
		});
	  };  

	componentDidMount() {
	Mixpanel.track('application_started');
    Mixpanel.track('signin_to_home');
    this.barRengi(0);
	}
	barRengi(index) {
		var aylar = this.state.aylar;
		aylar.forEach((element) => {
		  element.barColor = '#464968';
		});
		if (aylar[index].barColor == '#757aa5') aylar[index].barColor = '#464968';
		else aylar[index].barColor = '#757aa5';
		this.setState({aylar: aylar, selectedMonth: aylar[index].text});
	  }

	componentWillMount = async () => {
		await this.setTokenToGlobal();
		await this.getHomePageInfo();
		await AsyncStorage.removeItem('isLoggedIn');
	  };

	  setTokenToGlobal = async () => {
		const {_setToken} = this.props;
		_setToken(await AsyncStorage.getItem('userToken'));
	  };

	  bringBillTypes = async () => {
		const api = API.createApi();
		const {
		  _setLoader,
		  token,
		  _setBillTypes,
		  _setBillTypesExtraData,
		} = this.props;
		await api.getBillTypes(token, currentLang).then((result) => {
		  const {problem} = result;
		  if (!problem) {
			const {ResultCode, response} = result.data;
			if (ResultCode === 20001) {
			  this.signOutAsync();
			  return;
			}
			const resultArray = response.billTypeList.map((elm) => ({
			  label: elm.BillName,
			  value: elm.BillID,
			}));
			_setBillTypes(resultArray);
			_setBillTypesExtraData([
			  {label: i18n.t('home.all-bills-text'), value: '0'},
			  ...resultArray,
			]);
			_setLoader(false);
		  } else {
			Mixpanel.track(problem);
			_setLoader(false);
			Toast(i18n.t(`apiErrors.${problem}`));
		  }
		});
	  };

	render() {
		const data = [50, 10, 40, 95]
 
        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
 
        const pieData = data
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))
 
    console.log('this.props.billTypes', this.state.unpaidBillList);
    return (
      <View style={{flex: 1, backgroundColor:'#464968'}}>
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}>
		<ScrollView>
            <View
              style={{
                padding: 20,
                height: Dimensions.get('window').height / 2.5,backgroundColor: colors.pageBgColor
              }}>
              <View style={{height: '20%'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{width: '70%'}}>
                    <Text
                      style={{
                        opacity: 0.5,
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 29,
                        letterSpacing: 0,
                        color: '#dbdde5',
                      }}>
                      {this.state.selectedMonth} Ayı Faturalarım
                    </Text>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        lineHeight: 30,
                        letterSpacing: 0,
                        color: '#f8b716',
                      }}>
                      152,15 ₺
                    </Text>
                  </View>
                  <View style={{width: '30%'}}>
                    <Picker
                      bgColor="#464968"
                      placeholder="Aylar"
                      items={this.state.aylar}
                      value={this.state.countAy}
                      onValueChange={(value) => {
                        this.setState({countAy: value});
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{height:'80%',marginTop:15}}>
			  <PieChart style={{ height: 190 }} data={pieData} />
			  <View style={{flexDirection: 'row',marginTop:15}}>
			  <View style={{flexDirection: 'row'}}>
				  <View 
				  style={{width: 10,height: 10,borderRadius:7,backgroundColor: '#e5912b',marginLeft:20, marginTop:20}}></View>
				  <Text style={{marginLeft:5, marginTop:16}}>Su</Text>
			  </View>
			  <View style={{flexDirection: 'row'}}>
				  <View 
				  style={{width: 10,height: 10,borderRadius:7,backgroundColor: '#f83e6a', marginLeft:30,marginTop:20}}></View>
				  <Text style={{marginLeft:5, marginTop:16}}>Elektrik</Text>
			  </View>
			  <View style={{flexDirection: 'row'}}>
				  <View 
				  style={{width: 10,height: 10,borderRadius:7,backgroundColor: '#a72cbe', marginLeft:30,marginTop:20}}></View>
				  <Text style={{marginLeft:5, marginTop:16}}>Telekom</Text>
			  </View>
			  <View style={{flexDirection: 'row'}}>
				  <View 
				  style={{width: 10,height: 10,borderRadius:7,backgroundColor: '#444eca', marginLeft:30,marginTop:20}}></View>
				  <Text style={{marginLeft:5, marginTop:16}}>Trafik</Text>
			  </View>
			  </View>
              </View>
			  </View>
			 <View style={{flex:1 ,marginTop:0,marginBottom:30,width:'100%'}}>
						
			 <View style={{flexDirection: 'row', height: 90, paddingTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor: '#464968',
                }}>
                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ElektrikImage name="check" color="#f8b716" size={20} />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '50%',
                  }}>
                  <Text style={styles.bildirimText1}>
					Su Faturası
					</Text>
                  <Text style={styles.bildirimText2}>Tesisat No</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '30%',
                  }}>
                  <Text
                    style={[
                      styles.bildirimText1,
                      {textAlign: 'center', fontWeight: 'bold', fontSize: 18,justifyContent:"flex-end"},
                    ]}>
                    125 ₺
                  </Text>
                  <Text style={[styles.bildirimText2,{textAlign:"center"}]}>34852112221</Text>
                </View>
              </View>   
	</View>
				
	<View style={{flexDirection: 'row', height: 90, paddingTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor: '#464968',
                }}>
                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ElektrikImage name="check" color="#f8b716" size={20} />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '50%',
                  }}>
                  <Text style={styles.bildirimText1}>
					Su Faturası
					</Text>
                  <Text style={styles.bildirimText2}>Tesisat No</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '30%',
                  }}>
                  <Text
                    style={[
                      styles.bildirimText1,
                      {textAlign: 'center', fontWeight: 'bold', fontSize: 18,justifyContent:"flex-end"},
                    ]}>
                    125 ₺
                  </Text>
                  <Text style={[styles.bildirimText2,{textAlign:"center"}]}>34852112221</Text>
                </View>
              </View>   
	</View>
			<View style={{flexDirection: 'row', height: 90, paddingTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor: '#464968',
                }}>
                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ElektrikImage name="check" color="#f8b716" size={20} />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '50%',
                  }}>
                  <Text style={styles.bildirimText1}>
					Su Faturası
					</Text>
                  <Text style={styles.bildirimText2}>Tesisat No</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '30%',
                  }}>
                  <Text
                    style={[
                      styles.bildirimText1,
                      {textAlign: 'center', fontWeight: 'bold', fontSize: 18,justifyContent:"flex-end"},
                    ]}>
                    125 ₺
                  </Text>
                  <Text style={[styles.bildirimText2,{textAlign:"center"}]}>34852112221</Text>
                </View>
              </View>   
	</View>
	<View style={{flexDirection: 'row', height: 90, paddingTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor: '#464968',
                }}>
                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ElektrikImage name="check" color="#f8b716" size={20} />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '50%',
                  }}>
                  <Text style={styles.bildirimText1}>
					Su Faturası
					</Text>
                  <Text style={styles.bildirimText2}>Tesisat No</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '30%',
                  }}>
                  <Text
                    style={[
                      styles.bildirimText1,
                      {textAlign: 'center', fontWeight: 'bold', fontSize: 18,justifyContent:"flex-end"},
                    ]}>
                    125 ₺
                  </Text>
                  <Text style={[styles.bildirimText2,{textAlign:"center"}]}>34852112221</Text>
                </View>
              </View>   
	</View>
	<View style={{flexDirection: 'row', height: 90, paddingTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor: '#464968',
                }}>
                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ElektrikImage name="check" color="#f8b716" size={20} />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '50%',
                  }}>
                  <Text style={styles.bildirimText1}>
					Su Faturası
					</Text>
                  <Text style={styles.bildirimText2}>Tesisat No</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '30%',
                  }}>
                  <Text
                    style={[
                      styles.bildirimText1,
                      {textAlign: 'center', fontWeight: 'bold', fontSize: 18,justifyContent:"flex-end"},
                    ]}>
                    125 ₺
                  </Text>
                  <Text style={[styles.bildirimText2,{textAlign:"center"}]}>34852112221</Text>
                </View>
              </View>   
	</View>
	<View style={{flexDirection: 'row', height: 90, paddingTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor: '#464968',
                }}>
                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ElektrikImage name="check" color="#f8b716" size={20} />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '50%',
                  }}>
                  <Text style={styles.bildirimText1}>
					Su Faturası
					</Text>
                  <Text style={styles.bildirimText2}>Tesisat No</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '30%',
                  }}>
                  <Text
                    style={[
                      styles.bildirimText1,
                      {textAlign: 'center', fontWeight: 'bold', fontSize: 18,justifyContent:"flex-end"},
                    ]}>
                    125 ₺
                  </Text>
                  <Text style={[styles.bildirimText2,{textAlign:"center"}]}>34852112221</Text>
                </View>
              </View>   
	</View>
            </View>
			</ScrollView>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}
		

const styles = StyleSheet.create({
	profileMainImage: {
		flex: 1,
		height:370,
		width:412
	},
	bildirimText1: {
		fontFamily: 'Poppins',
		fontSize: 18,
		fontWeight: 'normal',
		fontStyle: 'normal',
		letterSpacing: 0,
		color: '#ffffff',
		justifyContent:"flex-end",
		fontWeight: "bold",
	  },
	  bildirimText2: {
		//fontFamily: "SourceSansPro",
		fontSize: 15,
		fontWeight: '300',
		fontStyle: 'normal',
		letterSpacing: 0,
		color: '#a0a7ba',
		paddingTop:5
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
		top: 31,
		height: 21,
		marginTop:0,
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
		marginBottom:10
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
		marginTop:15
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

const mapStateToProps = (state) => ({
	token: state.accountInfo.token,
	nameSurname: state.accountInfo.nameSurname,
	email: state.accountInfo.email,
	phoneNumber: state.accountInfo.phoneNumber,
	numberOfNotifications: state.accountInfo.numberOfNotifications,
	billTypes: state.globalVariables.billTypes,
  });
  
  const mapDispatchToProps = (dispatch) => ({
	_setLoader: (payload) => dispatch(setLoader(payload)),
	_setToken: (payload) => dispatch(setToken(payload)),
	_signOut: (payload) => dispatch(signOut(payload)),
	_setNameSurname: (payload) => dispatch(setNameSurname(payload)),
	_setEmail: (payload) => dispatch(setEmail(payload)),
	_setPhoneNumber: (payload) => dispatch(setPhoneNumber(payload)),
	_setLastLogin: (payload) => dispatch(setLastLogin(payload)),
	_setNumberOfNotifications: (payload) =>
	  dispatch(setNumberOfNotifications(payload)),
	_setUnpaidBillsList: (payload) => dispatch(setUnpaidBillsList(payload)),
	_setBillTypes: (payload) => dispatch(setBillTypes(payload)),
	_setBillTypesExtraData: (payload) => dispatch(setBillTypesExtraData(payload)),
	_setCustomerNo: (payload) => dispatch(setCustomerNo(payload)),
	_setBillTypeId: (payload) => dispatch(setBillTypeId(payload)),
	_setCompanyId: (payload) => dispatch(setCompanyId(payload)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Outgoings);