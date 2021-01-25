import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {setLoader, setNumberOfNotifications, signOut} from '../Actions';
import Mixpanel from '../Services/Mixpanel';
import API from '../Services/Api';
import i18n, {currentLang} from '../i18n';
import Toast from '../Components/Toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../Components/Text';
import {scale} from '../Utils/Scaling';
import NavigationService from '../Services/NavigationService';
import {CheckBox} from 'react-native-elements';
import colors from '../Config/colors';
import mainStyles from '../Config/style';
import Button from '../Components/Button';

class FaturaOdeme extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Fatura Ödeme',
      headerStyle: {
        backgroundColor: colors.headerColor,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => NavigationService.navigate('Basket')}>
          <Icon
            name="shopping-basket"
            color="#fff"
            size={20}
            style={{marginRight: 15}}></Icon>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => NavigationService.back()}>
          <Icon
            name="chevron-left"
            color="#fff"
            size={20}
            style={{marginLeft: 15}}></Icon>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }
  componentDidMount = () => {};
  componentWillMount = async () => {};
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.pageBgColor}}>
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              margin: 20,
            }}>
            <ScrollView>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.text1}>
                    Kurum:{' '}
                    <Text style={styles.text2}>CK BOGAZİCİ Lorem ipsum</Text>
                  </Text>
                  <Text style={styles.text1}>
                    Tesisat No: <Text style={styles.text2}>557585484</Text>
                  </Text>
                  <Text style={styles.text1}>
                    Müşteri Adı: <Text style={styles.text2}>BE**** KÖ***</Text>
                  </Text>
                </View>
              </View>
              <View style={{paddingTop: 20}}>
                <Text style={styles.text2}>Lütfen fatura seçiniz</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 10,
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '10%',
                    }}>
                    <CheckBox
                      checked={this.state.checked}
                      onPress={() =>
                        this.setState({checked: !this.state.checked})
                      }
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      containerStyle={{
                        marginLeft: -10,
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                      }}
                      checkedColor="#b7bec9"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '50%',
                    }}>
                    <Text style={styles.text1}>Müşteri No:</Text>
                    <Text style={styles.text1}>Tutar:</Text>
                    <Text style={styles.text1}>Son Ödeme Tarihi:</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      width: '40%',
                    }}>
                    <Text style={styles.text2}>5521477223</Text>
                    <Text style={styles.text2}>112,36 TL</Text>
                    <Text style={[styles.text2, {color: '#e74c3c'}]}>
                      30/09/20
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 20,
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '10%',
                    }}>
                    <CheckBox
                      checked={this.state.checked}
                      onPress={() =>
                        this.setState({checked: !this.state.checked})
                      }
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      containerStyle={{
                        marginLeft: -10,
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                      }}
                      checkedColor="#b7bec9"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '50%',
                    }}>
                    <Text style={styles.text1}>Müşteri No:</Text>
                    <Text style={styles.text1}>Tutar:</Text>
                    <Text style={styles.text1}>Son Ödeme Tarihi:</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      width: '40%',
                    }}>
                    <Text style={styles.text2}>5521477223</Text>
                    <Text style={styles.text2}>112,36 TL</Text>
                    <Text style={[styles.text2, {color: '#e74c3c'}]}>
                      30/09/20
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 20,
                  borderRadius: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '50%',
                    }}>
                    <Text style={styles.komisyonText1}>Komisyon</Text>
                    <Text style={[styles.komisyonText1, {color: '#f8b716'}]}>
                      Total Ödenecek Tutar:
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      width: '50%',
                    }}>
                    <Text style={styles.komisyonText1}>0,50 TL</Text>
                    <Text style={[styles.komisyonText1, {color: '#f8b716'}]}>
                      224,55 TL
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <CheckBox
                  checked={this.state.checked}
                  onPress={() => this.setState({checked: !this.state.checked})}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  containerStyle={{
                    marginLeft: -10,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                  checkedColor="#b7bec9"
                  title={
                    <Text
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 14,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#a0a7ba',
                      }}>
                      Otomatik ödeme tanımla
                    </Text>
                  }
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '48%'}}>
                  <Button
                    buttonText="Sepete ekle"
                    style={mainStyles.button1}
                    textStyle={mainStyles.buttonTitleStyle1}></Button>
                </View>
                <View style={{width: '4%'}}></View>
                <View style={{width: '48%'}}>
                  <Button
                    onPress={() =>
                      NavigationService.navigate('FaturaOdemeOnay')
                    }
                    buttonText="Devam"></Button>
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
  text1: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    color: '#a0a7ba',
  },
  text2: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 23,
    letterSpacing: 0,
    color: '#ffffff',
  },
  komisyonText1: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
  },
});

const mapStateToProps = (state) => ({
  token: state.accountInfo.token,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(FaturaOdeme);
