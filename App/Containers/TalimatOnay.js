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
export default class TalimatOnay extends React.Component {
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
              margin: 10,
            }}>
            <ScrollView>
              <View style={{padding: 10}}>
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
                      }}>
                      İşlem Tamamlandı
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 20}}>
                  <Button
                    buttonText="Faturalar"></Button>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}


