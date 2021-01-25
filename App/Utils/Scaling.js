import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
// Based on iPhone Xs Dimensions
const guidelineBaseWidth = 1125;
const guidelineBaseHeight = 2436;
const scale = size => width / guidelineBaseWidth * (size * 2);
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
