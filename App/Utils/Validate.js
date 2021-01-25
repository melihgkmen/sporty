import validation from 'validate.js';
import i18n from '../i18n';

export default function validate(fieldName, value) {
  const constraints = {
    nameSurname: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    phoneNumber: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      },
      length: {
        minimum: 13,
        tooShort: i18n.t('validationErrors.phone-validation')
      },
      format: {
        pattern: '^[5](.*)',
        flags: 'i',
        message: i18n.t('validationErrors.phone-validation')
      }
    },
    email: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      },
      email: {
        message: i18n.t('validationErrors.email-validation')
      }
    },
    address: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    province: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    district: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    password: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    confirmPassword: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      },
      equality: {
        attribute: 'password',
        message: i18n.t('validationErrors.password-match'),
        comparator(v1) {
          // password valuesu alınamadığı için ufak bir hack. Sonradan bakılacak.
          return JSON.stringify(v1[0]) === JSON.stringify(v1[1]);
        }
      }
    },
    subscriberNo: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    billType: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    institution: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    cardName: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    cardHolder: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    },
    cardNo: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      },
      length: {
        minimum: 19,
        tooShort: i18n.t('validationErrors.card-validation')
      }
    },
    monthYear: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      },
      format: {
        pattern: '^(0[1-9]|1[012])/(1[9]|[2-9][0-9])$',
        flags: 'i',
        message: i18n.t('validationErrors.date-validation')
      }
    },
    cardCVV: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      },
      length: {
        minimum: 3,
        tooShort: i18n.t('validationErrors.cvv-validation')
      }
    },
    paymentInstallment: {
      presence: {
        allowEmpty: false,
        message: i18n.t('validationErrors.empty-field')
      }
    }
  };

  const formValues = {};
  formValues[fieldName] = value;

  const formFields = {};
  formFields[fieldName] = constraints[fieldName];

  const result = validation(formValues, formFields);

  if (result) {
    return result[fieldName][0];
  }
  return null;
}
