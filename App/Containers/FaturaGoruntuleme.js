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
import Button from '../Components/Button';

class FaturaGoruntuleme extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Fatura Görüntüleme',
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
                <Text style={styles.text2}>Elektrik Faturası</Text>
                <Text style={styles.text1}>Kurum: CK BOĞAZiçi Elektrik</Text>
                <Text style={styles.text1}>Hesap numarası: 334885145586</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  height: 100,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '65%', flexDirection: 'column'}}>
                    <Text style={styles.text1}>Başlangıç Tarihi</Text>
                    <DatePicker
                      date={this.state.date}
                      mode="date"
                      placeholder="select date"
                      format="DD/MM/YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {borderColor: 'transparent'},
                        dateText: [styles.text2, {alignSelf: 'flex-start'}],
                        placeholderText: [
                          styles.text2,
                          {alignSelf: 'flex-start'},
                        ],
                        datePicker: {
                          backgroundColor: '#d1d3d8',
                          justifyContent: 'center',
                        },
                      }}
                      onDateChange={(date) => {
                        console.log('date', date);
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
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '65%', flexDirection: 'column'}}>
                    <Picker
                      title="Statü"
                      hideIcon={true}
                      placeholder="Statü"
                      items={[
                        {
                          label: 'Tümü',
                          value: 1,
                        },
                        {
                          label: 'Ödenen',
                          value: 2,
                        },
                        {
                          label: 'Ödenmedi',
                          value: 3,
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
              <View style={{marginTop: 20}}>
                <Button
                  onPress={() =>
                    NavigationService.navigate('FaturaGoruntuleme2')
                  }
                  buttonText="Görüntüle"></Button>
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
    letterSpacing: 0,
    color: '#a0a7ba',
  },
  text2: {
    fontFamily: 'Poppins',
    fontSize: 15,
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

export default connect(mapStateToProps, null)(FaturaGoruntuleme);
