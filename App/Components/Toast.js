import Toast from 'react-native-root-toast';
import colors from '../Config/colors';

export default function (message) {
  Toast.show(message, {
    position: -200,
    shadow: false,
    opacity: 1,
    backgroundColor: colors.warning,
    textColor: colors.white
  });
}
