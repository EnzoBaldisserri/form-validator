export default {
  NONE: {},
  EMPTY: {
    changeProperty: '',
    validations: ['EMPTY'],
  },
  TEXT: {
    changeProperty: 'keypress',
    validations: ['NO_EMPTY'],
  },
  EMAIL: {
    changeProperty: 'keypress',
    validations: ['NO_EMPTY'],
  },
  PASSWORD: {
    changeProperty: 'keypress',
    validations: ['NO_EMPTY'],
  },
  NUMBER: {
    changeProperty: 'change',
    validations: ['NO_EMPTY'],
  },
  DATE: {
    changeProperty: 'change',
    validations: ['NO_EMPTY'],
  },
  TIME: {
    changeProperty: 'change',
    validations: ['NO_EMPTY'],
  },
  DATETIME: {
    changeProperty: 'change',
    validations: ['NO_EMPTY'],
  },
};
