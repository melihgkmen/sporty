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
import Picker from '../Components/Picker';
import colors from '../Config/colors';
import Button from '../Components/Button';

class Basket extends React.Component {
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
      headerRight: () => null,
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
      <View style={{flex: 1, backgroundColor:colors.pageBgColor}}>
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} />
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              padding: 10,
            }}>
            <ScrollView>
              <View style={{margin:20}}>

              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 10,
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
                    <Text style={styles.text1}>Kurum:</Text>
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
                    <Text style={styles.text2}>Vodafone</Text>
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
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  marginBottom:10
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 20,
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
                    <Text style={styles.text1}>Kurum:</Text>
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
                    <Text style={styles.text2}>İGDAŞ</Text>
                    <Text style={styles.text2}>112,36 TL</Text>
                    <Text style={styles.text2}>
                      30/09/20
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
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
                    <Text style={styles.text1}>Kurum:</Text>
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
                    <Text style={styles.text2}>İGDAŞ</Text>
                    <Text style={styles.text2}>112,36 TL</Text>
                    <Text style={styles.text2}>
                      30/09/20
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginVertical: 20,
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  padding: 20,
                  height: 100,
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
              <View>
              <Button onPress={()=>NavigationService.navigate("FaturaOdemeOnay")}
               buttonText="Ödeme Yap"></Button>
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
  sepeteEkleButton: {
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
  text1: {
    
  fontFamily: "Poppins",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  color: "#ffffff"
  },
  text2: {
    
  fontFamily: "Poppins",
  fontSize: 14,
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: "#ffffff"
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

export default connect(mapStateToProps, null)(Basket);
