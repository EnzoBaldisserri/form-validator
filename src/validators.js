function regexMatchCounter(input, regex) {
  const globalRegex = new RegExp(regex, 'g');
  const matches = input.match(globalRegex);

  return matches === null ? 0 : matches.length;
}

function defaultRegexValidator(input, params, regex) {
  const matchCount = regexMatchCounter(input, regex);
  const { count, min, max } = params;

  if (count !== undefined) {
    return matchCount === count;
  }
  return (min === undefined || matchCount >= min) && (max === undefined || matchCount <= max);
}

const defaultValidators = {
  CHARACTERS: ({ count, min, max }) => value => (
    count
      ? value.length === count
      : (min === undefined || value.length >= min) && (max === undefined || value.length <= max)
  ),
  DATE_BETWEEN: ({ min, max }) => (value) => {
    const date = new Date(value);
    return (min === undefined || min < date) && (max === undefined || date < max);
  },
  EMAIL: value => /\S+@\S+\.\S+/.test(value),
  EMPTY: value => !value.length,
  LETTERS: params => value => defaultRegexValidator(value, params, /[A-Za-z]/),
  LOWERCASES: params => value => defaultRegexValidator(value, params, /[a-z]/),
  MATCH: ({ regex }) => value => new RegExp(regex, '').test(value),
  NOT_EMPTY: value => !!value.length,
  NUMBERS: params => value => defaultRegexValidator(value, params, /\d/),
  SPECIAL_CHARACTERS: params => value =>
    defaultRegexValidator(value, params, /[^A-Za-z0-9]/),
  UPPERCASES: params => value => defaultRegexValidator(value, params, /[A-Z]/),
  VALUE_IN: ({ min, max }) => value =>
    (min === undefined || +value >= min) && (max === undefined || +value <= max),
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
