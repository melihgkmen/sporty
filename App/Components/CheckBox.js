import React from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale } from '../Utils/Scaling';
import Text from './Text';

// eslint-disable-next-line object-curly-newline
const CheckBox = ({ isChecked, checkBoxSize, style, checkBoxText }) => (
  <ReactNative.View style={styles.checkBoxContainer}>
    {isChecked
      ? <Icon style={[styles.checkBoxStyle, { width: scale(checkBoxSize), height: scale(checkBoxSize) }]} name="check-square-o" size={scale(checkBoxSize)} color="green" />
      : <Icon style={[styles.checkBoxStyle, { width: scale(checkBoxSize), height: scale(checkBoxSize) }]} name="square-o" size={scale(checkBoxSize)} color="green" />}
    <Text style={[style]}>{checkBoxText}</Text>
  </ReactNative.View>
);

export default CheckBox;

const styles = ReactNative.StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
  },
  checkBoxStyle: {
    alignSelf: 'center'
  }
});
