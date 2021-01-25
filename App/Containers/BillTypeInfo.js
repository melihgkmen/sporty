import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../Services/NavigationService';
import Input from '../Components/Input';
import colors from '../Config/colors';
import mainStyles from '../Config/style';
import Button from '../Components/Button';

class BillTypeInfo extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerShown: true,
      headerTintColor: 'white',
      headerTitle: params ? params.titleName : '',
      headerStyle: {
        backgroundColor: colors.headerColor,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
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
      selectedBillTypeId: this.props.navigation.state.params
        ? this.props.navigation.state.params.selectedBillTypeId
        : '',
      institutionListItem: this.props.navigation.state.params
        ? this.props.navigation.state.params.institutionListItem
        : undefined,
      checked: false,
      date: new Date(),
      kayitGoster: false,
    };
  }
  componentWillMount = async () => {};
  titleName() {
    switch (this.state.selectedBillTypeId) {
      case '1':
        return 'Su Faturası';
      case '2':
        return 'Elektrik Faturası';
      case '3':
        return 'Telekominikasyon Faturası';
      case '5':
        return 'Emlak Faturası';
      case '6':
        return 'Trafik Faturası';
      case '7':
        return 'Eğitim Faturası';
      case '9':
        return 'Diğer';
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({titleName: this.titleName()});
  }
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
            <ScrollView>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  height: 100,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                  }}>
                  <View style={{width: '100%', flexDirection: 'column'}}>
                    <Input
                      title="Kurum"
                      value={this.state.institutionListItem.label}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  height: 100,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: '65%', flexDirection: 'column'}}>
                  <Input placeholder="Kişi Kodu" />
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '30%',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({kayitGoster: true})}
                    style={{
                      backgroundColor: '#F8B716',
                      borderRadius: 12,
                      width: 24,
                      height: 24,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="info" color="#fff" size={20}></Icon>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#464968',
                  borderRadius: 6,
                  height: 100,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <View style={{width: '100%', flexDirection: 'column'}}>
                  <Input placeholder="Abone No" />
                </View>
              </View>
              {this.state.kayitGoster ? (
                <View
                  style={{
                    flexDirection: 'column',
                    backgroundColor: '#464968',
                    borderRadius: 6,
                    height: 100,
                    paddingHorizontal: 10,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 20,
                    }}>
                    <View style={{width: '100%', flexDirection: 'column'}}>
                      <Input title="Kayıt İsmi" value={this.titleName()} />
                    </View>
                  </View>
                </View>
              ) : null}
              {this.state.kayitGoster ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <View style={{width: '48%'}}>
                    <Button
                      onPress={() =>
                        NavigationService.navigate('TalimatDetay', {
                          onayGoster: true,
                        })
                      }
                      buttonText="Kaydet"
                      style={mainStyles.button1}
                      textStyle={mainStyles.buttonTitleStyle1}></Button>
                  </View>
                  <View style={{width: '4%'}}></View>
                  <View style={{width: '48%'}}>
                    <Button
                      onPress={() =>
                        NavigationService.navigate('TalimatDetay', {
                          onayGoster: false,
                        })
                      }
                      buttonText="Devam Et"></Button>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Button
                    onPress={() => this.setState({kayitGoster: true})}
                    buttonText="Devam"></Button>
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text1: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#a0a7ba',
    paddingLeft: 20,
  },
});

const mapStateToProps = (state) => ({
  token: state.accountInfo.token,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(BillTypeInfo);
