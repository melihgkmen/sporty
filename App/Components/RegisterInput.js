import React from 'react';
import ReactNative from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../Utils/Scaling';
import Text from './Text';
import colors from '../Config/colors';

// eslint-disable-next-line object-curly-newline
const Input = ({ style, pattern, validationError, theme, ...rest }) => (
  <ReactNative.View style={style}>
    <ReactNative.View style={[styles(theme).inputContainer]}>

      {pattern !== undefined
        ? (
          <TextInputMask
            type="custom"
            options={
              {
                mask: pattern
              }
            }
            {...rest}
            style={styles(theme).inputStyle}
            placeholderTextColor= "#757aa5"
          />
        )
        : (
          <ReactNative.TextInput
            {...rest}
            style={styles(theme).inputStyle}
            placeholderTextColor= '#757aa5'
          />
        )
      }
    </ReactNative.View>
    {validationError ? <Text style={styles(theme).validationStyle}>{validationError}</Text> : null}
  </ReactNative.View>
);

export default Input;

const styles = theme => ReactNative.StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    //borderWidth: theme === 'signup' ? null : 1,
    borderColor: "transparent",
    //paddingLeft: theme === 'signup' ?0 : scale(15),
    paddingRight: scale(15),
    backgroundColor: "transparent",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:5,
    marginRight:15,
    marginTop:0
  },
  inputStyle: {
    flex: 1,
		fontWeight: "normal",
    paddingTop: scale(15),
    paddingBottom: scale(10),
    fontSize:scale(20),
    color: '#32354e'
  },
  iconStyle: {
    paddingRight: scale(15)
  },
  validationStyle: {
    color: colors.danger
  }
});
