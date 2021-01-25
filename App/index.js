import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import NavigationService from './Services/NavigationService';
import { store } from './Store';
import Layout from './Config/router';
import Connection from './Components/Connection';
import Loader from './Components/Loader';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false
    };
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      this.setState({isConnected:state.isConnected})
    });
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.setState({isConnected:false})
  }
  

  

  render() {
    const { isConnected } = this.state;
    return (
      <Provider store={store}>
        <Layout ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        />
        <Loader />
        <Connection isVisible={!isConnected} />
      </Provider>
    );
  }
}
