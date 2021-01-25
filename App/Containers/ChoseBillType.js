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
import { connect } from 'react-redux';

import SuImage from '../Assets/Images/suImage.svg';
import TelekominikasyonImage from '../Assets/Images/telekominikasyonImage.svg';
import DigerImage from '../Assets/Images/digerImage.svg';
import ElektrikImage from '../Assets/Images/elektrikImage.svg';
import GayrimenkulImage from '../Assets/Images/gayrimenkulImage.svg';
import TrafikImage from '../Assets/Images/trafikImage.svg';
import EgitimImage from '../Assets/Images/egitimImage.svg';

class ChoseBillType extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: 'Chose Bill Type',
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

  getBillImage(billTypeId) {
    switch (billTypeId) {
      case "1":
        return <SuImage />;
      case "2":
        return <ElektrikImage />;
      case "3":
        return <TelekominikasyonImage />;
      case "5":
       return <GayrimenkulImage/>;
      case "6":
       return <TrafikImage/>;
      case "7":
      return <EgitimImage/>;
      case "9":
        return <DigerImage />;
    }
  }
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
              <View style={{marginTop:10}}>
              <FlatList
              data={this.props.billTypes}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('BillTypePage',{selectedBillTypeId:item.value})}>
                  <View style={styles.buttonStyle}>
                    <LinearGradient
                      colors={['#757aa5', '#343751']}
                      style={styles.linearGradient}>
                      <View style={{width: '65%', flexDirection: 'row'}}>
                        <View style={styles.maskFourImage}>
                          {this.getBillImage(item.value)}
                        </View>
                        <Text style={styles.elektrikFaturasıText}>
                          {item.label}
                        </Text>
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
                  
                )}
                keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  billTypes: state.globalVariables.billTypes,
});


export default connect(
  mapStateToProps,
  null
)(ChoseBillType);

const styles = StyleSheet.create({
  profileMainImage: {
    flex: 1,
    height: 370,
    width: 412,
  },
  linearGradient: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop:0,
    height: 80,
    borderRadius: 7,
  },
  selectIcon: {
    width: 3,
    height: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#757aa5',
  },
  kurumTipiSecinView: {
    backgroundColor: 'white',
    flex: 1,
  },
  bgView: {
    backgroundColor: 'rgb(50, 53, 78)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 620,
  },
  rectangleView: {
    backgroundColor: 'rgb(50, 53, 78)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 620,
  },
  topView: {
    backgroundColor: 'rgb(40, 42, 60)',
    height: 72,
  },
  combinedShapeTwoImage: {
    backgroundColor: 'transparent',
    left: 17,
    width: 16,
    top: 20,
    height: 21,
  },

  maskFourImage: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    width: 55,
    height: 55,
    marginBottom: 10,
    marginTop: 10,
  },
  elektrikFaturasıText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 0,
    marginLeft: 16,
    marginTop: 28,
  },
  combinedShapeCopy2TwoImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    alignSelf: 'flex-start',
    width: 14,
    height: 16,
    marginTop: 20,
  },
  dogalgazView: {
    backgroundColor: 'transparent',
    height: 80,
    marginLeft: 16,
    marginRight: 15,
    marginTop: 16,
  },
  maskCopy2ThreeImage: {
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    shadowColor: 'rgba(40, 42, 60, 0.7)',
    shadowRadius: 10,
    shadowOpacity: 1,
    width: null,
    height: 80,
  },
  maskThreeImage: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    width: 48,
    height: 48,
  },
  dogalgazFaturasıText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 0,
    backgroundColor: 'transparent',
    marginLeft: 16,
  },
  combinedShapeCopy2Image: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    width: 14,
    height: 16,
  },
  pathImage: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    width: 16,
    height: 24,
    marginLeft: 32,
  },
  telekomukynView: {
    backgroundColor: 'transparent',
    height: 80,
    marginLeft: 16,
    marginRight: 15,
    marginTop: 16,
  },
  maskCopy2TwoImage: {
    backgroundColor: 'transparent',
    shadowColor: 'rgba(40, 42, 60, 0.7)',
    shadowRadius: 10,
    shadowOpacity: 1,
    resizeMode: 'cover',
    width: null,
    height: 80,
  },
  maskTwoImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    width: 48,
    height: 48,
  },
  telekomunikasyonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 0,
    backgroundColor: 'transparent',
    marginLeft: 16,
  },
  combinedShapeCopyTwoImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    width: 14,
    height: 16,
  },
  digerView: {
    backgroundColor: 'transparent',
    height: 80,
    marginLeft: 16,
    marginRight: 15,
    marginBottom: 56,
  },
  maskCopy2Image: {
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    shadowColor: 'rgba(40, 42, 60, 0.7)',
    shadowRadius: 10,
    shadowOpacity: 1,
    width: null,
    height: 80,
  },
  maskImage: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    width: 48,
    height: 48,
  },
  digerText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 0,
    marginLeft: 16,
  },
  combinedShapeCopyImage: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    width: 14,
    height: 16,
  },
  iconCopyImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    width: 15,
    height: 21,
    marginLeft: 33,
  },
  ovalView: {
    backgroundColor: 'rgb(86, 90, 124)',
    borderRadius: 6.5,
    borderWidth: 1,
    borderColor: 'rgb(237, 241, 247)',
    borderStyle: 'solid',
    position: 'absolute',
    left: 42,
    width: 13,
    top: 45,
    height: 13,
  },
  textTwoText: {
    color: 'rgb(237, 241, 247)',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 16,
    letterSpacing: 1.2,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 45,
    top: 38,
  },
  tabBottomView: {
    backgroundColor: 'transparent',
    height: 59,
  },
  bgTwoView: {
    backgroundColor: 'rgb(23, 24, 31)',
    opacity: 0.31,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 45,
    shadowOpacity: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 47,
  },
  bgThreeView: {
    backgroundColor: 'rgb(40, 42, 60)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 45,
    shadowOpacity: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 50,
  },
  homePageImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    width: 21,
    height: 20,
    marginTop: 3,
  },
  groupImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    width: 18,
    height: 23,
    marginLeft: 53,
    marginTop: 1,
  },
  harcamalarımImage: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    width: 23,
    height: 24,
    marginRight: 55,
  },
  profileImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    width: 15,
    height: 20,
    marginTop: 2,
  },
  bgFourView: {
    backgroundColor: 'rgb(248, 183, 22)',
    borderRadius: 25.5,
    borderWidth: 5,
    borderColor: 'rgb(40, 42, 60)',
    borderStyle: 'solid',
    position: 'absolute',
    alignSelf: 'center',
    width: 51,
    top: 0,
    height: 51,
  },
  combinedShapeThreeImage: {
    resizeMode: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'center',
    width: 18,
    top: 17,
    height: 18,
  },

  basketImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    position: 'absolute',
    right: 20,
    width: 22,
    top: 30,
    height: 22,
  },
});
