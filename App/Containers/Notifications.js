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

class Notifications extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: i18n.t('notifications.title'),
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
    const {_setLoader} = this.props;
    this.state = {
      notificationsList: [],
    };
    _setLoader(true);
  }
  componentDidMount = () => {
    Mixpanel.track('home_to_notifications');
  };
  componentWillMount = async () => {
    this.getNotifications();
  };
  getNotifications = async () => {
    const {_setLoader, token} = this.props;
    const api = API.createApi();
    await api.getNotifications(token, currentLang).then((result) => {
      const {problem} = result;
      if (!problem) {
        const {ResultCode, response} = result.data;
        if (ResultCode === 20001) {
          this.signOutAsync();
          return;
        }
        this.setState({notificationsList: response.Notifications});
        _setLoader(false);
      } else {
        Mixpanel.track(problem);
        _setLoader(false);
        Toast(i18n.t(`apiErrors.${problem}`));
      }
    });
  };
  dismissNotification = async ({
    index,
    ID = null,
    Status,
    InvoiceTypeId = null,
    NotID = null,
  }) => {
    const {
      _setLoader,
      token,
      _setNumberOfNotifications,
      numberOfNotifications,
    } = this.props;
    const {notificationsList} = this.state;
    const api = API.createApi();
    _setLoader(true);
    await api
      .dismissNotification({
        Token: token,
        Status,
        BillTypeID: InvoiceTypeId,
        ID,
        NotID,
      })
      .then((result) => {
        const {problem} = result;
        if (!problem) {
          const tempArray = [...notificationsList];
          tempArray.splice(index, 1);
          _setNumberOfNotifications(numberOfNotifications - 1);
          this.setState({notificationsList: tempArray});
          _setLoader(false);
        } else {
          Mixpanel.track(problem);
          _setLoader(false);
          Toast(i18n.t(`apiErrors.${problem}`));
        }
      });
  };

  renderListEmptyComponent = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: scale(22)}}>
        {i18n.t('home.list-empty-text')}
      </Text>
    </View>
  );

  signOutAsync = async () => {
    const { _signOut } = this.props;
    _signOut();
  };

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
            <View style={{flexDirection: 'row', height: 90, margin: 20}}>
              <FlatList
                alwaysBounceVertical={false}
                ListEmptyComponent={this.renderListEmptyComponent}
                data={this.state.notificationsList}
                renderItem={({item, index}) => {
                  if (item.Status === 1) {
                    return <Text>hatırlatıcı</Text>;
                  }
                  return (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: Dimensions.get('screen').width,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                          backgroundColor: '#464968',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#757aa5',
                            width: 75,
                            borderTopLeftRadius: 6,
                            borderBottomLeftRadius: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Icon name="bell" color="#f8b716" size={20} />
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 20,
                          }}>
                          <Text style={styles.bildirimText1}>
                            Elektrik Faturası ödemesi gecikti
                          </Text>
                          <Text style={styles.bildirimText2}>1 hafta önce</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.dismissNotification(
                            index,
                            item.ID,
                            item.Status,
                            item.Message,
                            item.NotID,
                          )
                        }>
                        <View
                          style={{
                            borderTopRightRadius: 6,
                            borderBottomRightRadius: 6,
                            width: 100,
                            backgroundColor: '#e74c3c',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Icon name="trash-o" color="#ffffff" size={30} />
                        </View>
                      </TouchableOpacity>
                    </ScrollView>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
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
    padding: 3,
  },
  bildirimText2: {
    //fontFamily: "SourceSansPro",
    fontSize: 15,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
