import React from 'react';
import ReactNative from 'react-native';
import { scale } from '../Utils/Scaling';
import colors from '../Config/colors';
import Text from './Text';

// eslint-disable-next-line object-curly-newline
const Modal = ({ isVisible, title, children }) => (
  <ReactNative.Modal
    onRequestClose={() => { }}
    visible={isVisible}
    transparent
    animationType="fade"
    hardwareAccelerated
  >
    <ReactNative.KeyboardAvoidingView style={styles.modalWrapper} behavior={(ReactNative.Platform.OS === 'ios') ? 'padding' : null} enabled>
      <ReactNative.View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        {children}
      </ReactNative.View>
    </ReactNative.KeyboardAvoidingView>
  </ReactNative.Modal>
);

export default Modal;

const styles = ReactNative.StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: scale(10),
    borderRadius: scale(16),
    margin: scale(10)
  },
  modalTitle: {
    color: "#282a3c",
    alignSelf: 'center',
    fontSize: scale(30),
    fontWeight: 'bold',
    marginBottom: scale(10)
  }
});
