import React from 'react';
import ReactNative from 'react-native';
import { scale } from '../Utils/Scaling';
import colors from '../Config/colors';
import i18n from '../i18n';
import Text from './Text';
import Button from './Button';


export default class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      title: undefined,
      message: undefined,
      OkButton: undefined
    };
  }

  initialize = ({ title = null, message = null, OkButton = null }) => {
    this.setState({
      isVisible: true, title, message, OkButton
    });
  }

  closeAlert = () => {
    this.setState({ isVisible: false });
  }

  render() {
    const {
      isVisible, title, message, OkButton
    } = this.state;
    return (
      <ReactNative.Modal
        onRequestClose={() => { }}
        visible={isVisible}
        transparent
        hardwareAccelerated
      >
        <ReactNative.View style={styles.alertWrapper}>
          <ReactNative.View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
            <ReactNative.View style={{ flexDirection: 'row' }}>
              <Button style={{ flex: 1, backgroundColor: "#282a3c", marginRight: scale(10) }} buttonText={i18n.t('creditCards.cancel-button')} onPress={() => this.closeAlert()} />
              <Button style={{ flex: 1, backgroundColor: "#f8b716" }} buttonText={i18n.t('creditCards.confirm-button')} onPress={() => { this.closeAlert(); OkButton(); }} />
            </ReactNative.View>
          </ReactNative.View>
        </ReactNative.View>
      </ReactNative.Modal>
    );
  }
}

const styles = ReactNative.StyleSheet.create({
  alertWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  alertContainer: {
    backgroundColor: colors.white,
    padding: scale(10),
    borderRadius: scale(16),
    margin: scale(10)
  },
  alertTitle: {
    color:  "#282a3c",
    alignSelf: 'center',
    fontSize: scale(30),
    fontWeight: 'bold',
    marginBottom: scale(10)
  },
  alertMessage: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: scale(25),
    color:"#282a3c"
  }
});
