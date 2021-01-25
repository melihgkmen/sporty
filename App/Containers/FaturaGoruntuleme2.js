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
import {Button, CheckBox} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Picker from '../Components/Picker';
import colors from '../Config/colors';

class FaturaGoruntuleme2 extends React.Component {
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
        <TouchableOpacity  onPress={() => NavigationService.navigate('Basket')}>
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
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 10,
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  height: 150,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '10%'}}>
                    <Icon name="check" color="#f8b716" size={20} />
                  </View>
                  <View style={{width: '90%', flexDirection: 'column'}}>
                    <Text style={styles.text1}>224455221100</Text>
                    <Text style={styles.text2}>
                      Statü: Ödendi{'\n'}
                      Tahsilat Tarihi: 20/10/20{'\n'}
                      Son Ödeme Tarihi: 06/11/20{'\n'}
                      Tutar: 47,20 TL
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 10,
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  height: 150,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '10%'}}>
                    <Icon name="check" color="#f8b716" size={20} />
                  </View>
                  <View style={{width: '90%', flexDirection: 'column'}}>
                    <Text style={styles.text1}>224455221100</Text>
                    <Text style={styles.text2}>
                      Statü: Ödendi{'\n'}
                      Tahsilat Tarihi: 20/10/20{'\n'}
                      Son Ödeme Tarihi: 06/11/20{'\n'}
                      Tutar: 47,20 TL
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 20,
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  height: 150,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '10%'}}>
                    <Icon name="close" color="#e74c3c" size={20} />
                  </View>
                  <View style={{width: '90%', flexDirection: 'column'}}>
                    <Text style={styles.text1}>224455221100</Text>
                    <Text style={styles.text2}>
                      Statü: Ödenmedi{'\n'}
                      Tahsilat Tarihi: 20/10/20{'\n'}
                      Son Ödeme Tarihi: 06/11/20{'\n'}
                      Tutar: 47,20 TL
                    </Text>
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
  text1: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff',
    paddingBottom: 10,
  },
  text2: {
    //fontFamily: "SourceSansPro",
    fontSize: 15,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#a0a7ba',
  },
});

const mapStateToProps = (state) => ({
  token: state.accountInfo.token,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(FaturaGoruntuleme2);
