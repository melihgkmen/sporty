import React from 'react';
import ReactNative from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale } from '../Utils/Scaling';
import Text from './Text';
import colors from '../Config/colors';

// eslint-disable-next-line object-curly-newline
const RegisterPicker = ({ placeholder, validationError, loading,hideIcon, theme, ...rest }) => (
  <React.Fragment>
    <ReactNative.View>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        placeholder={placeholder === undefined ? {} : { label: placeholder, value: null, color:'#757aa5' }}
        style={{
          ...pickerSelectStyles
        }}
        {...rest}
        Icon={() => (loading ? <ReactNative.ActivityIndicator color='#32354e' /> : <Icon name="sort-down" size={scale(30)} color='#757aa5' />)}
      />
    </ReactNative.View>
    {validationError
      ? <Text style={pickerSelectStyles.validationStyle}>{validationError}</Text> : null}
  </React.Fragment>
);

export default RegisterPicker;

const pickerSelectStyles = ReactNative.StyleSheet.create({
  inputIOS: {
    padding: scale(15),
    borderRadius: 15,
    fontSize: scale(20),
    color: '#32354e',
		fontWeight:  "normal",
    backgroundColor: colors.lightGrayColor,
    marginLeft:6,
  },
  inputAndroid: {
    padding: scale(15),
    borderRadius: 15,
    fontSize: scale(20),
    color: '#32354e',
		fontWeight: "normal",
    color: colors.lightGrayColor,
    marginLeft:6,
  },
  iconContainer: {
    top: 0,
    right: scale(15),
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  validationStyle: {
    color: colors.danger
  }
});
