import React from 'react';
import ReactNative from 'react-native';
import { scale } from '../Utils/Scaling';
import Text from './Text';

const radius = 0.5;
const fontDecrease = 2.5;
// eslint-disable-next-line object-curly-newline
const Avatar = ({ text, backgroundColor, circleColor, fontColor, size }) => (
  <ReactNative.View>
    <ReactNative.View
      style={styles(backgroundColor, circleColor, scale(size)).containerStyle}
    >
      <Text style={{ fontSize: scale(size) / fontDecrease, color: fontColor }}>
        {text ? (fullname => fullname.map((n, i) => (i === 0 || i === fullname.length - 1) && n[0]).filter(n => n).join(''))(text.split(' ')) : null}
      </Text>
    </ReactNative.View>
  </ReactNative.View>
);

export default Avatar;

const styles = (backgroundColor, circleColor, size) => ReactNative.StyleSheet.create({
  containerStyle: {
    width: size,
    height: size,
    borderRadius: size * radius,
    borderWidth: 5,
    borderColor: circleColor='#f8b716',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});
