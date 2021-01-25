
import I18n from 'react-native-i18n';
import tr from './locales/tr';
import en from './locales/en';

I18n.fallbacks = true;
I18n.translations = {
  tr,
  en
};

export default I18n;
export const currentLang = I18n.locale.substring(0, 2);
