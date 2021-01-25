import React, { Component } from "react"
import { 
	Image, 
	StyleSheet, 
	View, 
	SafeAreaView, 
	ImageBackground,
	TouchableOpacity,
	Modal,
	KeyboardAvoidingView,
	Animated,
	FlatList,
} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import colors from '../Config/colors';
import Text from '../Components/Text';
import Picker from '../Components/Picker';
import NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../Config/style';
import { scale } from '../Utils/Scaling';
import { openDatabase } from 'react-native-sqlite-storage';
import Mixpanel from '../Services/Mixpanel';
import i18n from '../i18n';
import validate from '../Utils/Validate';
import Toast from '../Components/Toast';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Alert from '../Components/Alert';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

const creditCardImage = require('../Assets/Images/credit-card-image.png');
const creditCardImage2 = require('../Assets/Images/credit-card-image2.png');
const creditCardImage3 = require('../Assets/Images/credit-card-image3.png');

var images = [creditCardImage, creditCardImage2 ,creditCardImage3]
     function imgRandom(imgArr) {
        return imgArr[Math.floor(Math.random() * imgArr.length)];
    }
 console.log(imgRandom(images));

const db = openDatabase({ name: 'CreditCards.db' });

export default class CreditCards extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
			headerShown: true,
			headerTintColor:"white",
			headerTitle:"Credit Cards",
			headerStyle:{
			  backgroundColor: colors.headerColor,
			  shadowRadius: 0,
			  shadowOffset: {
				  height: 0,
			  },
			},
			headerLeft: () => (
			<TouchableOpacity
			onPress={() => NavigationService.back()}>
			<Icon name="chevron-left" color="#fff" size={20} style={{ marginLeft:15 }}></Icon>
			</TouchableOpacity>
			),
			headerRight: () => null,
		  };
	}

	constructor(props) {
		super(props);
		db.transaction((txn) => {
		  txn.executeSql(
			"SELECT name FROM sqlite_master WHERE type='table' AND name='account_cards'",
			[],
			(tx, res) => {
			  if (res.rows.length === 0) {
				txn.executeSql('DROP TABLE IF EXISTS account_cards', []);
				txn.executeSql(
				  'CREATE TABLE IF NOT EXISTS account_cards(id INTEGER PRIMARY KEY AUTOINCREMENT, card_name VARCHAR(20), card_holder VARCHAR(20), card_no VARCHAR(19), exp_date VARCHAR(5))',
				  []
				);
			  }
			}
		  );
		});
		this.state = {
		  creditCardList: undefined,
		  addCardModalShown: false,
		  cardName: undefined,
		  cardNameError: undefined,
		  cardHolder: undefined,
		  cardHolderError: undefined,
		  cardNo: undefined,
		  cardNoError: undefined,
		  expMonthYear: undefined,
		  expMonthYearError: undefined,
		  image:undefined,
		};
		db.transaction((tx) => {
		  // eslint-disable-next-line no-shadow
		  tx.executeSql('SELECT * FROM account_cards', [], (tx, results) => {
			const temp = [];
			for (let i = 0; i < results.rows.length; i += 1) {
			  temp.push(results.rows.item(i));
			}
			this.setState({
			  creditCardList: temp
			});
		  });
		});
	  }
	
	  componentDidMount = () => {
		Mixpanel.track('settings_to_creditcards');
	  }
	
	  renderListEmptyComponent = () => (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Image
			source={require("../Assets/Images/credit-cards-icon.png")}
			style={{resizeMode: "center",
			backgroundColor: "transparent",
			width: 323,
			height: 262,
			marginLeft:20,
			marginTop:90,
			marginBottom:30}}/>
		<Text style={{backgroundColor: "transparent",
		opacity: 0.9,
		color: "white",
		fontFamily: "Poppins-SemiBold",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		lineHeight: 28,
		alignSelf: "center",marginTop:0}}>Sistemde kayıtlı kartınız yok,</Text>
		<TouchableOpacity onPress={() => this.setState({ addCardModalShown: true })}>
		<Text style={{backgroundColor: "transparent",
		opacity: 0.9,
		color: "#f8b716",
		fontFamily: "Poppins-SemiBold",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		lineHeight: 28,
		alignSelf: "center",marginTop:5}}>Yeni kart ekleyebilirsiniz.</Text>
		</TouchableOpacity>
		</View>
	  );
	
	  saveCreditCardInfo = () => {
		const {
		  cardName,
		  cardHolder,
		  cardNo,
		  expMonthYear
		} = this.state;
		if (!this.isFormValid()) return;
	
		db.transaction((tx) => {
		  tx.executeSql(
			'INSERT INTO account_cards (card_name, card_holder, card_no, exp_date) VALUES (?,?,?,?)',
			[cardName, cardHolder, cardNo, expMonthYear],
			// eslint-disable-next-line no-shadow
			(tx, results) => {
			  if (results.rowsAffected > 0) {
				Toast(i18n.t('infoMessages.90002'));
				// eslint-disable-next-line no-shadow
				tx.executeSql('SELECT * FROM account_cards', [], (tx, results) => {
				  const temp = [];
				  for (let i = 0; i < results.rows.length; i += 1) {
					temp.push(results.rows.item(i));
				  }
				  this.setState({
					creditCardList: temp
				  });
				});
			  } else {
				Toast(i18n.t('infoMessages.90003'));
			  }
			}
		  );
		});
		this.setState({
		  addCardModalShown: false,
		  cardName: undefined,
		  cardHolder: undefined,
		  cardNo: undefined,
		  expMonthYear: undefined
		});
	  }
	
	  deleteCreditCardHandler = (item) => {
		this.Alert.initialize({
		  title: 'Kredi Kartı Silme İşlemi',
		  message: `${item.card_name} isimli kredi kartını silmek istediğinize emin misiniz?`,
		  OkButton: () => this.deleteCreditCard(item.id)
		});
	  }

	  renderLeftActions = (progress, dragX) => {
		const trans = dragX.interpolate({
		  inputRange: [0, 50, 100, 101],
		  outputRange: [-20, 0, 0, 1],
		});
		return (
		  <RectButton style={styles.leftAction}>
			<Animated.View
			  style={[
				styles.actionText,
				{
				  transform: [{ translateX: trans }],marginTop:100,marginLeft:40
				},
			  ]}>
			<Icon onPress={() => this.deleteCreditCardHandler} name="close" size={scale(50)} style={{ color: 'red' }} />
			</Animated.View>
		  </RectButton>
		);
	  };
	
	  deleteCreditCard = (id) => {
		const { creditCardList } = this.state;
		db.transaction((tx) => {
		  tx.executeSql(
			'DELETE FROM account_cards where id=?',
			[id],
			// eslint-disable-next-line no-shadow
			(tx, results) => {
			  if (results.rowsAffected > 0) {
				Toast(i18n.t('infoMessages.90004'));
				// eslint-disable-next-line no-shadow
				tx.executeSql('SELECT * FROM account_cards', [], (tx, results) => {
				  const temp = [];
				  for (let i = 0; i < results.rows.length; i += 1) {
					temp.push(results.rows.item(i));
				  }
				  this.setState({
					creditCardList: temp
				  });
				});
			  } else {
				Toast(i18n.t('infoMessages.90005'));
			  }
			}
		  );
		});
		this.setState({ creditCardList });
	  }
	
	  isFormValid() {
		const {
		  cardName,
		  cardHolder,
		  cardNo,
		  expMonthYear
		} = this.state;
		const cardNameError = validate('cardName', cardName);
		const cardHolderError = validate('cardHolder', cardHolder);
		const cardNoError = validate('cardNo', cardNo);
		const expMonthYearError = validate('monthYear', expMonthYear);
		this.setState({
		  cardNameError,
		  cardHolderError,
		  cardNoError,
		  expMonthYearError
		});
		if (cardNameError
		  || cardHolderError
		  || cardNoError
		  || expMonthYearError) {
		  return false;
		}
		return true;
	  }

	  
	  render() {
		const images = [creditCardImage, creditCardImage2, creditCardImage3]
		const {
		  creditCardList,
		  addCardModalShown,
		  cardName,
		  cardNameError,
		  cardHolder,
		  cardHolderError,
		  cardNo,
		  cardNoError,
		  expMonthYear,
		  expMonthYearError,
		} = this.state;
		console.log(creditCardList);
		console.log('creditCardList');

		return (
			<ImageBackground style={{flex: 1, backgroundColor: colors.pageBgColor}}>
			<SafeAreaView style={{backgroundColor: 'transparent',marginTop:20}} />
			  <SafeAreaView
				style={{
				  flex: 1,
				  backgroundColor: 'transparent',
				  padding: 10,
				}}>
			<ScrollView>
			<View style={{ flex: 1 }}>
			  <FlatList
				contentContainerStyle={{ flexGrow: 1 }}
				alwaysBounceVertical={false}
				//ItemSeparatorComponent={this.renderSeparator}
				ListEmptyComponent={this.renderListEmptyComponent}
				data={creditCardList}
				renderItem={({ item }) => (
				  <React.Fragment>
					  <Swipeable renderRightActions={this.renderLeftActions}>
					  <TouchableOpacity>
					  <ImageBackground /* source={require('../Assets/Images/credit-card-image.png')} */ source={imgRandom(images)} style={{width:350,height:225,flex:1
                        ,paddingTop:10,paddingHorizontal:20,marginTop:5, marginLeft:33}}>
					<View style={{
					  flex: 1,
					  marginTop: scale(10),
					  marginLeft: scale(10),
					  marginRight: scale(10),
					}}
					>
					  <Text style={{ fontWeight: 'bold',fontSize:25 }} numberOfLines={1}>{item.card_name}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', margin: scale(10) }}>
					  <View style={{ flex: 1 }}>
						<Text style={{ marginTop: -40 ,fontSize:16 }} numberOfLines={1}>{item.card_holder}</Text>
						<Text style={{ marginTop:10 ,fontSize:16 }}>
						  {item.exp_date}
						</Text>
						<Text style={{ marginBottom: 30 ,marginTop:10,fontSize:20 }}>{item.card_no}</Text>
					  </View>
					  <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
						<TouchableOpacity onPress={() => this.deleteCreditCardHandler(item)}>
						  <Icon name="close" size={scale(50)} style={{ color: 'red' }} />
						</TouchableOpacity>
					  </View>
					</View>
					</ImageBackground>

					</TouchableOpacity>
					</Swipeable>
				  </React.Fragment>
				)}
				keyExtractor={(item, index) => index.toString()}
			  />
			  <View style={{ marginTop:20, marginLeft:30,marginRight:30}}>
			  <Button
			  style={mainStyles.button1}
			  textStyle={mainStyles.buttonTitleStyle1}
			 buttonText={i18n.t('creditCards.add-new-card-button')} onPress={() => this.setState({ addCardModalShown: true })}/>
				</View>
			  <Modal 
			  title={i18n.t('creditCards.credit-card-information-text')}
			  style={{color: "#364151"}}
			  visible={addCardModalShown}
			  animationType="slide"
              transparent={false}>
			<SafeAreaView
                style={{ flex: 1, backgroundColor: "#32354e" }}>
				<ScrollView>
				<Text style={{
				marginLeft:100,
				marginTop:30,	
				height: 21,
				fontFamily: "Poppins",
				fontSize: 15,
				fontWeight: "600",
				fontStyle: "normal",
				letterSpacing: 0,
				color: "#ffffff"}}>Lütfen kart bilgilerinizi giriniz.</Text>
				<View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  height: 80,
				  marginBottom: 10,
				  marginLeft:20,
				  marginRight:20,
				  marginTop:20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: '65%', flexDirection: 'column'}}>
                  <Input validationError={cardNameError} value={cardName} onChangeText={text => this.setState({ cardName: text })} placeholder={i18n.t('creditCards.card-name-placeholder')} autoCapitalize="words"/>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '30%',
                    justifyContent: 'center',
                  }}>
                </View>
              </View>
			  <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  height: 80,
				  marginBottom: 10,
				  marginLeft:20,
				  marginRight:20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: '65%', flexDirection: 'column'}}>
                  <Input validationError={cardHolderError} value={cardHolder} onChangeText={text => this.setState({ cardHolder: text })} placeholder={i18n.t('creditCards.card-holder-placeholder')} autoCapitalize="characters" />
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '30%',
                    justifyContent: 'center',
                  }}>
                </View>
              </View>
			  <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  height: 80,
				  marginBottom: 10,
				  marginLeft:20,
				  marginRight:20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: '65%', flexDirection: 'column'}}>
                  <Input validationError={cardNoError} value={cardNo} onChangeText={text => this.setState({ cardNo: text })} pattern="9999 9999 9999 9999" maxLength={19} placeholder={i18n.t('creditCards.card-number-placeholder')} keyboardType="numeric" returnKeyType="done" />
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '30%',
                    justifyContent: 'center',
                  }}>
                </View>
              </View>
			  <View style={{
				  flexDirection: 'row',
				  width:'100%'
                }}>
			  <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  height: 80,
				  marginBottom: 10,
				  marginLeft:20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: '65%', flexDirection: 'column'}}>
                  <Input validationError={expMonthYearError} value={expMonthYear} onChangeText={text => this.setState({ expMonthYear: text })} pattern="99/99" placeholder={i18n.t('creditCards.card-date-placeholder')} maxLength={5} keyboardType="numeric" returnKeyType="done" />
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '30%',
                    justifyContent: 'center',
                  }}>
                </View>
              </View>
			  </View>
				<View style={{ flexDirection: 'row' ,marginLeft:20,marginRight:20,marginTop:15}}>
				<View style={{width: '48%'}}>
				  <Button style={mainStyles.button1}
                      textStyle={mainStyles.buttonTitleStyle1} buttonText={i18n.t('creditCards.cancel-button')} onPress={() => this.setState({ addCardModalShown: false })} />
				</View>
				<View style={{width: '4%'}}></View>
				<View style={{width: '48%'}}>
				  <Button style={{ flex: 1, backgroundColor: "#f8b716" }} buttonText={i18n.t('creditCards.confirm-button')} onPress={() => this.saveCreditCardInfo()} />
				</View>
				</View>
			  </ScrollView>
				</SafeAreaView>
			  </Modal>
 			<Alert ref={(ref) => { this.Alert = ref; }}/> 
		  </View>
		  </ScrollView>
			</SafeAreaView>
			</ImageBackground>
		);
	  }
	}
		

const styles = StyleSheet.create({
	profileMainImage: {
		flex: 1,
		height:370,
		width:412
	},
	selectIcon: {
		width: 3,
		height: 6,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: '#757aa5'
	  },
	  buttonstyle: {
		height: 60,
		borderRadius: 6,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#f8b716',
		padding: 10,
		marginTop: 5,
		marginRight: 25,
		marginLeft:25,
		justifyContent:"center",
		flexDirection: 'row',
	  },
	  buttonstyle2: {
		height: 60,
		borderRadius: 15,
		backgroundColor: '#32354e',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#f8b716',
		padding: 10,
		marginTop: 0,
		marginRight: 25,
		marginLeft:25,
		justifyContent:"center",
		flexDirection: 'row'
	  },
	  textStyle: {
		fontFamily: "Poppins",
		fontSize: 14,
		fontWeight: "600",
		fontStyle: "normal",
		letterSpacing: -0.34,
		color: "#32354e",
		marginTop:10
	  },
	  textStyle2: {
		fontFamily: "Poppins",
		fontSize: 14,
		fontWeight: "600",
		fontStyle: "normal",
		letterSpacing: -0.34,
		color: "#f8b716",
		marginTop:10
	  },
	  TextLabel: {
  fontFamily: "Poppins",
  fontSize: 15,
  fontWeight: "600",
  fontStyle: "normal",
  color: "#ffffff",
marginLeft:80,
marginTop:20
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
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 17,
		width: 16,
		top: 31,
		height: 21,
	},
	cardsIcon: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		width: 223,
		height: 162,
		marginLeft:80,
		marginTop:90
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
	kurumTipiSecinText2: {
		backgroundColor: "transparent",
		textDecorationLine: 'underline',
		opacity: 0.9,
		color: "#f8b716",
		fontFamily: "Poppins-SemiBold",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		lineHeight: 28,
		position: "absolute",
		alignSelf: "center",
		top: 350,
	},
	kurumTipiSecinText3: {
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
		top: 320,
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
		color: "#a0a7ba",
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
