import React from 'react';
import ReactNative, { Text } from 'react-native';
import { scale } from '../Utils/Scaling';
import colors from '../Config/colors';

// eslint-disable-next-line object-curly-newline
const Connection = ({ isVisible }) => (
  <ReactNative.Modal
    onRequestClose={() => { }}
    visible={isVisible}
    transparent
    animationType="slide"
    hardwareAccelerated
  >
    <ReactNative.View style={styles.modalWrapper}>
      <ReactNative.View>
      </ReactNative.View>
      <ReactNative.View>
      </ReactNative.View>
      <ReactNative.View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Bağlantınızı kontrol ediniz.</Text>
      </ReactNative.View>
    </ReactNative.View>
  </ReactNative.Modal>
);

export default Connection;

const styles = ReactNative.StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'space-evenly'
  },
  modalContainer: {
    backgroundColor: colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(75)
  },
  modalTitle: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: scale(25),
    fontWeight: '400'
  }
});
