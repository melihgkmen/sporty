import ReactNative from 'react-native';
import { scale } from '../Utils/Scaling';

export default ReactNative.StyleSheet.create({
  button1: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f8b716',
    backgroundColor: 'transparent',
  },
  buttonTitleStyle1: {
    fontFamily: 'Poppins',
    fontSize: scale(20),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.42,
    textAlign: 'right',
    color: '#f8b716',
  },
});
