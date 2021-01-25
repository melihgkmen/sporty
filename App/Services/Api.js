import apisauce from 'apisauce';
import { apiPort } from '../Config/Settings';

const createApi = (baseURL = `http://85.95.239.234:${apiPort}/api/mobil/`) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 30000,
  });

  const signIn = (Email, Password, Version, Device) => api.post('Login', {
    Email,
    Password,
    Version,
    Device
  });

  const changePassword = (Token, CurrentPassword, NewPassword, Pan, NewPasswordVerify) => api.post('ChangePassword', {
    Token,
    CurrentPassword,
    NewPassword,
    Pan,
    NewPasswordVerify
  });

  const forgotPassword = CepNo => api.post('ForgotPassword', {
    CepNo
  });

  const validateOTP = (userID, otp) => api.post('OTP', {
    userID,
    otp
  });

  const getOTP = Token => api.post('SendOtp', {
    Token
  });

  const getProfileInfo = Token => api.post('getProfileInfo', {
    Token
  });

  const getDistricts = (CityID, lang) => api.post('getDistrict', {
    CityID,
    lang
  });

  const editProfile = (Token, NameSurname, Phone, Email, Street, Il, Ilce) => api.post('EditProfile', {
    Token,
    NameSurname,
    Phone,
    Email,
    Street,
    Il,
    Ilce
  });

  const signUp = (NameSurname, Phone, Il, Ilce, Street, Email, Password, PasswordVerify) => api.post('SignUp', {
    NameSurname,
    Phone,
    Il,
    Ilce,
    Street,
    Email,
    Password,
    PasswordVerify
  });

  const savePlayerId = (Token, PlayerID, DeviceType) => api.post('SavePlayerID', {
    Token,
    PlayerID,
    DeviceType
  });

  const toggleNotifications = (Token, DeviceType, isActive) => api.post('ToggleNotification', {
    Token,
    DeviceType,
    isActive
  });

  const createPin = (Pin, Token) => api.post('CreatePin', {
    Pin,
    Token
  });

  const checkPin = (Email, Pin) => api.post('CheckPin', {
    Email,
    Pin
  });

  const resetPin = PhoneNumber => api.post('ResetPin', {
    PhoneNumber
  });

  const getNotifications = (Token, lang) => api.post('UserNotification', {
    Token,
    lang
  });

  const dismissNotification = ({
    Token, Status, BillTypeID, ID, NotID
  }) => api.post('UserNotificationViewed', {
    Token,
    Status,
    BillTypeID,
    ID,
    NotID
  });

  const getHomePageInfo = (Token, lang) => api.post('GetHomePageInfo', {
    Token,
    lang
  });

  const getBillTypes = (Token, lang) => api.post('GetBillType', {
    Token,
    lang
  });

  const saveBill = (Token, lang,MatchCode,Subscriber) => api.post('SaveBill2', {
    Token,
    lang,
    MatchCode,
    Subscriber
  });

  const getSavedSubscriptions = (Token, lang) => api.post('GetSavedBill', {
    Token,
    lang
  });

  const getInstitutions = (Token, BillID) => api.post('GetCompany', {
    Token,
    BillID
  });

  const getUnpaidBillsList = (Token, lang,MatchCode,Subscriber) => api.post('UnpaidBillList2', {
    Token,
    lang,
    MatchCode,
    Subscriber
  });

  const payment = (Token, billList) => api.post('Payment', {
    Token,
    billList
  });

  const getInstallmentOptions = (Token, amount) => api.post('GetInstallmentCommissions', {
    Token,
    amount
  });

  const getPaidBillsList = (Token, BillTypeID, DateType) => api.post('PreviousBillList', {
    Token,
    BillTypeID,
    DateType
  });

  const removeSubscriber = (Token, CustomerNo) => api.post('DeleteSubscriber', {
    Token,
    CustomerNo
  });

  const validateToken = Token => api.post('TokenControl', {
    Token
  });

  return {
    signIn,
    changePassword,
    forgotPassword,
    validateOTP,
    getOTP,
    getProfileInfo,
    getDistricts,
    editProfile,
    signUp,
    savePlayerId,
    toggleNotifications,
    createPin,
    checkPin,
    resetPin,
    getNotifications,
    dismissNotification,
    getHomePageInfo,
    getBillTypes,
    saveBill,
    getSavedSubscriptions,
    getInstitutions,
    getUnpaidBillsList,
    payment,
    getInstallmentOptions,
    getPaidBillsList,
    removeSubscriber,
    validateToken
  };
};

export default {
  createApi
};