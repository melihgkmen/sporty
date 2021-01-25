import { Platform } from 'react-native';
import {
  getApiPort, getThreeDSecureURL, getOneSignalKey, getMarketURL
} from './BuildValues';
import buildTypes from './BuildTypes';

export const BUILD_TYPE = buildTypes.PROD_BUILD;
export const marketID = Platform.OS === 'ios' ? '1460009292' : 'com.waps.limon';
export const localBuildNumber = '6.0';
export const deviceType = 'M';
export const shareURL = 'https://www.limasolonline.com/';
export const helpURL = 'https://www.limasolonline.com/iletisim/';
export const rateURL = getMarketURL();
export const apiPort = getApiPort();
export const ThreeDSecureURL = getThreeDSecureURL();
export const oneSignalKey = getOneSignalKey();
export const MixPanelToken = '1b2a57e40371c2df9c8e6a8260f01727';
