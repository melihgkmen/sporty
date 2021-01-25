import React from 'react';
import ReactNative from 'react-native';
import { scale } from '../Utils/Scaling';
import colors from '../Config/colors';

const Text = ({ style, children, ...rest }) => (
  <ReactNative.Text style={[styles.text, style]} {...rest}>{children}</ReactNative.Text>
);

export default Text;

const styles = ReactNative.StyleSheet.create({
  text: {
    color: colors.white,
    fontFamily: ReactNative.Platform === 'Android' ? 'SF Pro Text Regular' : 'System',
    fontSize: scale(20)
  }
});
