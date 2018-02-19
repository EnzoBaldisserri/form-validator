function getDefaultTextAreaValidations($element) {
  const validations = [];
  const {
    required,
    maxLength,
  } = $element;

  if (required) {
    validations.push('NOT_EMPTY');
  }

  if (maxLength >= 0) {
    validations.push(['CHARACTERS', { max: maxLength }]);
  }

  return validations;
}

function getDefaultTextValidations($element) {
  const validations = [];
  const {
    required,
    maxLength,
    pattern,
  } = $element;

  if (required) {
    validations.push('NOT_EMPTY');
  }

  if (maxLength >= 0) {
    validations.push(['CHARACTERS', { max: maxLength }]);
  }

  if (pattern) {
    validations.push(['MATCH', { regex: pattern }]);
  }

  return validations;
}

function getDefaultNumberValidations($element) {
  const validations = [];
  const {
    required,
    min,
    max,
  } = $element;

  if (required) {
    validations.push('NOT_EMPTY');
  }

  if (min !== undefined || max !== undefined) {
    validations.push(['VALUE_IN', { min, max }]);
  }

  return validations;
}

function getDefaultDateValidations($element) {
  const validations = [];
  const {
    required,
    min,
    max,
  } = $element;

  if (required) {
    validations.push('NOT_EMPTY');
  }

  if (min || max) {
    validations.push('DATE_BETWEEN', {
      min: min ? new Date(min) : undefined,
      max: max ? new Date(max) : undefined,
    });
  }

  return validations;
}

function getDefaultFileValidations() {
  throw new Error('File input currently aren\'t handled by the library');
}

export default {
  DATE: {
    changeProperty: 'change',
    defaultValidations: getDefaultDateValidations,
  },
  DATETIME: {
    changeProperty: 'change',
    defaultValidations: getDefaultDateValidations,
  },
  EMAIL: {
    changeProperty: 'input',
    defaultValidations: $el => ([
      'EMAIL',
      ...getDefaultTextValidations($el),
    ]),
  },
  EMPTY: {
    changeProperty: 'input',
    defaultValidations: () => (['EMPTY']),
  },
  FILE: {
    changePrperty: 'input',
    defaultValidations: getDefaultFileValidations,
  },
  NONE: {},
  NUMBER: {
    changeProperty: 'input',
    defaultValidations: getDefaultNumberValidations,
  },
  PASSWORD: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations,
  },
  POSITIVE_NUMBER: {
    changeProperty: 'input',
    defaultValidations: $el => ([
      ['VALUE_IN', { min: 0 }],
      ...getDefaultNumberValidations($el),
    ]),
  },
  RANGE: {
    changeProperty: 'input',
    defaultValidations: getDefaultNumberValidations,
  },
  SEARCH: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations,
  },
  TEL: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations,
  },
  TEXT: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations,
  },
  TEXTAREA: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextAreaValidations,
  },
  TIME: {
    changeProperty: 'change',
    defaultValidations: getDefaultDateValidations,
  },
  URL: {
    changeProperty: 'input',
    defaultValidations: getDefaultTextValidations,
  },
};
