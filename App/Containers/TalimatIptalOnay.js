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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
const onboardingbg = require('../Assets/Images/onboardingbg.png');
import Avatar from '../Components/Avatar';
import colors from '../Config/colors';
import Text from '../Components/Text';
import Input from '../Components/Input';
import NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../Config/style';
import {scale} from '../Utils/Scaling';
import Button from '../Components/Button';
export default class TalimatIptalOnay extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Talimat İptal Onay',
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
              margin: 20,
            }}>
            <ScrollView>
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 15,
                    fontWeight: '600',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#ffffff',
                  }}>
                  Lütfen işleminizi onaylayınız
                </Text>
                <LinearGradient
                  colors={['#464968', '#464968']}
                  style={styles.linearGradient}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: '50%'}}>
                      <Text style={styles.elektrikFaturasıText}>Kurum:</Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Fatura Tipi:
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Tesisat Tipi
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Tesisat No:
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Müşteri Adı:
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Kayıt İsmi:
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '50%',
                        alignItems: 'flex-end',
                      }}>
                      <Text style={styles.elektrikFaturasıText}>Kıbrıs Su</Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Su Tüketim Bedeli
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Abone Numarası
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>0510021</Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Berkem Erkan
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Su Faturası
                      </Text>
                    </View>
                  </View>
                </LinearGradient>

                <View style={{flexDirection: 'row', paddingTop: 20}}>
                  <View style={{width: '48%'}}>
                    <Button
                      onPress={() => NavigationService.back()}
                      buttonText=" İptal"
                      style={mainStyles.button1}
                      textStyle={mainStyles.buttonTitleStyle1}></Button>
                  </View>
                  <View style={{width: '4%'}}></View>
                  <View style={{width: '48%'}}>
                    <Button
                      onPress={() => NavigationService.navigate('TalimatOnay')}
                      style={{marginBottom: 10}}
                      buttonText="Onay"></Button>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
