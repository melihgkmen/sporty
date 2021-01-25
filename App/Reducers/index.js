import AsyncStorage from '@react-native-community/async-storage';
import {
  combineReducers
} from 'redux';
import NavigationService from '../Services/NavigationService';
import i18n from '../i18n';
import Toast from '../Components/Toast';
import {
  SET_LOADER,
  SET_TEMPTOKEN,
  SET_TOKEN,
  SIGN_OUT,
  SET_NAMESURNAME,
  SET_EMAIL,
  SET_PHONE,
  SET_LASTLOGIN,
  SET_NUMBEROFNOTIFICATIONS,
  SET_UNPAIDBILLSLIST,
  UPDATE_UNPAIDBILLISCHECKED,
  SET_BILLTYPES,
  SET_BILLTYPESEXTRADATA,
  SET_CUSTOMERNO,
  SET_PAYMENTAMOUNT,
  SET_BILLIDS,
  SET_BILLTYPEID,
  SET_COMPANYID,
  SET_CREDITCARDNO,
  SET_CREDITCARDEXPMONTH,
  SET_CREDITCARDEXPYEAR,
  SET_CARDVERIFICATIONVAL,
  SET_INSTALLMENTOPTION,
  SET_INSTALLMENCOMTOTAL,
  SET_PAYMENTRESPONSEOBJ,
  SET_SAVEDBILLS,
  ADD_SAVEDBILL,
  REMOVE_SAVEDBILL
} from '../Actions/types';

export const accountInfo = (state = {}, action) => {
  switch (action.type) {
    case SET_TEMPTOKEN:
      return {
        ...state,
        tempToken: action.payload
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case SET_NAMESURNAME:
      return {
        ...state,
        nameSurname: action.payload
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_PHONE:
      return {
        ...state,
        phoneNumber: action.payload
      };
    case SET_LASTLOGIN:
      return {
        ...state,
        lastLogin: action.payload
      };
    case SET_NUMBEROFNOTIFICATIONS:
      return {
        ...state,
        numberOfNotifications: action.payload
      };
    default:
      return state;
  }
};

export const subscriberInfo = (state = {}, action) => {
  switch (action.type) {
    case SET_UNPAIDBILLSLIST:
      return {
        ...state,
        unpaidBillsList: action.payload.reformattedArray,
        payInOrder: action.payload.payInOrder,
      };
    case UPDATE_UNPAIDBILLISCHECKED: {
      const { payInOrder } = state;
      const arr = [...state.unpaidBillsList];
      const taskIndex = action.payload;
      arr.forEach((element, index) => {
        if (index > taskIndex && payInOrder) {
          // eslint-disable-next-line no-param-reassign
          element.isChecked = false;
        }
        if (index <= taskIndex && payInOrder) {
          // eslint-disable-next-line no-param-reassign
          element.isChecked = !arr[taskIndex].isChecked;
        }
        if (index <= taskIndex && arr[taskIndex].isChecked && payInOrder) {
          // eslint-disable-next-line no-param-reassign
          element.isChecked = true;
        }
        if (!payInOrder) {
          // eslint-disable-next-line no-param-reassign
          element.isChecked = index === taskIndex ? !arr[taskIndex].isChecked : false;
        }
      });
      return {
        ...state,
        unpaidBillsList: arr
      };
    }
    case SET_SAVEDBILLS:
      return {
        ...state,
        savedBills: action.payload
      };
    case ADD_SAVEDBILL: {
      const tempArr = [...state.savedBills, action.payload];
      return {
        ...state,
        savedBills: tempArr
      };
    }
    case REMOVE_SAVEDBILL: {
      const tempArr = [
        ...state.savedBills.slice(0, action.payload),
        ...state.savedBills.slice(action.payload + 1)
      ];
      return {
        ...state,
        savedBills: tempArr
      };
    }
    default:
      return state;
  }
};

export const paymentInfo = (state = {}, action) => {
  switch (action.type) {
    case SET_CUSTOMERNO:
      return {
        ...state,
        customerNo: action.payload
      };
    case SET_PAYMENTAMOUNT:
      return {
        ...state,
        paymentAmount: action.payload
      };
    case SET_BILLIDS:
      return {
        ...state,
        billIds: action.payload
      };
    case SET_BILLTYPEID:
      return {
        ...state,
        billTypeId: action.payload
      };
    case SET_COMPANYID:
      return {
        ...state,
        companyId: action.payload
      };
    case SET_CREDITCARDNO:
      return {
        ...state,
        creditCardNo: action.payload
      };
    case SET_CREDITCARDEXPMONTH:
      return {
        ...state,
        creditCardExpMonth: action.payload
      };
    case SET_CREDITCARDEXPYEAR:
      return {
        ...state,
        creditCardExpYear: action.payload
      };
    case SET_CARDVERIFICATIONVAL:
      return {
        ...state,
        creditCardVerificationVal: action.payload
      };
    case SET_INSTALLMENTOPTION:
      return {
        ...state,
        installmentOption: action.payload
      };
    case SET_INSTALLMENCOMTOTAL:
      return {
        ...state,
        installmentComTotal: action.payload
      };
    case SET_PAYMENTRESPONSEOBJ:
      return {
        ...state,
        paymentResponseObj: action.payload
      };
    default:
      return state;
  }
};

export const globalVariables = (state = {}, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_BILLTYPES:
      return {
        ...state,
        billTypes: action.payload
      };
    case SET_BILLTYPESEXTRADATA:
      return {
        ...state,
        billTypesExtraData: action.payload
      };
    default:
      return state;
  }
};

const appReducer = combineReducers({
  accountInfo,
  subscriberInfo,
  paymentInfo,
  globalVariables
});

export const rootReducer = (state, action) => {
  let tempState = state;
  if (action.type === SIGN_OUT) {
    removeUserToken(action.payload);
    NavigationService.navigate('AuthLoading');
    if (action.payload === 'tokenError') { Toast(i18n.t('apiResponses.20001')); }
    tempState = undefined;
  }
  return appReducer(tempState, action);
};

async function removeUserToken(type) {
  if (type !== 'biometricAction') { await AsyncStorage.removeItem('userToken'); } else {
    const rememberMeSetBySettings = await AsyncStorage.getItem('rememberMeSetBySettings');
    const rememberMeSetBySettingsVal = JSON.parse(rememberMeSetBySettings);
    if (!rememberMeSetBySettingsVal) {
      AsyncStorage.multiRemove(['rememberMeSetBySettings', 'biometricLogin']);
    } else {
      AsyncStorage.multiRemove(['userToken', 'userName', 'rememberMe', 'rememberMeSetBySettings', 'biometricLogin']);
    }
  }
}
