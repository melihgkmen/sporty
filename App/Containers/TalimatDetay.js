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
export default class TalimatDetay extends React.Component {
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
        <TouchableOpacity
          style={{
            backgroundColor: '#F8B716',
            borderRadius: 12,
            width: 24,
            height: 24,
            marginRight: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="info" color="#fff" size={20}></Icon>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      onayGoster: this.props.navigation.state.params
        ? this.props.navigation.state.params.onayGoster
        : false,
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
                {this.state.onayGoster ? (
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
                          textAlign: 'center',
                        }}>
                        Faturanız başarılı bir şekilde kaydedilmiştir.
                      </Text>
                    </View>
                  </View>
                ) : null}
                <View style={{marginTop: 20}}>
                  <LinearGradient
                    colors={['#464968', '#464968']}
                    style={styles.linearGradient}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column', width: '50%'}}>
                        <Text style={styles.elektrikFaturasıText}>Kurum:</Text>
                        <Text style={styles.elektrikFaturasıText}>
                          Tesisat Tipi
                        </Text>
                        <Text style={styles.elektrikFaturasıText}>
                          Sözleşme No
                        </Text>
                        <Text style={styles.elektrikFaturasıText}>
                          Kayıt Adı
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '50%',
                          alignItems: 'flex-end',
                        }}>
                        <Text style={styles.elektrikFaturasıText}>Igdaş</Text>
                        <Text style={styles.elektrikFaturasıText}>
                          Sözleşme Numarası{' '}
                        </Text>
                        <Text style={styles.elektrikFaturasıText}>545151</Text>
                        <Text style={styles.elektrikFaturasıText}>
                          Doğalgaz Faturası
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
                <View style={{marginTop: 20}}>
                  <Button
                    style={{marginBottom: 10}}
                    onPress={() => NavigationService.navigate('FaturaOdeme')}
                    buttonText="Borç Sorgulama"></Button>

                  <Button
                    onPress={() => NavigationService.navigate('SavedBills')}
                    buttonText="Faturalarım"
                    style={[mainStyles.button1, {marginBottom: 10}]}
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
