import MixPanel from 'react-native-mixpanel';
import { MixPanelToken } from '../Config/Settings';

MixPanel.sharedInstanceWithToken(MixPanelToken);

export { MixPanel as default };
