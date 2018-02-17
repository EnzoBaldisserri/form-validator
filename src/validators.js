const regExps = {
  email: /\S+@\S+\.\S+/,
  specialCharacters: /[^A-Za-z0-9]/,
  letter: /[A-Za-z]/,
  lowercaseLetter: /[a-z]/,
  uppercaseLetter: /[A-Z]/,
  number: /\d/,
};

function regExpMatchCounter(input, regExp) {
  const globalRegExp = new RegExp(regExp, 'g');
  const matches = input.match(globalRegExp);

  return matches === null ? 0 : matches.length;
}

function defaultRegExpValidator(input, params, regExp) {
  const matchCount = regExpMatchCounter(input, regExp);
  const { count, min, max } = params;

  if (count !== undefined) {
    return matchCount === count;
  }
  return (min === undefined || matchCount >= min) && (max === undefined || matchCount <= max);
}

const defaultValidators = {
  EMPTY: value => !value.length,
  NOT_EMPTY: value => value.length,
  EMAIL: value => regExps.email.test(value),
  VALUE_IN: ({ min, max }) => value =>
    (min === undefined || +value >= min) && (max === undefined || +value <= max),
  DATE_BETWEEN: ({ min, max }) => (value) => {
    const date = new Date(value);
    return (min === undefined || min < date) && (max === undefined || date < max);
  },
  CHARACTERS: ({ count, min, max }) => value => (
    count
      ? value.length === count
      : (min === undefined || value.length >= min) && (max === undefined || value.length <= max)
  ),
  SPECIAL_CHARACTERS: params => value =>
    defaultRegExpValidator(value, params, regExps.specialCharacters),
  LETTERS: params => value => defaultRegExpValidator(value, params, regExps.letter),
  UPPERCASES: params => value => defaultRegExpValidator(value, params, regExps.uppercaseLetter),
  LOWERCASES: params => value => defaultRegExpValidator(value, params, regExps.lowercaseLetter),
  NUMBERS: params => value => defaultRegExpValidator(value, params, regExps.number),
};

const fromValidations = (validations = [], validators = defaultValidators) =>
  validations.reduce((result, validation) => {
    if (Array.isArray(validation)) {
      const [name, params] = validation;
      return {
        ...result,
        [name]: validators[name](params),
      };
    }
    return {
      ...result,
      [validation]: validators[validation],
    };
  }, {});

export {
  defaultValidators,
  fromValidations,
};
