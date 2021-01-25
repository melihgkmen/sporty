import React from 'react';
import ReactNative from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from '../Utils/Scaling';
import Text from './Text';
import colors from '../Config/colors';

// eslint-disable-next-line object-curly-newline
const Picker = ({ title,placeholder, validationError, loading,hideIcon,bgColor, ...rest }) => (
  <React.Fragment>
    <ReactNative.View>
      {title?
      <Text style={pickerSelectStyles(bgColor).pickerTitle}>{title}</Text>:null}
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        placeholder={placeholder === undefined ? {} : { label: placeholder, value: null, color: '#9EA0A4'}}
        style={{
          ...pickerSelectStyles(bgColor)
        }}
        {...rest}
        Icon={() => (loading ? <ReactNative.ActivityIndicator color='white' /> :hideIcon?null: <Ionicons name="md-arrow-down" size={scale(30)} color= 'white' />)}
      />
    </ReactNative.View>
    {validationError
      ? <Text style={pickerSelectStyles(bgColor).validationStyle}>{validationError}</Text> : null}
  </React.Fragment>
);

export default Picker;

const pickerSelectStyles = (bgColor) => ReactNative.StyleSheet.create({
  inputIOS: {
    padding: scale(15),
    borderRadius: 15,
    fontSize: scale(20),
    color:  'white',
		fontWeight: "bold",
    backgroundColor: bgColor,
    marginLeft:-10,
  },
  inputAndroid: {
    padding: scale(15),
    borderRadius: 15,
    fontSize: scale(20),
    color:  'white',
		fontWeight: "bold",
    backgroundColor: bgColor,
    marginLeft:-10,
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
  },
  pickerTitle:{
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#a0a7ba",
    lineHeight: 24,
  }
});
