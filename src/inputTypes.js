export default {
  NONE: {},
  EMPTY: {
    changeProperty: 'input',
    validations: ['EMPTY'],
  },
  TEXT: {
    changeProperty: 'input',
    validations: ['NOT_EMPTY'],
  },
  EMAIL: {
    changeProperty: 'input',
    validations: [
      'NOT_EMPTY',
      'EMAIL',
    ],
  },
  PASSWORD: {
    changeProperty: 'input',
    validations: ['NOT_EMPTY'],
  },
  NUMBER: {
    changeProperty: 'input',
    validations: ['NOT_EMPTY'],
  },
  POSITIVE_NUMBER: {
    changeProperty: 'input',
    validations: [
      'NOT_EMPTY',
      ['VALUE_IN', { min: 0 }],
    ],
  },
  DATE: {
    changeProperty: 'change',
    validations: ['NOT_EMPTY'],
  },
  TIME: {
    changeProperty: 'change',
    validations: ['NOT_EMPTY'],
  },
  DATETIME: {
    changeProperty: 'change',
    validations: ['NOT_EMPTY'],
  },
};
