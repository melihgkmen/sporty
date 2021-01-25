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
import {Button} from 'react-native-elements';

const yaklasanFaturalar = require('../Assets/Images/yaklasanFaturalar.png');
const odenenFaturalar = require('../Assets/Images/odenenFaturalar.png');
const tumFaturalar = require('../Assets/Images/tumFaturalar.png');

export default class CreditCardsSelect extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Credit Cards',
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
              <View >
                <LinearGradient
                  colors={['#464968', '#464968']}
                  style={styles.linearGradient}>
            <View
              style={{marginLeft:-60,marginRight:-50,marginBottom:-20}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={[
                  {
                    renkler: ['#F9BA1F', '#F87F2F'],
                    text1: '',
                    text2: '',
                    image:yaklasanFaturalar,
                    navigate:""
                  },
                  {
                    renkler: ['#F88629', '#F82C7A'],
                    text1: '',
                    text2: '',
                    image:odenenFaturalar,
                    navigate:""
                  },
                  {
                    renkler: ['#F82C7A', '#642CF8'],
                    text1: '',
                    text2: '',
                    image:tumFaturalar,
                    navigate:""
                  },
                ]}
                renderItem={({item, index}) => (
                  <TouchableOpacity>
                          <ImageBackground source={item.image} style={{width:290,height:190,flex:1
                        ,paddingTop:10,paddingHorizontal:20,marginTop:5, marginLeft:20}}>
                    <Text
                        style={{
                          //fontFamily: "SourceSansPro",
                          fontSize: 30,
                          fontWeight: 'bold',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#ffffff',
                        }}>
                        {item.text1}
                      </Text>
                      <Text
                        style={{
                          //fontFamily: "SourceSansPro",
                          fontSize: 14,
                          fontWeight: '600',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#ffffff',
                        }}>
                        {item.text2}
                      </Text>
                 
                    </ImageBackground>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
                   
                  </View>
                </LinearGradient>
                <View style={{marginTop: 20}}>
                  <Button
                  //onPress={()=>NavigationService.navigate("FaturaOdeme")}
                    buttonStyle={styles.borcButton}
                    titleStyle={styles.borcTitle}
                    title="Yeni Kart Bilgisi"></Button>
                  <Button
                    //onPress={()=>NavigationService.navigate("FaturaGoruntuleme")}
                    buttonStyle={styles.faturaborcButton}
                    titleStyle={styles.faturaborcTitle}
                    title="Kartı Sil"></Button>
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
    padding: 50,
    backgroundColor: '#464968',
    width:'100%'
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
  borcButton: {
    borderRadius: 6,
    backgroundColor: '#f8b716',
    height: 44,marginBottom: 10
  },
  borcTitle: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.42,
    textAlign: 'right',
    color: '#32354e',
  },
  faturaborcButton: {
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
	backgroundColor:"transparent",
	marginBottom: 10,
    height: 44
  },
  faturaborcTitle: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.42,
    textAlign: 'right',
    color: '#f8b716',
  },
});

