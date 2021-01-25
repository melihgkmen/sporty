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
import DatePicker from 'react-native-datepicker';
import Picker from '../Components/Picker';
import colors from '../Config/colors';
import Input from '../Components/Input';
import Button from '../Components/Button';
import mainStyles from '../Config/style';

class TalimatDegisiklik extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Talimat Değişiklik',
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
      date: new Date(),
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
              <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.text2}>Elektrik Faturası</Text>
                  <Text style={styles.text1}>Kurum: CK BOĞAZiçi Elektrik</Text>
                  <Text style={styles.text1}>Hesap numarası: 334885145586</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  height: 100,
                  marginTop:10
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '65%', flexDirection: 'column'}}>
                      <Picker
                      title="Ödeme Aracı"
                        hideIcon={true}
                        placeholder="Ödeme Aracı"
                        items={[
                          {
                            label: 'Kredi Kartı',
                            value: 1,
                          },
                        ]}
                        value={1}
                        onValueChange={(value) => {
                          console.log('aa');
                        }}
                      />
                  </View>
                  <View
                    style={{
                      width: '35%',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Icon name="chevron-right" color="#fff" size={15}></Icon>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  height: 100,
                  marginTop:10
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '65%', flexDirection: 'column'}}>
                      <Picker
                      title="Tahsilat Tipi"
                        hideIcon={true}
                        placeholder="Tahsilat Tipi"
                        items={[
                          {
                            label: 'Manuel',
                            value: 1,
                          },
                          {
                            label: 'Otomatik',
                            value: 2,
                          },
                        ]}
                        value={1}
                        onValueChange={(value) => {
                          console.log('aa');
                        }}
                      />
                  </View>
                  <View
                    style={{
                      width: '35%',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Icon name="chevron-right" color="#fff" size={15}></Icon>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  height: 100,
                  marginTop:10
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '65%', flexDirection: 'column'}}>
                   <Input editable={false} title="Kayıt Adı" value="Elektrik Faturası">
                   </Input>
                  </View>
                  <View
                    style={{
                      width: '35%',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Icon name="chevron-right" color="#fff" size={15}></Icon>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <View
                  style={{
                    width: '48%',
                  }}>
                    
                    <Button
                  onPress={()=>NavigationService.navigate("TalimatIptalOnay")}

                    buttonText="Talimat İptal"
                    style={mainStyles.button1}
                    textStyle={mainStyles.buttonTitleStyle1}></Button>
                </View>
                <View
                  style={{
                    width: '4%',
                  }}></View>
                <View
                  style={{
                    width: '48%',
                  }}>
                    <Button
                  style={{marginBottom:10}}
                    buttonText="Kaydet"></Button>

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
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#a0a7ba',
  },
  text2: {
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff',
  },

});

const mapStateToProps = (state) => ({
  token: state.accountInfo.token,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(TalimatDegisiklik);
