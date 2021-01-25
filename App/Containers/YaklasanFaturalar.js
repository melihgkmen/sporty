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
import colors from '../Config/colors';
import Button from '../Components/Button';
import mainStyles from '../Config/style';

class YaklasanFaturalar extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Yaklaşan Faturalar',
      headerStyle: {
        backgroundColor: colors.headerColor,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerRight: () => 
      <TouchableOpacity  onPress={() => NavigationService.navigate('Basket')}>
          <Icon
            name="shopping-basket"
            color="#fff"
            size={20}
            style={{marginRight: 15}}></Icon>
        </TouchableOpacity>,
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
      isLoading: false,
      paidBillsList: [],
      billTypeId: undefined,
      dateTypeId: 0,
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
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                margin: 20,
                backgroundColor: '#464968',
                borderRadius: 6,
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '75%',
                  }}>
                  <Text style={styles.baslik1}>
                    Elektrik Faturası
                  </Text>
                  <Text style={styles.baslik2}>Son Ödeme Tarihi</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    width: '25%',
                  }}>
                  <Text
                    style={[
                      styles.baslik1,
                      {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
                    ]}>
                    125 ₺
                  </Text>
                  <Text style={styles.baslik2}>12.12.20</Text>
                </View>
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
                      style={{marginBottom: 10}}
                      buttonText="Öde"></Button>
                  
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  baslik1: {
    padding: 3,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff',
  },
  baslik2: {
    //fontFamily: "SourceSansPro",
    fontSize: 15,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#a0a7ba',
    color: '#a0a7ba',
    padding: 3,
  },

});

const mapStateToProps = (state) => ({
  token: state.accountInfo.token,
  numberOfNotifications: state.accountInfo.numberOfNotifications,
});

const mapDispatchToProps = (dispatch) => ({
  _setLoader: (payload) => dispatch(setLoader(payload)),
  _setNumberOfNotifications: (payload) =>
    dispatch(setNumberOfNotifications(payload)),
  _signOut: (payload) => dispatch(signOut(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(YaklasanFaturalar);
