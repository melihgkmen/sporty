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
export default class SavedBillsDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Talimat Detayı',
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
                <LinearGradient
                  colors={['#464968', '#464968']}
                  style={styles.linearGradient}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: '50%'}}>
                      <Text style={styles.elektrikFaturasıText}>Kurum:</Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Tesisat No:
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Müşteri Adı
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>Kayıt Adı</Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Tahsilat Tipi
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        Ödeme Şekli
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        1. Ödeme Aracı
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '50%',
                        alignItems: 'flex-end',
                      }}>
                      <Text style={styles.elektrikFaturasıText}>
                        CK BOGAZİCİ
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        3753303400
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>
                        BE**** KÖ***
                      </Text>
                      <Text style={styles.elektrikFaturasıText}>Elektrik</Text>
                      <Text style={styles.elektrikFaturasıText}>Otomatik</Text>
                      <Text style={styles.elektrikFaturasıText}>Hesap</Text>
                      <Text style={styles.elektrikFaturasıText}>
                        401 665854
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
                <View style={{marginTop: 20}}>
                  <Button
                  style={{marginBottom:10}}
                    onPress={() => NavigationService.navigate('FaturaOdeme')}
                    buttonText="Borç Sorgulama"></Button>
                  <Button
                    onPress={() =>
                      NavigationService.navigate('FaturaGoruntuleme')
                    }
                    buttonText="Fatura / Borç Görüntüleme"
                    style={[mainStyles.button1,{marginBottom:10}]}
                    textStyle={mainStyles.buttonTitleStyle1}></Button>
                  <Button
                    onPress={() =>
                      NavigationService.navigate('TalimatDegisiklik')
                    }
                    buttonText="Talimat Değişiklik"
                    style={mainStyles.button1}
                    textStyle={mainStyles.buttonTitleStyle1}></Button>
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
