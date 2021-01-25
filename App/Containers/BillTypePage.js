import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Input from '../Components/Input';
import NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from '../Components/Toast';
import i18n, {currentLang} from '../i18n';
import Mixpanel from '../Services/Mixpanel';
import API from '../Services/Api';
import {connect} from 'react-redux';
import Text from '../Components/Text';
import colors from '../Config/colors';

class BillTypePage extends React.Component {
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
      headerLeft: () => (
        <TouchableOpacity onPress={() => NavigationService.back()}>
          <Icon
            name="chevron-left"
            color="#fff"
            size={20}
            style={{marginLeft: 15}}></Icon>
        </TouchableOpacity>
      ),
      headerRight: () => null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      text:"",
      filterInstitutionList: [{label: 'INITIAL_STATE', value: '999', matchCode: ''}],
      selectedBillTypeId: this.props.navigation.state.params
        ? this.props.navigation.state.params.selectedBillTypeId
        : '',
      institutionList: [{label: 'INITIAL_STATE', value: '999', matchCode: ''}],
      pickerLoading: false,
    };
  }
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
    this.bringInstitutions(this.state.selectedBillTypeId);
  }

  bringInstitutions = async (billId) => {
    if (billId === null) {
      return;
    }

    const api = API.createApi();
    const {token} = this.props;
    this.setState({pickerLoading: true, billTypeId: billId});
    await api.getInstitutions(token, billId).then((result) => {
      const {problem} = result;
      if (!problem) {
        const {ResultCode, response} = result.data;
        if (ResultCode === 20001) {
          this.signOutAsync();
          return;
        }
        const resultArray = response.CompanyTypeList.map((elm) => ({
          label: elm.CompanyName,
          value: elm.CompanyID,
          matchCode: elm.MatchCode,
        }));
        this.setState({filterInstitutionList:resultArray,institutionList: resultArray, pickerLoading: false});
      } else {
        Mixpanel.track(problem);
        this.setState({pickerLoading: false});
        Toast(i18n.t(`apiErrors.${problem}`));
      }
    });
  };
  signOutAsync = async () => {
    const {_signOut} = this.props;
    _signOut();
  };

  setSearchText(text) {
      const newData = this.state.institutionList.filter(function (item) {
        const itemData = item.label.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        filterInstitutionList: newData,
        text: text,
      });
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
              <View style={{marginTop: 10}}>
                <Input
                placeholder="Arama"
                  iconColor="#fff"
                  iconName="search"
                  autoCapitalize="none"
                  style={{
                    width: '100%',
                    borderRadius: 6,
                    backgroundColor: '#464968',
                  }}
                  value={this.state.text}
                  onChangeText={text => this.setSearchText(text)}
                  ></Input>
                <FlatList
                  contentContainerStyle={{
                    backgroundColor: '#464968',
                    marginTop: 10,
                    borderRadius: 6,
                  }}
                  data={this.state.filterInstitutionList}
                  renderItem={({item, index}) => (
                  <TouchableOpacity
                  onPress={()=>NavigationService.navigate('BillTypeInfo',
                  {selectedBillTypeId:this.state.selectedBillTypeId,
                    institutionListItem:item})}>
                    <View style={{flexDirection: 'row',height:85,alignItems:"center",padding:10}}>
                      <View style={{width: '65%'}}>
                        <Text
                          style={{
                            fontFamily: 'Poppins',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            lineHeight: 28,
                            letterSpacing: 0,
                            color: '#ffffff',
                          }}>
                          {item.label}
                        </Text>
                      </View>
                      <View style={{width: '35%', alignItems: 'flex-end'}}>
                        <Icon
                          name="chevron-right"
                          color="#fff"
                          size={15}></Icon>
                      </View>

                    </View>
                      {index<this.state.institutionList.length-1?
                      <View style={{width: '100%', height:1,backgroundColor:"#757aa5"}}>
                        
                      </View>:null}
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
const mapStateToProps = (state) => ({
  token: state.accountInfo.token,
});

const mapDispatchToProps = (dispatch) => ({
  _signOut: (payload) => dispatch(signOut(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillTypePage);
