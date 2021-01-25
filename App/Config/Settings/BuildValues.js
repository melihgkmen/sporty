import { Platform } from 'react-native';
import { BUILD_TYPE, marketID } from '.';
import buildTypes from './BuildTypes';

const ThreeDSecureURLProd = 'https://bireysel.limasolonline.com/';
const ThreeDSecureURLPreProd = 'http://85.95.239.234:8064/';
const ThreeDSecureURLTest = 'http://85.95.239.234:8074/';
const prodApiPort = '8085';
const preProdApiPort = '8065';
const testApiPort = '8075';
const oneSignalProdKey = 'b8758a10-8663-415b-934e-208bd6ff7ee4';
const oneSignalPreProdKey = '60908e5e-4ba2-4718-8da5-f43260ad365f';
const oneSignalTestKey = 'c388eacb-f2ae-4698-b3bc-d5cf009660c2';

export function getThreeDSecureURL(buildType = BUILD_TYPE) {
  const { TEST_BUILD, PRE_PROD_BUILD, PROD_BUILD } = buildTypes;
  switch (buildType) {
    case TEST_BUILD:
      return ThreeDSecureURLTest;
    case PRE_PROD_BUILD:
      return ThreeDSecureURLPreProd;
    case PROD_BUILD:
      return ThreeDSecureURLProd;
    default:
      return null;
  }
}

export function getApiPort(buildType = BUILD_TYPE) {
  const { TEST_BUILD, PRE_PROD_BUILD, PROD_BUILD } = buildTypes;
  switch (buildType) {
    case TEST_BUILD:
      return testApiPort;
    case PRE_PROD_BUILD:
      return preProdApiPort;
    case PROD_BUILD:
      return prodApiPort;
    default:
      return null;
  }
}

export function getOneSignalKey(buildType = BUILD_TYPE) {
  const { TEST_BUILD, PRE_PROD_BUILD, PROD_BUILD } = buildTypes;
  switch (buildType) {
    case TEST_BUILD:
      return oneSignalTestKey;
    case PRE_PROD_BUILD:
      return oneSignalPreProdKey;
    case PROD_BUILD:
      return oneSignalProdKey;
    default:
      return null;
  }
}

export function getMarketURL() {
  return Platform.OS === 'ios' ? `itms-apps://itunes.apple.com/us/app/id${marketID}?mt=8` : `market://details?id=${marketID}`;
}
