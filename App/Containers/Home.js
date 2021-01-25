import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Picker from '../Components/Picker';
import LinearGradient from 'react-native-linear-gradient';
import API from '../Services/Api';
import Toast from '../Components/Toast';
import Mixpanel from '../Services/Mixpanel';
import i18n, {currentLang} from '../i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';

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
import DogalgazImage from '../Assets/Images/dogalgazImage.svg';
import ElektrikImage from '../Assets/Images/elektrikImage.svg';
import colors from '../Config/colors';
const yaklasanFaturalar = require('../Assets/Images/yaklasanFaturalar.png');
const odenenFaturalar = require('../Assets/Images/odenenFaturalar.png');
const tumFaturalar = require('../Assets/Images/tumFaturalar.png');

class Home extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor:"white",
      headerTitle:params ?"Hoşgeldin "+ params.nameSurname:"",
      headerStyle:{
        backgroundColor: colors.headerColor,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
      },
      headerLeft: () => null,
      headerRight: () => (
             <TouchableOpacity style={{marginRight:10}} onPress={()=>NavigationService.navigate("Notifications")}>
          <Icon name="bell" color="white" size={20}/>
        </TouchableOpacity>
      ),
    };
  };

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
  componentDidMount = () => {
    Mixpanel.track('application_started');
    Mixpanel.track('signin_to_home');
    this.barRengi(0);
  };
  componentWillMount = async () => {
    await this.setTokenToGlobal();
    await this.getHomePageInfo();
    await AsyncStorage.removeItem('isLoggedIn');
  };
  cikis() {
    const {_signOut} = this.props;
    _signOut('userAction');
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
  signOutAsync = async () => {
    const {_signOut} = this.props;
    _signOut();
  };
  getBillImage(billTypeId) {
    switch (billTypeId) {
      case 1:
        return <SuImage />;
      case 2:
        return <ElektrikImage />;
      case 3:
        return <TelekominikasyonImage />;
      case 5:
       return <TelekominikasyonImage/>;
      case 6:
       return <TelekominikasyonImage/>;
      case 7:
      return <TelekominikasyonImage/>;
      case 7:
        return <DigerImage />;
    }
  }
  render() {
    console.log('this.props.billTypes', this.state.unpaidBillList);
    return (
      <View style={{flex: 1, backgroundColor: colors.pageBgColor}}>
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              padding: 10,
            }}>
          <ScrollView>
            <View
              style={{
                padding: 20,
                height: Dimensions.get('window').height / 2.5,
              }}>
              <View style={{height: '30%'}}>
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
                      {this.state.selectedMonth} Ayı Faturaların
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
              <View style={{height: '70%'}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={this.state.aylar}
                  renderItem={({item, index}) => (
                    <View style={{flexDirection: 'column-reverse'}}>
                      {index < this.state.countAy ? (
                        <TouchableOpacity
                          style={{
                            borderRadius: 6,
                            width: 66,
                            backgroundColor: this.state.aylar[index].barColor,
                            height: item.height,
                            justifyContent: 'flex-end',
                            marginRight: 15,
                          }}
                          onPress={() => this.barRengi(index)}>
                          <Text
                            style={{
                              fontFamily: 'Avenir',
                              fontSize:
                                this.state.aylar[index].barColor == '#757aa5'
                                  ? 15
                                  : 12,
                              fontWeight: '900',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              textAlign: 'center',
                              color: '#acb1c0',
                            }}>
                            {item.text}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
            <View
              style={{
                padding: 20,
                height:170,
                margin:-10
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={[
                  {
                    renkler: ['#F9BA1F', '#F87F2F'],
                    text1: '4',
                    text2: 'Yaklaşan Faturalar',
                    image:yaklasanFaturalar,
                    navigate:"YaklasanFaturalar"
                  },
                  {
                    renkler: ['#F88629', '#F82C7A'],
                    text1: '6',
                    text2: 'Ödenen Faturalar',
                    image:odenenFaturalar,
                    navigate:"PaidBills"
                  },
                  {
                    renkler: ['#F82C7A', '#642CF8'],
                    text1: '4',
                    text2: 'Tüm Faturalar',
                    image:tumFaturalar,
                    navigate:""
                  },
                ]}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={()=>NavigationService.navigate(item.navigate)}>
                    <ImageBackground source={item.image} style={{width:200,flex:1
                        ,paddingTop:25,paddingHorizontal:20}}>
                    <Text
                        style={{
                          //fontFamily: "SourceSansPro",
                          fontSize: 30,
                          fontWeight: 'bold',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#ffffff',
                        }}>
                        {item.text1}
                      </Text>
                      <Text
                        style={{
                          //fontFamily: "SourceSansPro",
                          fontSize: 14,
                          fontWeight: '600',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#ffffff',
                        }}>
                        {item.text2}
                      </Text>
                 
                    </ImageBackground>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View
              style={{margin: 20,marginTop:10, height: Dimensions.get('window').height / 4}}>
              <FlatList
                data={this.state.unpaidBillList}
                renderItem={({item, index}) => (
                  <View style={{flexDirection:"row",paddingBottom:10}}>
                    <View style={{width:"15%"}}>
                    {this.getBillImage(item.BillTypeID)}
                    </View>
                    <View style={{flexDirection:"column",width:"40%",justifyContent:"center",paddingLeft:10}}>
                    <Text style={styles.billTextType}>{item.BillType}</Text>
                    <Text style={styles.billTextType2}>{item.BillType}</Text>
                    </View>
                    <View style={{flexDirection:"column",width:"45%",alignItems:"flex-end"}}>
                    <Text  style={styles.billTextType3}>125 ₺</Text>
                    <Text  style={styles.billTextType2}>{item.BillType}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  homeView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  billTextType:{fontFamily: "Poppins",
  fontSize: 15,
  fontWeight: "600",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#ffffff"},
  billTextType2:{
   // fontFamily: "SourceSansPro",
  fontSize: 15,
  fontWeight: "300",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#a0a7ba"
  },
  billTextType3:{
   // fontFamily: "ProximaNovaA",
  fontSize: 18,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "right",
  color: "#e74c3c"
  }
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
