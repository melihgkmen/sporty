import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Switch,
  FlatList,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import Avatar from '../Components/Avatar';
import colors from '../Config/colors';
import Text from '../Components/Text';
import RegisterInput from '../Components/RegisterInput';
import NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../Config/style';
import {scale} from '../Utils/Scaling';
import Modal from '../Components/Modal';
import Button from '../Components/Button';
export default class FaturaOdemeOnay extends React.Component {
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
      headerLeft: () => (
        <TouchableOpacity onPress={() => NavigationService.back()}>
          <Icon
            name="chevron-left"
            color="#fff"
            size={20}
            style={{marginLeft: 15}}></Icon>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => NavigationService.navigate('Basket')}>
          <Icon
            name="shopping-basket"
            color="#fff"
            size={20}
            style={{marginRight: 15}}></Icon>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      dekontModal: false,
      option1: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.pageBgColor}}>
        <ImageBackground style={{flex: 1, backgroundColor: colors.pageBgColor}}>
          <SafeAreaView style={{backgroundColor: 'transparent'}} />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              margin: 10,
            }}>
            <ScrollView>
              <View style={{padding: 10}}>
                <View style={{alignItems: 'center'}}>
                  <LinearGradient
                    colors={['#f88629', '#f82c7a']}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 27,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="check" color="#32354e" size={35} />
                  </LinearGradient>
                  <View style={{marginTop: 20}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 15,
                        fontWeight: '600',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#ffffff',
                      }}>
                      Fatura ödeme işleminiz gerçekleşmiştir
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 20}}>
                  <Button
                    onPress={() => NavigationService.navigate('ChoseBillType')}
                    buttonText="Faturalar"></Button>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 20}}>
                  <View style={{width: '48%'}}>
                    <Button
                      buttonText="Dekont Görüntüle"
                      style={mainStyles.button1}
                      textStyle={mainStyles.buttonTitleStyle1}></Button>
                  </View>
                  <View style={{width: '4%'}}></View>
                  <View style={{width: '48%'}}>
                    <Button
                      onPress={() => this.setState({dekontModal: true})}
                      buttonText="Dekont Gönder"></Button>
                  </View>
                </View>
                <Modal isVisible={this.state.dekontModal}>
                  <View style={{alignItems: 'center', margin: 20}}>
                    {this.state.option1 ? (
                      <View>
                        <Text style={styles.modalTextStyle}>
                          Dekontonuz
                          <Text
                            style={[
                              styles.modalTextStyle,
                              {fontWeight: 'bold'},
                            ]}>
                            {' '}
                            berkemkoymen@gmail.com
                          </Text>{' '}
                          adresine gönderilmiştir.
                        </Text>

                        <View style={{flexDirection: 'row', paddingTop: 20}}>
                          <View style={{width: '48%'}}>
                            <Button
                              onPress={() =>
                                NavigationService.navigate('PayBill')
                              }
                              style={[mainStyles.button1,
                                {
                                  borderColor: '#464968',
                                  backgroundColor:"transparent"
                                }
                              ]}
                              textStyle={{color: '#464968'}}
                              buttonText="Faturalar"></Button>
                          </View>
                          <View style={{width: '4%'}}></View>
                          <View style={{width: '48%'}}>
                            <Button
                              onPress={() =>
                                this.setState({dekontModal: false})
                              }
                              textStyle={[styles.titleStyle2, {color: '#fff'}]}
                              buttonText="Tamam"></Button>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <View style={{marginHorizontal: 20}}>
                          <Text style={styles.modalTextStyle}>
                            Lütfen mail adresinizi giriniz
                          </Text>
                          <RegisterInput
                            style={styles.inputStyle}
                            autoCorrect={false}
                            autoCapitalize="none"
                            //placeholder={i18n.t('signUp.mail-placeholder')}
                            //value={mailaddress}
                            //onChangeText={(text) => this.setState({mailaddress: text})}
                            //editable={!isLoading}
                          />
                          <View style={{marginTop: 20}}>
                            <Button
                              textStyle={[
                                mainStyles.buttonTitleStyle1,
                                {color: '#fff'},
                              ]}
                              onPress={() => this.setState({option1: true})}
                              buttonText="Gönder"></Button>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </Modal>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button1: {
    backgroundColor: 'transparent',
    borderRadius: 6,
    shadowColor: 'rgba(40, 42, 60, 0.3)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f8b716',
    height: 44,
  },
  linearGradient: {
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  elektrikFaturasıText: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: -0.42,
    color: '#ffffff',
  },
  button: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#f8b716',
    height: 44,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.42,
    textAlign: 'right',
    color: '#32354e',
  },

  titleStyle: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.42,
    textAlign: 'right',
    color: '#f8b716',
  },
  titleStyle2: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.42,
    textAlign: 'right',
    color: '#32354e',
  },
  modalTextStyle: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.42,
    color: '#282a3c',
  },

  inputStyle: {
    width: Dimensions.get('screen').width - 40,
    paddingLeft: 10,
    marginTop: 10,
    height: 44,
    opacity: 0.75,
    borderRadius: 15,
    backgroundColor: '#f2f4f7',
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
});
