
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
} from './types';

export const setLoader = payload => ({
  type: SET_LOADER,
  payload
});

export const setTempToken = payload => ({
  type: SET_TEMPTOKEN,
  payload
});

export const setToken = payload => ({
  type: SET_TOKEN,
  payload
});

export const signOut = (payload = 'tokenError') => ({
  type: SIGN_OUT,
  payload
});

export const setNameSurname = payload => ({
  type: SET_NAMESURNAME,
  payload
});

export const setEmail = payload => ({
  type: SET_EMAIL,
  payload
});

export const setPhoneNumber = payload => ({
  type: SET_PHONE,
  payload
});

export const setLastLogin = payload => ({
  type: SET_LASTLOGIN,
  payload
});

export const setNumberOfNotifications = payload => ({
  type: SET_NUMBEROFNOTIFICATIONS,
  payload
});

export const setUnpaidBillsList = payload => ({
  type: SET_UNPAIDBILLSLIST,
  payload
});

export const updateUnpaidBillIsChecked = payload => ({
  type: UPDATE_UNPAIDBILLISCHECKED,
  payload
});

export const setBillTypes = payload => ({
  type: SET_BILLTYPES,
  payload
});

export const setBillTypesExtraData = payload => ({
  type: SET_BILLTYPESEXTRADATA,
  payload
});

export const setCustomerNo = payload => ({
  type: SET_CUSTOMERNO,
  payload
});

export const setPaymentAmount = payload => ({
  type: SET_PAYMENTAMOUNT,
  payload
});

export const setBillIds = payload => ({
  type: SET_BILLIDS,
  payload
});

export const setBillTypeId = payload => ({
  type: SET_BILLTYPEID,
  payload
});

export const setCompanyId = payload => ({
  type: SET_COMPANYID,
  payload
});

export const setCreditCardNo = payload => ({
  type: SET_CREDITCARDNO,
  payload
});

export const setCreditCardExpMonth = payload => ({
  type: SET_CREDITCARDEXPMONTH,
  payload
});

export const setCreditCardExpYear = payload => ({
  type: SET_CREDITCARDEXPYEAR,
  payload
});

export const setCardVerificationVal = payload => ({
  type: SET_CARDVERIFICATIONVAL,
  payload
});

export const setInstallmentOption = payload => ({
  type: SET_INSTALLMENTOPTION,
  payload
});

export const setInstallmentComTotal = payload => ({
  type: SET_INSTALLMENCOMTOTAL,
  payload
});

export const setPaymentResponseObj = payload => ({
  type: SET_PAYMENTRESPONSEOBJ,
  payload
});

export const setSavedBills = payload => ({
  type: SET_SAVEDBILLS,
  payload
});

export const addSavedBill = payload => ({
  type: ADD_SAVEDBILL,
  payload
});

export const removeSavedBill = payload => ({
  type: REMOVE_SAVEDBILL,
  payload
});
