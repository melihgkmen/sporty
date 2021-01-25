import React from 'react';
import ReactNative from 'react-native';
import { scale } from '../Utils/Scaling';
import colors from '../Config/colors';
import Text from './Text';

// eslint-disable-next-line object-curly-newline
const Button = ({ style, isLoading, buttonText,textStyle, ...rest }) => (
  <ReactNative.TouchableOpacity
    style={[styles.button, style]}
    disabled={isLoading}
    {...rest}
  >
    <ReactNative.View style={{ height: scale(35), justifyContent: 'center', alignItems: 'center' }}>
      {isLoading
        ? <ReactNative.ActivityIndicator color={colors.white}/>
        : <Text style={[styles.buttonText,textStyle]}>{buttonText}</Text>}
    </ReactNative.View>
  </ReactNative.TouchableOpacity>
);

export default Button;

const styles = ReactNative.StyleSheet.create({
  button: {
    backgroundColor: colors.yellow,
    padding:  10,
    borderRadius: 6,
    marginBottom: scale(10)
  },
  buttonText: {
  fontFamily: "Poppins",
  fontSize: scale(20),
  fontWeight: "600",
  fontStyle: "normal",
  letterSpacing: -0.42,
  textAlign: "right",
  color: "#32354e"
  }
});
