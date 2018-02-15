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
    validations: ['NO_EMPTY'],
  },
  PASSWORD: {
    changeProperty: 'input',
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
