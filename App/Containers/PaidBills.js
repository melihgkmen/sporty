import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {setLoader, setNumberOfNotifications, signOut} from '../Actions';
import Mixpanel from '../Services/Mixpanel';
import API from '../Services/Api';
import i18n, {currentLang} from '../i18n';
import Toast from '../Components/Toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../Components/Text';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {scale} from '../Utils/Scaling';
import colors from '../Config/colors';

class PaidBills extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: i18n.t('paidBills.title'),
      headerStyle: {
        backgroundColor: colors.headerColor,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerLeft: () => null,
      headerRight: () => null,
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
              margin: 20,
            }}>
            <View style={{flexDirection: 'row', height: 90, paddingTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor: '#464968',
                }}>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="check" color="#f8b716" size={20} />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '65%',
                  }}>
                  <Text style={styles.bildirimText1}>
                    Elektrik Faturası ödemesi gecikti
                  </Text>
                  <Text style={styles.bildirimText2}>Ödendi</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '25%',
                  }}>
                  <Text
                    style={[
                      styles.bildirimText1,
                      {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
                    ]}>
                    125 ₺
                  </Text>
                  <Text style={[styles.bildirimText2,{textAlign:"center"}]}>12.12.20</Text>
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
  bildirimText1: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff',
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

export default connect(mapStateToProps, mapDispatchToProps)(PaidBills);
