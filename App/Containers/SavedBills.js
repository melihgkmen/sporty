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
export default class SavedBills extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Saved Bills',
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
              margin:20
            }}>
            <ScrollView>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('SavedBillDetail')}>
                  <View style={styles.buttonStyle}>
                    <LinearGradient
                      colors={['#464968', '#464968']}
                      style={styles.linearGradient}>
                      <View style={{width: '65%', flexDirection: 'row'}}>
                        <Image
                          source={require('../Assets/Images/electric-bill.png')}
                          style={styles.maskFourImage}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            padding: 10,
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.Text1}>Elektrik Faturası</Text>

                          <Text style={styles.Text2}>
                            Kurum: CK BOĞAZiçi Elektrik
                          </Text>
                          <Text style={styles.Text2}>
                            Hesap No: 334885145586
                          </Text>
                        </View>
                      </View>
                      <View style={{width: '35%', alignItems: 'flex-end'}}>
                        <Icon
                          name="chevron-right"
                          color="#fff"
                          size={15}></Icon>
                      </View>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => NavigationService.navigate('SavedBillDetail')}>
                  <View style={styles.buttonStyle}>
                    <LinearGradient
                      colors={['#464968', '#464968']}
                      style={styles.linearGradient}>
<View style={{width: '65%', flexDirection: 'row'}}>
                       
                      <Image
                        source={require('../Assets/Images/gas-bill.png')}
                        style={styles.maskFourImage}
                      />
                        <View
                          style={{
                            flexDirection: 'column',
                            padding: 10,
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.Text1}>Doğalgaz Faturası</Text>
                        <Text style={styles.Text2}>Kurum: IGDAS</Text>
                        <Text style={styles.Text2}>
                          Sözleşme No: 334885145586
                        </Text>
                        </View>
                      </View>
                      <View style={{width: '35%', alignItems: 'flex-end'}}>
                        <Icon
                          name="chevron-right"
                          color="#fff"
                          size={15}></Icon>
                      </View>


                    </LinearGradient>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => NavigationService.navigate('SavedBillDetail')}>
                  <View style={styles.buttonStyle}>
                    <LinearGradient
                      colors={['#464968', '#464968']}
                      style={styles.linearGradient}>
						  <View style={{width: '65%', flexDirection: 'row'}}>
                      <Image
                        source={require('../Assets/Images/gas-bill.png')}
                        style={styles.maskFourImage}
                      />
						 <View
						   style={{
							 flexDirection: 'column',
							 padding: 10,
							 justifyContent: 'center',
						   }}>
						  <Text style={styles.Text1}>Doğalgaz Faturası</Text>
                        <Text style={styles.Text2}>Kurum: IGDAS</Text>
                        <Text style={styles.Text2}>
                          Sözleşme No: 334885145586
                        </Text>
						 </View>
					   </View>
					   <View style={{width: '35%', alignItems: 'flex-end'}}>
						 <Icon
						   name="chevron-right"
						   color="#fff"
						   size={15}></Icon>
					   </View>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => NavigationService.navigate('SavedBillDetail')}>
                  <View style={styles.buttonStyle}>
                    <LinearGradient
                      colors={['#464968', '#464968']}
                      style={styles.linearGradient}>
                      	  <View style={{width: '65%', flexDirection: 'row'}}>
                      <Image
                        source={require('../Assets/Images/gas-bill.png')}
                        style={styles.maskFourImage}
                      />
						 <View
						   style={{
							 flexDirection: 'column',
							 padding: 10,
							 justifyContent: 'center',
						   }}>
						  <Text style={styles.Text1}>Doğalgaz Faturası</Text>
                        <Text style={styles.Text2}>Kurum: IGDAS</Text>
                        <Text style={styles.Text2}>
                          Sözleşme No: 334885145586
                        </Text>
						 </View>
					   </View>
					   <View style={{width: '35%', alignItems: 'flex-end'}}>
						 <Icon
						   name="chevron-right"
						   color="#fff"
						   size={15}></Icon>
					   </View>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => NavigationService.navigate('SavedBillDetail')}>
                  <View style={styles.buttonStyle}>
                    <LinearGradient
                      colors={['#464968', '#464968']}
                      style={styles.linearGradient}>
                     	  <View style={{width: '65%', flexDirection: 'row'}}>
                      <Image
                        source={require('../Assets/Images/gas-bill.png')}
                        style={styles.maskFourImage}
                      />
						 <View
						   style={{
							 flexDirection: 'column',
							 padding: 10,
							 justifyContent: 'center',
						   }}>
						  <Text style={styles.Text1}>Doğalgaz Faturası</Text>
                        <Text style={styles.Text2}>Kurum: IGDAS</Text>
                        <Text style={styles.Text2}>
                          Sözleşme No: 334885145586
                        </Text>
						 </View>
					   </View>
					   <View style={{width: '35%', alignItems: 'flex-end'}}>
						 <Icon
						   name="chevron-right"
						   color="#fff"
						   size={15}></Icon>
					   </View>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
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
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#464968',
    alignItems: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 10,
    height: 100,
    borderRadius: 7,
  },
  Text1: {
    width: 139,
    height: 21,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff',
  },
  Text2: {
    width: 222,
    height: 20,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#a0a7ba',
    marginTop: 0,
  },

  maskFourImage: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    width: 55,
	height: 55,
	alignSelf:"center"
  },
});
