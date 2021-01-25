import React from 'react';
import ReactNative from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../Utils/Scaling';
import Text from './Text';
import colors from '../Config/colors';

// eslint-disable-next-line object-curly-newline
const Input = ({title, style, iconName, iconColor, pattern, validationError, ...rest }) => (
  <ReactNative.View style={style}>
      <ReactNative.View style={[styles.inputContainer],{flexDirection:"column"}}>
    {title?
      <Text style={styles.inputTitle}>{title}</Text>:null}
    <ReactNative.View style={{flexDirection:"row",alignItems:"center"}}>
      {iconName !== undefined
        ? (
          <Icon
            style={styles.iconStyle}
            name={iconName}
            size={scale(30)}
            color={iconColor}
          />
        )
        : null}
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
            style={styles.inputStyle}
            placeholderTextColor='#a0a7ba'
          />
        )
        : (
          <ReactNative.TextInput
            {...rest}
            style={styles.inputStyle}
            placeholderTextColor='#a0a7ba'
          />
        )
      }
      </ReactNative.View>
    </ReactNative.View>
    {validationError ? <Text style={styles.validationStyle}>{validationError}</Text> : null}
  </ReactNative.View>
);

export default Input;

const styles = ReactNative.StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth:  1,
    borderColor:  'transparent',
    //backgroundColor: '#464968',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
		fontWeight: "600",
    paddingTop: scale(15),
    paddingBottom: scale(15),
    fontSize: scale(20),
    color:  colors.white, 
  },
  iconStyle: {
    paddingRight: scale(15),
    paddingLeft: scale(15)
  },
  validationStyle: {
    color: colors.danger
  },
  inputTitle:{
    fontFamily: "Poppins",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#a0a7ba"}
});
