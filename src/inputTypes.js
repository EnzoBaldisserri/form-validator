export default {
  NONE: {},
  EMPTY: {
    changeProperty: 'input',
    validations: ['EMPTY'],
  },
  TEXT: {
    changeProperty: 'input',
    validations: ['NO_EMPTY'],
  },
  EMAIL: {
    changeProperty: 'input',
    validations: [
      'NO_EMPTY',
      'EMAIL',
    ],
  },
  PASSWORD: {
    changeProperty: 'input',
    validations: ['NO_EMPTY'],
  },
  NUMBER: {
    changeProperty: 'input',
    validations: ['NO_EMPTY'],
  },
  POSITIVE_NUMBER: {
    changeProperty: 'input',
    validations: [
      'NO_EMPTY',
      ['VALUE_IN', { min: 0 }],
    ],
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
